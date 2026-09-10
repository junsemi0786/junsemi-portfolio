import Link from "next/link";
import { getExpertiseList } from "@/lib/expertise-db";
import { pageMetadata } from "@/lib/site";
import ServiceCards from "@/components/features/ServiceCards";
import InquiryCTA from "@/components/features/InquiryCTA";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "기술 서비스 | 반도체 Retrofit·PLC·CIMON SCADA",
  "반도체 노후 장비 리퍼비시, 산업 자동제어 예방진단, PLC·HMI 교체 및 CIMON SCADA 알람·트렌드·보고서 개선.",
  "/expertise",
);
export default async function Expertise() {
  const items = await getExpertiseList();
  return (
    <>
      <header className="page-intro container">
        <p className="eyebrow">Engineering services</p>
        <h1>현장 조건에 맞춘 기술 서비스</h1>
        <p className="lead">
          장비 상태와 보유 자료를 확인하고, 수행 범위와 결과물을 먼저
          협의합니다.
        </p>
      </header>
      <section className="section container" style={{ paddingTop: 0 }}>
        <ServiceCards />
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>장비·제어 기술 역량</h2>
              <p>기존 장비와 사용 중인 시스템에 대한 지원 범위를 확인하세요.</p>
            </div>
          </div>
          <div className="cards">
            {items.map((i) => (
              <article className="card" key={i.id}>
                <div className="card-body">
                  <p className="eyebrow">{i.subtitle}</p>
                  <h3>
                    <Link href={`/expertise/${i.id}`}>{i.title}</Link>
                  </h3>
                  <p>{i.description}</p>
                  <Link className="card-link" href={`/expertise/${i.id}`}>
                    상세 기술 보기 →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <InquiryCTA />
      </section>
    </>
  );
}
