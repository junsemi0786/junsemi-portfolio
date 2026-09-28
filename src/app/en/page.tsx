import Link from "next/link";
import { getCases } from "@/lib/cases-db";
import { englishPageMetadata } from "@/lib/site";
import { toEnglishCase, englishGuides } from "@/lib/english-content";
import ServiceCards from "@/components/features/ServiceCards";
import ProjectList from "@/components/features/ProjectList";
import InquiryCTA from "@/components/features/InquiryCTA";

export const dynamic = "force-dynamic";
export const metadata = englishPageMetadata(
  "Legacy Semiconductor Equipment Retrofit, PLC & SCADA Engineering",
  "Korea-based engineering support for legacy semiconductor equipment retrofit, life extension, PLC/HMI modernization, CIMON SCADA and preventive control-system diagnostics.",
  "/en",
);

export default async function EnglishHome() {
  const cases = (await getCases()).filter((c) => c.status === "published").slice(0, 6);
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">JUNgenius · Industrial Engineering in Korea</p>
              <h1>
                Extend the life of existing equipment.
                <br />
                <span>Improve controls with a practical scope.</span>
              </h1>
              <p className="lead">
                Retrofit and life-extension support for legacy semiconductor equipment,
                plus PLC, HMI and SCADA improvements for industrial facilities.
              </p>
              <div className="actions">
                <Link href="/en/contact" className="btn-primary">Discuss Your Equipment ↗</Link>
                <Link href="/en/cases" className="btn-secondary">View Case Studies</Link>
              </div>
            </div>
            <aside className="field-panel">
              <p className="eyebrow">Engineering services built around the field condition</p>
              <Link href="/en/services/semiconductor">
                <strong>Legacy Semiconductor Equipment</strong>
                <span>Retrofit · Refurbishment · Life Extension →</span>
              </Link>
              <Link href="/en/services/automation">
                <strong>Industrial Controls & Preventive Diagnostics</strong>
                <span>PLC · HMI · SCADA · Alarm & Data →</span>
              </Link>
              <Link href="/en/partner">
                <strong>Engineering Partnership</strong>
                <span>Control engineering support for local service partners →</span>
              </Link>
            </aside>
          </div>
          <div className="scope-strip">
            <div><strong>Understand the existing system</strong><span>Configuration, backups and operating conditions</span></div>
            <div><strong>Improve the required scope</strong><span>Assessment → retrofit → maintenance plan</span></div>
            <div><strong>Document the work</strong><span>Change history, backups and handover</span></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">What we do</p><h2>Engineering services for real equipment problems</h2><p>We first review the existing system and define the smallest practical improvement scope.</p></div></div>
          <ServiceCards locale="en" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Selected projects</p><h2>Field-proven project experience</h2><p>See work completed on semiconductor equipment and industrial control systems.</p></div>
            <Link href="/en/cases">View all case studies →</Link>
          </div>
          <ProjectList
            locale="en"
            cases={cases.map((c) => {
              const translated = toEnglishCase(c);
              return { id: c.id, projectName: translated.projectName, period: c.period, summary: translated.summary, tags: c.tags, thumbnailUrl: c.thumbnailUrl };
            })}
          />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">Technical guides</p><h2>Prepare the right information before an inquiry</h2><p>Model numbers, symptoms, backups and operating conditions help define a realistic scope.</p></div></div>
          <div className="cards">
            {englishGuides.slice(0, 4).map((g) => (
              <article className="card" key={g.slug}><div className="card-body"><h3><Link href={`/en/support/${g.slug}`}>{g.title}</Link></h3><p>{g.desc}</p><Link href={`/en/support/${g.slug}`} className="card-link">Read guide →</Link></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">How we work</p><h2>From inquiry to handover</h2></div></div><div className="steps">
        {[
          ["01", "Share the current condition", "Send the model, symptom, photos and preferred schedule."],
          ["02", "Agree on scope and cost", "We review the information and define the work and quotation."],
          ["03", "Retrofit and commissioning", "Downtime, recovery conditions and verification items are agreed in advance."],
          ["04", "Backup and handover", "Agreed backups, change records and follow-up items are delivered."],
        ].map(([n, title, desc]) => <div className="step" key={n}><span className="eyebrow">{n}</span><strong>{title}</strong><p>{desc}</p></div>)}
      </div></div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="container"><InquiryCTA locale="en" /></div></section>
    </>
  );
}
