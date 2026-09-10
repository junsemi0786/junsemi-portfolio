"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="section container">
      <h1>자료를 불러오지 못했습니다.</h1>
      <p className="lead">
        잠시 후 다시 시도해 주세요. 기술 문의는 hello@junsemi.co.kr로 보내실 수
        있습니다.
      </p>
      <button className="btn-primary" onClick={reset} style={{ marginTop: 24 }}>
        다시 불러오기
      </button>
    </section>
  );
}
