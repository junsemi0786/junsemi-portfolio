"use server";

import { requireAdmin } from "@/lib/admin-session";

import { updateMainPageData, MainPageData } from "@/lib/main-page-db";
import { revalidatePath } from "next/cache";

export async function updateMainPageAction(data: MainPageData) {
  await requireAdmin();
  try {
    await updateMainPageData(data);
    revalidatePath("/");
    return { success: true };
  } catch (e: unknown) {
    console.error("Update main page error:", e);
    return {
      error:
        (e instanceof Error ? e.message : "") || "저장 중 오류가 발생했습니다.",
    };
  }
}
