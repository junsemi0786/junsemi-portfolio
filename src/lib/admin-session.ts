import { cookies } from "next/headers";
import { getAdminPassword } from "./admin-config-db";
import { verifySession } from "./session-token";
export async function adminPassword() {
  return (await getAdminPassword()) || process.env.ADMIN_PASSWORD || "";
}
export function signingSecret(password: string) {
  return password
    ? `${process.env.ADMIN_SESSION_SECRET || ""}:${password}`
    : "";
}
export async function isAdmin(token?: string) {
  return verifySession(
    token ?? (await cookies()).get("admin_session")?.value,
    signingSecret(await adminPassword()),
  );
}
export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("관리자 로그인이 필요합니다.");
}
