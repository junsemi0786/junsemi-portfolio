import { getCases } from "@/lib/cases-db";
import { englishPageMetadata } from "@/lib/site";
import { toEnglishCase } from "@/lib/english-content";
import ProjectList from "@/components/features/ProjectList";
import InquiryCTA from "@/components/features/InquiryCTA";

export const dynamic = "force-dynamic";
export const metadata = englishPageMetadata(
  "Case Studies | Semiconductor Equipment, PLC & SCADA",
  "Field projects including semiconductor equipment retrofit, flow and interlock improvements, CVD equipment monitoring, load-lock controls and CIMON SCADA.",
  "/en/cases",
);

export default async function EnglishCasesPage() {
  const cases = (await getCases()).filter((c) => c.status === "published").map((c) => {
    const translated = toEnglishCase(c);
    return { id: c.id, projectName: translated.projectName, period: c.period, summary: translated.summary, tags: c.tags, thumbnailUrl: c.thumbnailUrl };
  });
  return <>
    <header className="page-intro container"><p className="eyebrow">Project archive</p><h1>Engineering capability demonstrated through field work</h1><p className="lead">Explore completed semiconductor equipment and industrial control-system projects.</p></header>
    <section className="section container" style={{ paddingTop: 0 }}><ProjectList cases={cases} filter locale="en" /></section>
    <section className="section container" style={{ paddingTop: 0 }}><InquiryCTA locale="en" /></section>
  </>;
}
