import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseById } from "@/lib/cases-db";
import { toEnglishCase } from "@/lib/english-content";
import { englishPageMetadata, jsonLd, SITE_URL, BRAND } from "@/lib/site";
import InquiryCTA from "@/components/features/InquiryCTA";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getCaseById(id);
  if (!item || item.status !== "published") return { title: "Case study not found", robots: { index: false, follow: false } };
  const translated = toEnglishCase(item);
  return englishPageMetadata(translated.projectName, translated.summary, `/en/cases/${id}`);
}

export default async function EnglishCasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getCaseById(id);
  if (!item || item.status !== "published") notFound();
  const translated = toEnglishCase(item);
  return <>
    <header className="page-intro container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/en/cases">Case Studies</Link><span>/</span><span>{translated.clientName}</span></nav><p className="eyebrow">{item.period}</p><h1>{translated.projectName}</h1><p className="lead">{translated.summary}</p><div className="tags">{item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></header>
    <article className="section container content-layout" style={{ paddingTop: 0 }}><div>
      {item.thumbnailUrl && <div className="case-cover"><Image src={item.thumbnailUrl} alt={`${translated.projectName} field photo`} fill priority sizes="(max-width:900px) 100vw, 800px" /></div>}
      <div className="prose"><h2>Work Performed</h2>{translated.description.split("\n").filter((line) => line.trim()).map((line, index) => line.startsWith("## ") ? <h2 key={index}>{line.slice(3)}</h2> : <p key={index}>{line.replace(/^- /, "• ")}</p>)}{translated.outcome && <><h2>Verified Result</h2><p>{translated.outcome}</p></>}</div>
      {!!item.gallery?.length && <><h2 style={{ marginTop: 36 }}>Field Photos</h2><div className="gallery">{item.gallery.map((src, index) => <a href={src} key={`${src}-${index}`} target="_blank" rel="noreferrer"><Image src={src} alt={`${translated.projectName} detail ${index + 1}`} fill sizes="(max-width:740px) 45vw, 380px" /></a>)}</div></>}
    </div><aside className="aside-panel"><h2>Project Information</h2><p>{translated.clientName}</p><p>{item.period}</p><p style={{ marginTop: 16 }}>Tell us about similar equipment or symptoms. We will review a practical scope based on the site conditions.</p><Link href="/en/contact" className="btn-primary">Discuss Related Work ↗</Link><Link href="/en/expertise" className="card-link" style={{ display: "block" }}>View Engineering Services →</Link></aside></article>
    <section className="section container"><InquiryCTA locale="en" /></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "Article", inLanguage: "en", headline: translated.projectName, description: translated.summary, datePublished: item.createdAt, dateModified: item.updatedAt, mainEntityOfPage: `${SITE_URL}/en/cases/${id}`, image: item.thumbnailUrl ? `${SITE_URL}${item.thumbnailUrl}` : undefined, author: { "@type": "Organization", name: BRAND } }) }} />
  </>;
}
