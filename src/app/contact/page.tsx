import ContactForm from "@/components/home/ContactForm";
import { getContactInfo } from "@/lib/contact-db";
import { pageMetadata } from "@/lib/site";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "이메일 기술 문의 | PLC·SCADA·반도체 장비",
  "제이유엔지니어스 강성준 대표에게 반도체 장비 Retrofit, PLC·SCADA 개선, 예방진단 범위를 이메일로 문의하세요.",
  "/contact",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const [info, query] = await Promise.all([getContactInfo(), searchParams]);
  return (
    <>
      <header className="page-intro container">
        <p className="eyebrow">Technical inquiry</p>
        <h1>지금 겪는 문제를 알려주세요.</h1>
        <p className="lead">
          모델명과 증상만 있어도 괜찮습니다. 검토에 필요한 자료와 작업 범위를
          이메일로 안내합니다.
        </p>
      </header>
      <section
        className="section container content-layout"
        style={{ paddingTop: 0 }}
      >
        <div>
          <ContactForm email={info.email} service={query.service} />
        </div>
        <aside className="aside-panel">
          <h2>이메일로 문의 받습니다.</h2>
          <a className="email-address" href={`mailto:${info.email}`}>
            {info.email}
          </a>
          <p style={{ marginTop: 20 }}>대표 강성준 · Sungjun Kang</p>
          <p>제이유엔지니어스 · JUNgenius</p>
          <div className="notice">
            함께 보내주시면 좋습니다.
            <br />① 장비·제어기 모델명
            <br />② 오류 화면·현장 사진
            <br />③ 백업·도면 보유 여부
            <br />④ 정지 가능한 시간·희망 일정
          </div>
          <p>문의 내용을 확인한 뒤 수행 범위와 견적을 협의합니다.</p>
        </aside>
      </section>
    </>
  );
}
