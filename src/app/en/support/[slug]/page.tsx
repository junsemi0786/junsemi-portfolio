import Link from "next/link";
import { notFound } from "next/navigation";
import { englishGuides } from "@/lib/english-content";
import { englishPageMetadata, jsonLd, SITE_URL, BRAND } from "@/lib/site";
import InquiryCTA from "@/components/features/InquiryCTA";

export function generateStaticParams() { return englishGuides.map((g) => ({ slug: g.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const guide = englishGuides.find((g) => g.slug === slug); return guide ? englishPageMetadata(guide.title, guide.desc, `/en/support/${slug}`) : { title: "Guide not found", robots: { index: false } }; }
export default async function EnglishGuide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const guide = englishGuides.find((g) => g.slug === slug); if (!guide) notFound();
  return <><header className="page-intro container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en/support">Technical Guides</Link><span>/</span><span>Inquiry Preparation</span></nav><h1>{guide.title}</h1><p className="lead">{guide.desc}</p></header><article className="section container content-layout" style={{ paddingTop: 0 }}><div className="prose">{guide.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}</div><aside className="aside-panel"><h2>Related Service</h2><p>Review the engineering scope related to this issue.</p><Link href={`/en/services/${guide.service}`} className="btn-secondary">View Service Scope →</Link></aside></article><section className="section container"><InquiryCTA locale="en" /></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: guide.title, description: guide.desc, mainEntityOfPage: `${SITE_URL}/en/support/${slug}`, author: { "@type": "Organization", name: BRAND } }) }} /></>;
}
