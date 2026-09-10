import Link from "next/link";
export default function InquiryCTA({
  title,
  description,
}: { title?: string; description?: string } = {}) {
  return (
    <div className="cta-panel">
      <div>
        <h2>{title || "모델명과 현재 증상부터 알려주세요."}</h2>
        <p>
          {description ||
            "장비·제어기 모델, 발생하는 문제와 희망 일정을 보내주시면 검토 가능한 작업 범위와 필요한 자료를 안내합니다."}
        </p>
      </div>
      <Link href="/contact" className="btn-primary">
        이메일로 기술 문의 ↗
      </Link>
    </div>
  );
}
