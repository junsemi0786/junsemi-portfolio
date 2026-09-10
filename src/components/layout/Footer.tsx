import Link from "next/link";
import Image from "next/image";
import { getContactInfo } from "@/lib/contact-db";
export default async function Footer() {
  const info = await getContactInfo();
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
          <span>제이유엔지니어스</span>
          <p>
            기존 설비를 이해하고,
            <br />
            필요한 개선을 함께 만듭니다.
          </p>
        </div>
        <address>
          <p>대표 강성준 · Sungjun Kang</p>
          <p>{info.address}</p>
          <a href={`mailto:${info.email}`}>{info.email}</a>
          <p className="muted">기술 상담 및 견적 문의는 이메일로 받습니다.</p>
        </address>
        <nav aria-label="하단 메뉴">
          <Link href="/cases">프로젝트</Link>
          <Link href="/support">문제 해결 가이드</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
          <Link href="/admin">관리자</Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} JUNgenius. 제이유엔지니어스
      </div>
    </footer>
  );
}
