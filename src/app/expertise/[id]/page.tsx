import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getExpertiseById } from "@/lib/expertise-db";
import { pageMetadata } from "@/lib/site";
import InquiryCTA from "@/components/features/InquiryCTA";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getExpertiseById(id);
  return item
    ? pageMetadata(item.title, item.description, `/expertise/${id}`)
    : { title: "기술 역량을 찾을 수 없습니다", robots: { index: false } };
}
export default async function ExpertiseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getExpertiseById(id);
  if (!item) notFound();
  return (
    <>
      <header className="page-intro container">
        <nav className="breadcrumbs" aria-label="현재 위치">
          <Link href="/expertise">기술 서비스</Link>
          <span>/</span>
          <span>{item.subtitle}</span>
        </nav>
        <h1>{item.title}</h1>
        <p className="lead">{item.description}</p>
      </header>
      <section
        className="section container content-layout"
        style={{ paddingTop: 0 }}
      >
        <div>
          {item.imageSrc && (
            <div className="case-cover">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                sizes="(max-width:900px) 100vw, 800px"
                priority
              />
            </div>
          )}
          <div className="prose">
            <h2>지원 기술</h2>
            <ul>
              {item.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="tags">
            {item.keywords.map((k, i) => (
              <span className="tag" key={i}>
                {k}
              </span>
            ))}
          </div>
        </div>
        <aside className="aside-panel">
          <h2>현재 구성부터 확인합니다.</h2>
          <p>모델명, 현재 증상과 보유 자료를 이메일로 알려주세요.</p>
          <Link href="/contact" className="btn-primary">
            기술 문의 ↗
          </Link>
        </aside>
      </section>
      <section className="section container">
        <InquiryCTA />
      </section>
    </>
  );
}
