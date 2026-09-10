import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseById } from "@/lib/cases-db";
import { pageMetadata, jsonLd, SITE_URL, BRAND } from "@/lib/site";
import InquiryCTA from "@/components/features/InquiryCTA";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = await getCaseById(id);
  if (!c || c.status !== "published")
    return {
      title: "프로젝트를 찾을 수 없습니다",
      robots: { index: false, follow: false },
    };
  return pageMetadata(c.projectName, c.summary, `/cases/${id}`);
}
export default async function CasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = await getCaseById(id);
  if (!c || c.status !== "published") notFound();
  // This exact legacy sentence has no clear measurement; avoid repeating it as a quantified result.
  const description = c.description.replace(
    "오류를 30% 비용 절감",
    "CIMON SCADA로 중앙 모니터링 시스템을 변경했습니다.",
  );
  return (
    <>
      <header className="page-intro container">
        <nav className="breadcrumbs" aria-label="현재 위치">
          <Link href="/cases">프로젝트</Link>
          <span>/</span>
          <span>{c.clientName}</span>
        </nav>
        <p className="eyebrow">{c.period}</p>
        <h1>{c.projectName}</h1>
        <p className="lead">{c.summary}</p>
        <div className="tags">
          {c.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </header>
      <article
        className="section container content-layout"
        style={{ paddingTop: 0 }}
      >
        <div>
          {c.thumbnailUrl && (
            <div className="case-cover">
              <Image
                src={c.thumbnailUrl}
                alt={`${c.projectName} 현장 사진`}
                fill
                priority
                sizes="(max-width:900px) 100vw, 800px"
              />
            </div>
          )}
          <div className="prose">
            <h2>수행한 작업</h2>
            {description
              .split("\n")
              .filter((line) => line.trim())
              .map((line, i) =>
                line.startsWith("## ") ? (
                  <h2 key={i}>{line.slice(3)}</h2>
                ) : (
                  <p key={i}>{line.replace(/^- /, "• ")}</p>
                ),
              )}
            {c.outcome && (
              <>
                <h2>작업 결과</h2>
                <p>{c.outcome}</p>
              </>
            )}
          </div>
          {!!c.gallery?.length && (
            <>
              <h2 style={{ marginTop: 36 }}>현장 사진</h2>
              <div className="gallery">
                {c.gallery.map((src, i) => (
                  <a
                    href={src}
                    key={`${src}-${i}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={src}
                      alt={`${c.projectName} 상세 사진 ${i + 1}`}
                      fill
                      sizes="(max-width:740px) 45vw, 380px"
                    />
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
        <aside className="aside-panel">
          <h2>프로젝트 정보</h2>
          <p>{c.clientName}</p>
          <p>{c.period}</p>
          <p style={{ marginTop: 16 }}>
            비슷한 장비나 증상을 알려주시면 현장 조건에 맞는 작업 범위를
            검토합니다.
          </p>
          <Link href="/contact" className="btn-primary">
            관련 작업 문의 ↗
          </Link>
          <Link
            href="/expertise"
            className="card-link"
            style={{ display: "block" }}
          >
            기술 서비스 보기 →
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
            headline: c.projectName,
            description: c.summary,
            datePublished: c.createdAt,
            dateModified: c.updatedAt,
            mainEntityOfPage: `${SITE_URL}/cases/${id}`,
            image: c.thumbnailUrl ? `${SITE_URL}${c.thumbnailUrl}` : undefined,
            author: { "@type": "Organization", name: BRAND },
          }),
        }}
      />
    </>
  );
}
