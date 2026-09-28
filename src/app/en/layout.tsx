import type { Metadata } from "next";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${BRAND} | Industrial Engineering Korea`, template: `%s | ${BRAND}` },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>;
}
