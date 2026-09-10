"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminPassword, signingSecret } from "@/lib/admin-session";
import { issueSession, passwordMatches } from "@/lib/session-token";
export async function loginAction(password: string) {
  const expected = await adminPassword();
  if (
    typeof password !== "string" ||
    password.length > 1024 ||
    !passwordMatches(password, expected)
  )
    return false;
  (await cookies()).set(
    "admin_session",
    issueSession(signingSecret(expected)),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    },
  );
  return true;
}
export async function logoutAction() {
  (await cookies()).delete("admin_session");
  redirect("/admin/login");
}
