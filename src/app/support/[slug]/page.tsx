import Link from "next/link";
import { notFound } from "next/navigation";
import guides from "@/lib/guide-content.json";
import { pageMetadata, jsonLd, SITE_URL, BRAND } from "@/lib/site";
import InquiryCTA from "@/components/features/InquiryCTA";
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  return g
    ? pageMetadata(g.title, g.desc, `/support/${slug}`)
    : { title: "가이드를 찾을 수 없습니다", robots: { index: false } };
}
export default async function Guide({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) notFound();
  return (
    <>
      <header className="page-intro container">
        <nav className="breadcrumbs" aria-label="현재 위치">
          <Link href="/support">문제 해결 가이드</Link>
          <span>/</span>
          <span>기술 문의 준비</span>
        </nav>
        <h1>{g.title}</h1>
        <p className="lead">{g.desc}</p>
      </header>
      <article
        className="section container content-layout"
        style={{ paddingTop: 0 }}
      >
        <div className="prose">
          {g.sections.map(([title, body]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
        </div>
        <aside className="aside-panel">
          <h2>관련 기술 서비스</h2>
          <p>현재 시스템과 증상에 맞는 작업 범위를 확인해 보세요.</p>
          <Link href={`/services/${g.service}`} className="btn-secondary">
            서비스 범위 보기 →
          </Link>
        </aside>
      </article>
      <section className="section container">
        <InquiryCTA />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.desc,
            mainEntityOfPage: `${SITE_URL}/support/${slug}`,
            author: { "@type": "Organization", name: BRAND },
          }),
        }}
      />
    </>
  );
}
