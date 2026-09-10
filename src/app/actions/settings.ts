"use server";

import { requireAdmin } from "@/lib/admin-session";

import { updateAdminPassword, getAdminPassword } from "@/lib/admin-config-db";
import { revalidatePath } from "next/cache";

export async function updateAdminPasswordAction(
  currentPassword: string,
  newPassword: string,
) {
  await requireAdmin();
  try {
    if (!newPassword || newPassword.length < 12) {
      return { error: "새 비밀번호는 12자 이상으로 입력해주세요." };
    }

    // 현재 비밀번호 확인
    const dbPassword = await getAdminPassword();
    const validPassword = dbPassword || process.env.ADMIN_PASSWORD || "";

    if (currentPassword !== validPassword) {
      return { error: "현재 비밀번호가 일치하지 않습니다." };
    }

    await updateAdminPassword(newPassword);

    revalidatePath("/admin/settings");
    revalidatePath("/"); // 인증 상태 전파를 위해

    return { success: true };
  } catch (e: unknown) {
    console.error("Update admin password error:", e);
    return {
      error:
        (e instanceof Error ? e.message : "") || "저장 중 오류가 발생했습니다.",
    };
  }
}
