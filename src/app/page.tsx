import Link from "next/link";
import { getMainPageData } from "@/lib/main-page-db";
import { getCases } from "@/lib/cases-db";
import { pageMetadata } from "@/lib/site";
import ServiceCards from "@/components/features/ServiceCards";
import ProjectList from "@/components/features/ProjectList";
import InquiryCTA from "@/components/features/InquiryCTA";
import guides from "@/lib/guide-content.json";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "반도체 장비 개조·수명연장 | PLC·SCADA 예방진단",
  "노후 반도체 장비 Retrofit·Life Extension, PLC 통신·HMI 개선, CIMON SCADA 알람·보고서와 자동제어 예방점검. 기존 설비의 문제를 기술로 해결합니다.",
  "/",
);
export default async function Home() {
  const [data, cases] = await Promise.all([getMainPageData(), getCases()]);
  const published = cases.filter((c) => c.status === "published");
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">{data.hero.badge}</p>
              <h1>
                {data.hero.titleLine1}
                <br />
                <span>{data.hero.titleLine2}</span>
              </h1>
              <p className="lead">{data.hero.description}</p>
              <div className="actions">
                <Link href="/contact" className="btn-primary">
                  현재 문제 상담하기 ↗
                </Link>
                <Link href="/cases" className="btn-secondary">
                  실제 프로젝트 보기
                </Link>
              </div>
            </div>
            <aside className="field-panel">
              <p className="eyebrow">현장에서 시작하는 기술 서비스</p>
              <Link href="/services/semiconductor">
                <strong>반도체 Legacy Equipment</strong>
                <span>Retrofit · Refurbish · Life Extension →</span>
              </Link>
              <Link href="/services/automation">
                <strong>산업 자동제어·예방진단</strong>
                <span>PLC · HMI · SCADA · 알람·데이터 →</span>
              </Link>
              <Link href="/partner">
                <strong>기존 유지관리 업체와 기술 협업</strong>
                <span>현장 업무에 필요한 제어 기술 지원 →</span>
              </Link>
            </aside>
          </div>
          <div className="scope-strip">
            <div>
              <strong>기존 설비부터 이해</strong>
              <span>구성·백업·운전 조건 확인</span>
            </div>
            <div>
              <strong>필요한 범위로 개선</strong>
              <span>진단 → 개선 → 점검 계획</span>
            </div>
            <div>
              <strong>기록으로 남기는 작업</strong>
              <span>변경 이력·백업·인수인계</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What we do</p>
              <h2>어떤 문제가 있으신가요?</h2>
              <p>
                설비 전체 교체에 앞서, 현재 구성에서 필요한 개선부터 검토합니다.
              </p>
            </div>
          </div>
          <ServiceCards />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected projects</p>
              <h2>현장에서 수행한 프로젝트</h2>
              <p>장비와 제어 시스템에서 실제로 수행한 작업을 확인하세요.</p>
            </div>
            <Link href="/cases">전체 프로젝트 보기 →</Link>
          </div>
          <ProjectList
            cases={published
              .slice(0, 6)
              .map(
                ({ id, projectName, period, summary, tags, thumbnailUrl }) => ({
                  id,
                  projectName,
                  period,
                  summary,
                  tags,
                  thumbnailUrl,
                }),
              )}
          />
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Technical notes</p>
              <h2>문제를 설명하기 어려울 때</h2>
              <p>
                담당 엔지니어가 없는 사업장도 모델명과 증상부터 정리할 수
                있습니다.
              </p>
            </div>
          </div>
          <div className="cards">
            {guides.map((g) => (
              <article key={g.slug} className="card">
                <div className="card-body">
                  <h3>
                    <Link href={`/support/${g.slug}`}>{g.title}</Link>
                  </h3>
                  <p>{g.desc}</p>
                  <Link href={`/support/${g.slug}`} className="card-link">
                    문의 전 확인할 자료 →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">How we work</p>
              <h2>문의부터 인수인계까지</h2>
            </div>
          </div>
          <div className="steps">
            {[
              [
                "01",
                "이메일로 현황 공유",
                "모델명, 증상, 사진과 희망 일정을 알려주세요.",
              ],
              [
                "02",
                "범위·비용 협의",
                "자료 검토와 필요 시 현장 확인 후 작업 범위와 견적을 정합니다.",
              ],
              [
                "03",
                "개선·시운전",
                "정지 일정과 복구 조건을 협의하고 변경 사항을 확인합니다.",
              ],
              [
                "04",
                "백업·점검 계획",
                "합의한 자료를 인계하고 후속 점검 필요성을 검토합니다.",
              ],
            ].map(([n, t, d]) => (
              <div className="step" key={n}>
                <span className="eyebrow">{n}</span>
                <strong>{t}</strong>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <InquiryCTA
            title={data.cta.title}
            description={data.cta.description}
          />
        </div>
      </section>
    </>
  );
}
