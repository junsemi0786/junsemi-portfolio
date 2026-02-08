import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "부천 PLC, 전장 & SCADA | 엔지니어링 플랫폼",
  description: "반도체 장비 리퍼비시부터 관공서 SCADA 구축까지. 부천/경기 지역 노후 설비 수명 연장과 스마트 제어 전문 기업.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <Header />
        <main style={{ minHeight: 'calc(100vh - var(--header-height))', paddingTop: 'var(--header-height)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
