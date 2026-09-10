import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin-session";
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/admin/login") {
    let allowed = false;
    try {
      allowed = await isAdmin(
        request.cookies.get("admin_session")?.value || "",
      );
    } catch {
      allowed = false;
    }
    if (!allowed)
      return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
export const config = { matcher: ["/admin/:path*"] };
