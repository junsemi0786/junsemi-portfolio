"use client";
import { useState } from "react";
export default function ContactForm({
  email = "hello@junsemi.co.kr",
  service,
}: {
  email?: string;
  service?: string;
}) {
  const [draft, setDraft] = useState("");
  const [subject, setSubject] = useState("");
  const [notice, setNotice] = useState("");
  function prepare(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubject(`[기술 문의] ${data.get("type")} · ${data.get("company")}`);
    setDraft(
      `회사/사업장: ${data.get("company")}\n담당자: ${data.get("name")}\n회신 이메일: ${data.get("email")}\n분야: ${data.get("type")}\n\n장비 모델·증상·희망 일정\n${data.get("message")}`,
    );
    setNotice(
      "초안을 만들었습니다. 아래에서 메일 앱을 열거나 내용을 복사한 뒤 이메일을 직접 보내주세요.",
    );
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        `받는 사람: ${email}\n제목: ${subject}\n\n${draft}`,
      );
      setNotice(
        "문의 내용을 복사했습니다. 사용하시는 이메일에서 붙여넣고 보내주세요.",
      );
    } catch {
      setNotice("아래 초안을 직접 선택해 복사해 주세요.");
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={prepare}
      onChange={() => {
        setDraft("");
        setNotice("");
      }}
    >
      <div className="form-row">
        <label>
          회사·사업장명 *
          <input
            name="company"
            required
            maxLength={100}
            autoComplete="organization"
          />
        </label>
        <label>
          담당자명 *
          <input name="name" required maxLength={80} autoComplete="name" />
        </label>
      </div>
      <label>
        회신받을 이메일 *
        <input
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
        />
      </label>
      <label>
        문의 분야
        <select
          name="type"
          defaultValue={
            (
              {
                semiconductor: "반도체 장비 개조·수명연장",
                automation: "산업 자동제어 예방진단",
                plc: "PLC·HMI 개선",
                scada: "CIMON SCADA",
              } as Record<string, string>
            )[service || ""] || "반도체 장비 개조·수명연장"
          }
        >
          <option>반도체 장비 개조·수명연장</option>
          <option>산업 자동제어 예방진단</option>
          <option>PLC·HMI 개선</option>
          <option>CIMON SCADA</option>
          <option>기술 협업·기타</option>
        </select>
      </label>
      <label>
        장비 모델·현재 증상·희망 일정 *
        <textarea
          name="message"
          required
          rows={7}
          maxLength={4000}
          placeholder="예: LS PLC와 연결된 화면에 통신 오류가 반복됩니다. 모델명과 오류 화면을 첨부할 수 있습니다."
        />
      </label>
      <small>
        이 양식은 브라우저에서 이메일 초안만 만듭니다. 첨부 사진과 자료는
        사용하시는 이메일에서 추가해 주세요.
      </small>
      <button type="submit" className="btn-primary">
        이메일 초안 만들기
      </button>
      <p role="status" aria-live="polite">
        {notice}
      </p>
      {draft && (
        <div className="notice">
          <p>
            <strong>받는 사람: {email}</strong>
          </p>
          <label>
            문의 초안
            <textarea
              readOnly
              value={`제목: ${subject}\n\n${draft}`}
              rows={10}
            />
          </label>
          <div className="actions">
            <a
              className="btn-primary"
              href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`}
            >
              메일 앱 열기 ↗
            </a>
            <button type="button" className="btn-secondary" onClick={copy}>
              내용 복사
            </button>
          </div>
          <p className="muted">
            아직 전송되지 않았습니다. 이메일에서 보내기를 완료해 주세요.
          </p>
        </div>
      )}
    </form>
  );
}
