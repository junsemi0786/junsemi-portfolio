import ContactForm from "@/components/home/ContactForm";
import { getContactInfo } from "@/lib/contact-db";
import { englishPageMetadata } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = englishPageMetadata("Email Technical Inquiry | Semiconductor Equipment, PLC & SCADA", "Email Sungjun Kang at JUNgenius about legacy semiconductor equipment retrofit, PLC/HMI modernization, CIMON SCADA or preventive control-system diagnostics.", "/en/contact");
export default async function EnglishContact({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const [info, query] = await Promise.all([getContactInfo(), searchParams]);
  return <><header className="page-intro container"><p className="eyebrow">Technical inquiry</p><h1>Tell us about the problem you are facing</h1><p className="lead">An equipment model and a description of the symptom are enough to start. We will reply with the information needed to review the work scope.</p></header><section className="section container content-layout" style={{ paddingTop: 0 }}><div><ContactForm email={info.email} service={query.service} locale="en" /></div><aside className="aside-panel"><h2>Inquiries by email</h2><a className="email-address" href={`mailto:${info.email}`}>{info.email}</a><p style={{ marginTop: 20 }}>Sungjun Kang · Managing Director</p><p>JUNgenius</p><div className="notice">Helpful information:<br />① Equipment/controller model<br />② Error screen or site photos<br />③ Available backups and drawings<br />④ Permitted downtime and preferred schedule</div><p>After reviewing the information, we will discuss the feasible scope and quotation.</p></aside></section></>;
}
