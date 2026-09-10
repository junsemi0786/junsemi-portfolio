import { getCases } from "@/lib/cases-db";
import { pageMetadata } from "@/lib/site";
import ProjectList from "@/components/features/ProjectList";
import InquiryCTA from "@/components/features/InquiryCTA";
export const metadata = pageMetadata(
  "프로젝트 | 반도체 장비 개조·정수장 SCADA·PLC",
  "SAT 약품 공급장치, Etch Loadlock 도어 연동, 정수장 CIMON SCADA·PLC 유지보수 등 실제 프로젝트.",
  "/cases",
);
export const dynamic = "force-dynamic";
export default async function CasesPage() {
  const cases = (await getCases())
    .filter((c) => c.status === "published")
    .map(({ id, projectName, period, summary, tags, thumbnailUrl }) => ({
      id,
      projectName,
      period,
      summary,
      tags,
      thumbnailUrl,
    }));
  return (
    <>
      <header className="page-intro container">
        <p className="eyebrow">Project archive</p>
        <h1>작업으로 설명하는 기술 역량</h1>
        <p className="lead">
          현장의 문제와 수행한 작업을 프로젝트별로 확인하세요.
        </p>
      </header>
      <section className="section container" style={{ paddingTop: 0 }}>
        <ProjectList cases={cases} filter />
      </section>
      <section className="section container" style={{ paddingTop: 0 }}>
        <InquiryCTA />
      </section>
    </>
  );
}
