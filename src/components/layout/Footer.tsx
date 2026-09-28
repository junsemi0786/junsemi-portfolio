import Link from "next/link";
import Image from "next/image";
import { getContactInfo } from "@/lib/contact-db";
import { isProductionSite } from "@/lib/site";
import VisitorCounter from "./VisitorCounter";
export default async function Footer({ locale = "ko" }: { locale?: "ko" | "en" }) {
  const info = await getContactInfo();
  const en = locale === "en";
  const prefix = en ? "/en" : "";
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="brand">
          <Image
            src="/images/logo_v2.png"
            alt="JUNgenius"
            width={184}
            height={48}
          />
          <span>{en ? "Industrial Engineering" : "제이유엔지니어스"}</span>
          <p>
            {en ? (
              "Practical improvements built around your existing equipment."
            ) : (
              <>기존 설비를 이해하고,<br />필요한 개선을 함께 만듭니다.</>
            )}
          </p>
        </div>
        <address>
          <p>{en ? "Sungjun Kang · Managing Director" : "대표 강성준 · Sungjun Kang"}</p>
          {!en && <p>{info.address}</p>}
          <a href={`mailto:${info.email}`}>{info.email}</a>
          <p className="muted">
            {en
              ? "Technical inquiries and quotation requests are accepted by email."
              : "기술 상담 및 견적 문의는 이메일로 받습니다."}
          </p>
        </address>
        <nav aria-label={en ? "Footer menu" : "하단 메뉴"}>
          <Link href={`${prefix}/cases`}>{en ? "Case Studies" : "프로젝트"}</Link>
          <Link href={`${prefix}/support`}>{en ? "Technical Guides" : "문제 해결 가이드"}</Link>
          <Link href={`${prefix}/privacy`}>{en ? "Privacy" : "개인정보처리방침"}</Link>
          <Link href={`${prefix}/terms`}>{en ? "Terms" : "이용약관"}</Link>
          {!en && <Link href="/admin">관리자</Link>}
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} JUNgenius{en ? "" : ". 제이유엔지니어스"}</span>
        <VisitorCounter preview={!isProductionSite} />
      </div>
    </footer>
  );
}
