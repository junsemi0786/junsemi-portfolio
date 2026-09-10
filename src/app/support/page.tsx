import Link from "next/link";
import guides from "@/lib/guide-content.json";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "PLC·SCADA 문제 해결 가이드 | 통신 오류·알람·예방점검",
  "PLC 통신 오류, CIMON 알람·보고서, 단종 제어기 교체와 공장 자동제어 예방점검. 기술 업체에 문의하기 전 필요한 자료를 안내합니다.",
  "/support",
);
export default function Support() {
  return (
    <>
      <header className="page-intro container">
        <p className="eyebrow">Technical notes</p>
        <h1>문제 해결의 시작, 현황 정리</h1>
        <p className="lead">
          자동제어 담당자가 없는 사업장도 현재 증상과 모델명부터 정리해 주세요.
        </p>
      </header>
      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="cards">
          {guides.map((g) => (
            <article className="card" key={g.slug}>
              <div className="card-body">
                <h2>
                  <Link href={`/support/${g.slug}`}>{g.title}</Link>
                </h2>
                <p>{g.desc}</p>
                <Link className="card-link" href={`/support/${g.slug}`}>
                  가이드 읽기 →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
