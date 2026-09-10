import InquiryCTA from "@/components/features/InquiryCTA";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "기술 협업 | 장비·전기 유지관리 업체의 PLC·SCADA 지원",
  "기존 설비·전기 유지관리 업체와 PLC·SCADA 및 반도체 장비 제어 업무를 나누어 수행하는 기술 협업을 검토합니다.",
  "/partner",
);
export default function Partner() {
  return (
    <>
      <header className="page-intro container">
        <p className="eyebrow">Engineering partnership</p>
        <h1>현장 경험에 제어 기술을 더합니다.</h1>
        <p className="lead">
          장비 리퍼비시·전기·설비 유지관리 업체가 필요로 하는 PLC·HMI·SCADA
          업무를 함께 검토합니다.
        </p>
      </header>
      <section className="section container prose" style={{ paddingTop: 0 }}>
        <h2>협업 가능한 업무</h2>
        <ul>
          <li>장비 개조에 필요한 PLC 프로그램·HMI 화면 개선</li>
          <li>기존 유지관리 현장의 CIMON SCADA 알람·트렌드·보고서 개선</li>
          <li>노후 제어기 교체와 계측 데이터 연동 검토</li>
          <li>프로그램 백업·변경 내용 정리 및 인수인계</li>
        </ul>
        <h2>시작하기 전에 정할 사항</h2>
        <p>
          고객 대응 창구, 업무별 책임 범위, 현장 일정, 자료 접근 권한과 결과물을
          먼저 협의합니다. 기존 계약과 현장 조건에 따라 수행 가능한 범위를
          검토합니다.
        </p>
      </section>
      <section className="section container">
        <InquiryCTA />
      </section>
    </>
  );
}
