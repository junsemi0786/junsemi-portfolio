"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = [
    ["/expertise", "기술 서비스"],
    ["/cases", "프로젝트"],
    ["/support", "문제 해결 가이드"],
    ["/partner", "기술 협업"],
  ];
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        본문으로 건너뛰기
      </a>
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label="JUNgenius 제이유엔지니어스 홈"
        >
          <Image
            src="/images/logo_v2.png"
            alt="JUNgenius"
            width={184}
            height={48}
            priority
          />
          <span>제이유엔지니어스</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "메뉴 닫기" : "메뉴 열기"}
        </button>
        <nav
          id="site-navigation"
          className={open ? "site-nav open" : "site-nav"}
          aria-label="주 메뉴"
        >
          {items.map(([href, label]) => (
            <Link
              href={href}
              key={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary"
            onClick={() => setOpen(false)}
          >
            이메일 문의 ↗
          </Link>
        </nav>
      </div>
    </header>
  );
}
