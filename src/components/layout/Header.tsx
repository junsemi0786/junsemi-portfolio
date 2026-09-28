"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const prefix = isEnglish ? "/en" : "";
  const items = [
    [`${prefix}/expertise`, isEnglish ? "Services" : "기술 서비스"],
    [`${prefix}/cases`, isEnglish ? "Case Studies" : "프로젝트"],
    [`${prefix}/support`, isEnglish ? "Technical Guides" : "문제 해결 가이드"],
    [`${prefix}/partner`, isEnglish ? "Partnership" : "기술 협업"],
  ];
  const languageHref = isEnglish
    ? pathname.replace(/^\/en(?=\/|$)/, "") || "/"
    : pathname === "/"
      ? "/en"
      : `/en${pathname}`;

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {isEnglish ? "Skip to content" : "본문으로 건너뛰기"}
      </a>
      <div className="container header-inner">
        <Link
          href={isEnglish ? "/en" : "/"}
          className="brand"
          onClick={() => setOpen(false)}
          aria-label={isEnglish ? "JUNgenius home" : "JUNgenius 제이유엔지니어스 홈"}
        >
          <Image src="/images/logo_v2.png" alt="JUNgenius" width={184} height={48} priority />
          <span>{isEnglish ? "Industrial Engineering" : "제이유엔지니어스"}</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? (isEnglish ? "Close menu" : "메뉴 닫기") : isEnglish ? "Open menu" : "메뉴 열기"}
        </button>
        <nav
          id="site-navigation"
          className={open ? "site-nav open" : "site-nav"}
          aria-label={isEnglish ? "Main menu" : "주 메뉴"}
        >
          {items.map(([href, label]) => (
            <Link
              href={href}
              key={href}
              aria-current={pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          {!pathname.startsWith("/admin") && (
            <a
              href={languageHref}
              className="language-switch"
              hrefLang={isEnglish ? "ko-KR" : "en"}
              aria-label={isEnglish ? "한국어 페이지로 이동" : "View this page in English"}
            >
              {isEnglish ? "KO" : "EN"}
            </a>
          )}
          <Link href={`${prefix}/contact`} className="btn-primary" onClick={() => setOpen(false)}>
            {isEnglish ? "Email Inquiry ↗" : "이메일 문의 ↗"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
