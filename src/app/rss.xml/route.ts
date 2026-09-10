import { getCases } from "@/lib/cases-db";
import { SITE_URL, BRAND } from "@/lib/site";
export const dynamic = "force-dynamic";
const xml = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export async function GET() {
  const cases = (await getCases()).filter((c) => c.status === "published");
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(BRAND)} 프로젝트</title><link>${SITE_URL}/cases</link><description>반도체 장비·PLC·SCADA 프로젝트</description><language>ko</language>${cases.map((c) => `<item><title>${xml(c.projectName)}</title><link>${SITE_URL}/cases/${encodeURIComponent(c.id)}</link><guid>${SITE_URL}/cases/${encodeURIComponent(c.id)}</guid><description>${xml(c.summary + "\n\n" + c.description.replace("오류를 30% 비용 절감", "CIMON SCADA로 중앙 모니터링 시스템을 변경했습니다."))}</description><pubDate>${new Date(c.createdAt).toUTCString()}</pubDate></item>`).join("")}</channel></rss>`;
  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
