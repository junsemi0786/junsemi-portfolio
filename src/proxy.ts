import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin-session";
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    "x-site-locale",
    pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko",
  );
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
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
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (pathname.startsWith("/admin"))
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|favicon.ico|icon.svg).*)"],
};
