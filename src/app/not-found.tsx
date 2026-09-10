import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section container">
      <p className="eyebrow">404</p>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p className="lead" style={{ marginTop: 20 }}>
        주소를 확인하거나 공개된 프로젝트 목록에서 찾아주세요.
      </p>
      <div className="actions">
        <Link href="/cases" className="btn-primary">
          프로젝트 보기
        </Link>
        <Link href="/" className="btn-secondary">
          홈으로
        </Link>
      </div>
    </section>
  );
}
