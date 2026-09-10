import { CaseStudy, CaseStudyFormData } from "@/types/case-study";
import { readContent, writeContent } from "./content-store";
const KEY = "cases_data";
export async function getCases(): Promise<CaseStudy[]> {
  const cases = await readContent<CaseStudy[]>(KEY, "cases.json", []);
  if (!Array.isArray(cases))
    throw new Error("프로젝트 데이터 형식을 확인해 주세요.");
  return cases
    .map((c) => ({
      ...c,
      order: typeof c.order === "number" ? c.order : 0,
      tags: Array.isArray(c.tags) ? c.tags : [],
      gallery: Array.isArray(c.gallery) ? c.gallery : [],
    }))
    .sort((a, b) => a.order - b.order);
}
export async function getCaseById(id: string) {
  return (await getCases()).find((c) => c.id === id);
}
function validate(data: CaseStudyFormData) {
  for (const field of [
    "projectName",
    "clientName",
    "period",
    "summary",
    "description",
  ] as const) {
    if (typeof data[field] !== "string" || !data[field].trim())
      throw new Error(
        "프로젝트명, 고객명, 기간, 요약과 작업 내용을 입력해 주세요.",
      );
  }
  if (
    data.projectName.length > 200 ||
    data.summary.length > 600 ||
    data.description.length > 30000
  )
    throw new Error("입력 내용이 너무 깁니다.");
  if (!["draft", "published"].includes(data.status))
    throw new Error("공개 상태를 확인해 주세요.");
  if (
    !Number.isFinite(data.order) ||
    !Array.isArray(data.tags) ||
    data.tags.some((t) => typeof t !== "string" || t.length > 100)
  )
    throw new Error("태그 또는 표시 순서를 확인해 주세요.");
  // Uploaded source images are local to this repository; reject remote or traversal URLs.
  for (const image of [data.thumbnailUrl, ...(data.gallery || [])]) {
    if (
      image &&
      (!image.startsWith("/images/") ||
        image.includes("..") ||
        !/^\/images\/[^?#]+\.(png|jpe?g|webp|gif)$/i.test(image))
    )
      throw new Error(
        "이미지는 /images/로 시작하는 저장소 이미지 경로를 입력해 주세요.",
      );
  }
}
export async function createCase(data: CaseStudyFormData): Promise<CaseStudy> {
  validate(data);
  const cases = await getCases();
  const created = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await writeContent(KEY, [...cases, created]);
  return created;
}
export async function updateCase(
  id: string,
  data: Partial<CaseStudyFormData>,
): Promise<CaseStudy | null> {
  const cases = await getCases();
  const index = cases.findIndex((c) => c.id === id);
  if (index < 0) throw new Error("프로젝트를 찾을 수 없습니다.");
  const next = {
    ...cases[index],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };
  validate(next);
  cases[index] = next;
  await writeContent(KEY, cases);
  return next;
}
export async function deleteCase(id: string): Promise<boolean> {
  const cases = await getCases();
  const remaining = cases.filter((c) => c.id !== id);
  if (cases.length === remaining.length) return false;
  await writeContent(KEY, remaining);
  return true;
}
export async function reorderCases(ids: string[]): Promise<void> {
  const cases = await getCases();
  const ordered = [...new Set(ids)]
    .map((id) => cases.find((c) => c.id === id))
    .filter((c): c is CaseStudy => !!c);
  cases.forEach((c) => {
    if (!ordered.some((o) => o.id === c.id)) ordered.push(c);
  });
  await writeContent(
    KEY,
    ordered.map((c, order) => ({ ...c, order })),
  );
}
