import { TechnicalExpertise, ExpertiseFormData } from "@/types/expertise";
import { readContent, writeContent } from "./content-store";
import { cleanExpertiseDescription } from "./content-text";
const KEY = "expertise_data";
export async function getExpertiseList(): Promise<TechnicalExpertise[]> {
  const data = await readContent<TechnicalExpertise[]>(
    KEY,
    "expertise.json",
    [],
  );
  return data
    .map((i) => ({
      ...i,
      description: cleanExpertiseDescription(i.description),
      order: i.order ?? 0,
      keywords: i.keywords ?? [],
      features: i.features ?? [],
    }))
    .sort((a, b) => a.order - b.order);
}
export async function getExpertiseById(id: string) {
  return (await getExpertiseList()).find((i) => i.id === id);
}
export async function createExpertise(data: ExpertiseFormData) {
  const list = await getExpertiseList();
  const item = {
    ...data,
    id: data.id || crypto.randomUUID(),
    updatedAt: new Date().toISOString(),
  };
  if (list.some((i) => i.id === item.id))
    throw new Error("이미 사용 중인 주소입니다.");
  await writeContent(KEY, [...list, item]);
  return item;
}
export async function updateExpertise(
  id: string,
  data: Partial<ExpertiseFormData>,
) {
  const list = await getExpertiseList();
  const index = list.findIndex((i) => i.id === id);
  if (index < 0) return null;
  const item = {
    ...list[index],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };
  list[index] = item;
  await writeContent(KEY, list);
  return item;
}
export async function deleteExpertise(id: string) {
  const list = await getExpertiseList();
  const rest = list.filter((i) => i.id !== id);
  if (rest.length === list.length) return false;
  await writeContent(KEY, rest);
  return true;
}
