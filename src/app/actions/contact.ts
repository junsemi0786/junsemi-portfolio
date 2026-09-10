"use server";

import { requireAdmin } from "@/lib/admin-session";

import { ContactInfo, updateContactInfo } from "@/lib/contact-db";
import { revalidatePath } from "next/cache";

export async function updateContactInfoAction(data: ContactInfo) {
  await requireAdmin();
  try {
    await updateContactInfo(data);
    revalidatePath("/contact");
    revalidatePath("/admin/contact");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (e: unknown) {
    console.error("Update contact info error:", e);
    return {
      error:
        (e instanceof Error ? e.message : "") || "저장 중 오류가 발생했습니다.",
    };
  }
}
