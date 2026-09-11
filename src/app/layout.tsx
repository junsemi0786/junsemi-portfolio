import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ToastProvider from "@/components/providers/ToastProvider";
import { BRAND, SITE_URL, EMAIL, isProductionSite, jsonLd } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND} | 반도체 장비 개조·PLC·SCADA`,
    template: `%s | ${BRAND}`,
  },
  description:
    "반도체 Legacy 장비 Retrofit·수명연장, 산업 자동제어 예방진단, PLC·HMI 개선과 CIMON SCADA 유지보수. 현장 문제와 기존 구성에 맞는 기술 서비스를 제공합니다.",
  robots: { index: isProductionSite, follow: isProductionSite },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification":
        process.env.NAVER_SITE_VERIFICATION ||
        "249757994ea08c5b834a9cfd5fdeec2248786ab2",
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <LanguageProvider>
          <ToastProvider />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: BRAND,
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo_v2.png`,
              email: EMAIL,
              founder: { "@type": "Person", name: "강성준" },
            }),
          }}
        />
      </body>
    </html>
  );
}
