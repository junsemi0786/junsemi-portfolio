import { englishPageMetadata } from "@/lib/site";
import ServiceCards from "@/components/features/ServiceCards";
import InquiryCTA from "@/components/features/InquiryCTA";

export const metadata = englishPageMetadata(
  "Engineering Services | Semiconductor Retrofit, PLC & SCADA",
  "Legacy semiconductor equipment refurbishment, PLC/HMI modernization, CIMON SCADA improvements and preventive control-system diagnostics.",
  "/en/expertise",
);

export default function EnglishExpertise() {
  return <>
    <header className="page-intro container"><p className="eyebrow">Engineering services</p><h1>Practical engineering for existing equipment</h1><p className="lead">We review the equipment condition, available documentation and operating constraints before defining the work scope and deliverables.</p></header>
    <section className="section container" style={{ paddingTop: 0 }}><ServiceCards locale="en" /></section>
    <section className="section container"><InquiryCTA locale="en" /></section>
  </>;
}
