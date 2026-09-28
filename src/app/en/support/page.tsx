import Link from "next/link";
import { englishGuides } from "@/lib/english-content";
import { englishPageMetadata } from "@/lib/site";

export const metadata = englishPageMetadata(
  "Technical Guides | PLC Communication, SCADA & Preventive Maintenance",
  "Practical preparation guides for PLC communication errors, CIMON SCADA improvements, obsolete controller migration and preventive control-system checks.",
  "/en/support",
);
export default function EnglishSupport() {
  return <><header className="page-intro container"><p className="eyebrow">Technical guides</p><h1>Start troubleshooting by organizing the current condition</h1><p className="lead">Even without an in-house automation engineer, model numbers, symptoms and available backups can help define the next step.</p></header><section className="section container" style={{ paddingTop: 0 }}><div className="cards">{englishGuides.map((guide) => <article className="card" key={guide.slug}><div className="card-body"><h2><Link href={`/en/support/${guide.slug}`}>{guide.title}</Link></h2><p>{guide.desc}</p><Link className="card-link" href={`/en/support/${guide.slug}`}>Read guide →</Link></div></article>)}</div></section></>;
}
