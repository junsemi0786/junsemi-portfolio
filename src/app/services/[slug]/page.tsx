import Link from "next/link";
import { notFound } from "next/navigation";
import services from "@/lib/service-content.json";
import guides from "@/lib/guide-content.json";
import { SITE_URL, BRAND, jsonLd, pageMetadata } from "@/lib/site";
import InquiryCTA from "@/components/features/InquiryCTA";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return s
    ? pageMetadata(s.title, s.desc, `/services/${slug}`)
    : { title: "서비스를 찾을 수 없습니다", robots: { index: false } };
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <header className="page-intro container">
        <nav className="breadcrumbs" aria-label="현재 위치">
          <Link href="/">홈</Link>
          <span>/</span>
          <Link href="/expertise">기술 서비스</Link>
        </nav>
        <p className="eyebrow">{s.en}</p>
        <h1>{s.title}</h1>
        <p className="lead">{s.desc}</p>
      </header>
      <section
        className="section container content-layout"
        style={{ paddingTop: 0 }}
      >
        <div className="prose">
          <h2>이런 상황에서 문의해 주세요</h2>
          <ul>
            {s.problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <h2>검토 가능한 작업 범위</h2>
          <ul>
            {s.scope.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <h2>작업 후 정리할 자료</h2>
          <ul>
            {s.deliver.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="notice">{s.limit}</div>
          <h2>문의 전 참고 자료</h2>
          {guides
            .filter((g) => g.service === slug)
            .map((g) => (
              <p key={g.slug}>
                <Link href={`/support/${g.slug}`}>{g.title} →</Link>
              </p>
            ))}
          <p>
            <Link href="/cases">관련 현장 프로젝트 확인 →</Link>
          </p>
        </div>
        <aside className="aside-panel">
          <h2>지원 대상</h2>
          <p>{s.target}</p>
          <Link href={`/contact?service=${slug}`} className="btn-primary">
            이 작업 이메일 문의 ↗
          </Link>
        </aside>
      </section>
      <section className="section container">
        <InquiryCTA />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.desc,
            url: `${SITE_URL}/services/${slug}`,
            provider: { "@type": "Organization", name: BRAND, url: SITE_URL },
          }),
        }}
      />
    </>
  );
}
