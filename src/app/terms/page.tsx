import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "이용약관",
  "제이유엔지니어스 홈페이지 정보와 기술 문의 이용 안내.",
  "/terms",
);
export default function Terms() {
  return (
    <article className="section container prose">
      <h1>이용약관</h1>
      <h2>기술 정보의 이용</h2>
      <p>
        홈페이지의 서비스와 프로젝트 정보는 작업 범위를 이해하기 위한
        안내입니다. 개별 현장에 적용할 방법, 일정, 비용과 결과물은 자료 확인 및
        별도 협의를 통해 정합니다.
      </p>
      <h2>문의와 계약</h2>
      <p>
        이메일 문의만으로 작업 계약이 체결되지 않습니다. 견적, 수행 범위, 현장
        조건과 책임 범위를 합의한 뒤 진행합니다.
      </p>
      <h2>프로젝트 자료</h2>
      <p>
        게시된 사진과 기술 자료의 무단 복제 또는 재배포를 삼가 주세요. 자료
        이용에 관한 문의는 hello@junsemi.co.kr로 보내주세요.
      </p>
    </article>
  );
}
