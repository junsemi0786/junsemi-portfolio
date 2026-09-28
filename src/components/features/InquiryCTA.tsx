import Link from "next/link";
export default function InquiryCTA({
  title,
  description,
  locale = "ko",
}: { title?: string; description?: string; locale?: "ko" | "en" } = {}) {
  const en = locale === "en";
  return (
    <div className="cta-panel">
      <div>
        <h2>{title || (en ? "Start with the equipment model and current symptom." : "모델명과 현재 증상부터 알려주세요.")}</h2>
        <p>
          {description || (en
            ? "Send the equipment or controller model, current issue and preferred schedule. We will reply with the information needed to define the work scope."
            : "장비·제어기 모델, 발생하는 문제와 희망 일정을 보내주시면 검토 가능한 작업 범위와 필요한 자료를 안내합니다.")}
        </p>
      </div>
      <Link href={en ? "/en/contact" : "/contact"} className="btn-primary">
        {en ? "Email a Technical Inquiry ↗" : "이메일로 기술 문의 ↗"}
      </Link>
    </div>
  );
}
