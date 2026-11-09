import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.junsemi.co.kr" }],
        destination: "https://junsemi.co.kr/:path*",
        permanent: true,
      },
      {
        source: "/images/door9.jpg-3",
        destination: "/images/door9.jpg",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/cases",
        permanent: true,
      },
      {
        source: "/solutions",
        destination: "/expertise",
        permanent: true,
      },
      {
        source: "/cases/192e0012-d336-4a33-9e87-4cf6f0ef1c41",
        destination: "/services/scada",
        permanent: true,
      },
      {
        source: "/en/cases/192e0012-d336-4a33-9e87-4cf6f0ef1c41",
        destination: "/en/services/scada",
        permanent: true,
      },
      {
        source: "/cases/59a30cea-7320-454a-948b-9c1f705527d5",
        destination: "/services/semiconductor",
        permanent: true,
      },
      {
        source: "/en/cases/59a30cea-7320-454a-948b-9c1f705527d5",
        destination: "/en/services/semiconductor",
        permanent: true,
      },
      {
        source: "/cases/case-1",
        destination: "/services/scada",
        permanent: true,
      },
      {
        source: "/en/cases/case-1",
        destination: "/en/services/scada",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
