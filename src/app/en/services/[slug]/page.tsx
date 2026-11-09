import Link from "next/link";
import { notFound } from "next/navigation";
import { englishServices, englishGuides } from "@/lib/english-content";
import { SITE_URL, BRAND, jsonLd, englishPageMetadata } from "@/lib/site";
import InquiryCTA from "@/components/features/InquiryCTA";

export function generateStaticParams() { return englishServices.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = englishServices.find((s) => s.slug === slug);
  return service ? englishPageMetadata(service.title, service.desc, `/en/services/${slug}`) : { title: "Service not found", robots: { index: false } };
}
export default async function EnglishService({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = englishServices.find((s) => s.slug === slug);
  if (!service) notFound();
  return <>
    <header className="page-intro container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/expertise">Services</Link></nav><p className="eyebrow">{service.eyebrow}</p><h1>{service.title}</h1><p className="lead">{service.desc}</p></header>
    <section className="section container content-layout" style={{ paddingTop: 0 }}><div className="prose"><h2>Engineering approach</h2><p>{service.overview}</p><h2>When to contact us</h2><ul>{service.problems.map((p) => <li key={p}>{p}</li>)}</ul><h2>Work scope we can review</h2><ul>{service.scope.map((p) => <li key={p}>{p}</li>)}</ul><h2>Typical deliverables</h2><ul>{service.deliver.map((p) => <li key={p}>{p}</li>)}</ul><div className="notice">{service.limit}</div><h2>Technical guides</h2>{englishGuides.filter((g) => g.service === slug).map((g) => <p key={g.slug}><Link href={`/en/support/${g.slug}`}>{g.title} →</Link></p>)}<p><Link href={slug === "semiconductor" ? "/en/cases/66507b67-7a02-449b-abd4-5bca62f45edd" : "/en/cases"}>{slug === "semiconductor" ? "FSI Mercury MP refurbishment and process setup case study →" : "View related field projects →"}</Link></p></div><aside className="aside-panel"><h2>Who we support</h2><p>{service.target}</p><Link href={`/en/contact?service=${slug}`} className="btn-primary">Email an Inquiry ↗</Link></aside></section>
    <section className="section container"><InquiryCTA locale="en" /></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.desc, url: `${SITE_URL}/en/services/${slug}`, provider: { "@type": "Organization", name: BRAND, url: SITE_URL } }) }} />
  </>;
}
