"use server";

import { requireAdmin } from "@/lib/admin-session";

import {
  createExpertise,
  deleteExpertise,
  updateExpertise,
} from "@/lib/expertise-db";
import { ExpertiseFormData } from "@/types/expertise";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createExpertiseAction(data: ExpertiseFormData) {
  await requireAdmin();
  try {
    await createExpertise(data);
  } catch (e: unknown) {
    return {
      error:
        (e instanceof Error ? e.message : "") || "저장 중 오류가 발생했습니다.",
    };
  }
  revalidatePath("/expertise");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/expertise");
  revalidatePath("/");
  redirect("/admin/expertise");
}

export async function updateExpertiseAction(
  id: string,
  data: Partial<ExpertiseFormData>,
) {
  await requireAdmin();
  try {
    await updateExpertise(id, data);
  } catch (e: unknown) {
    return {
      error:
        (e instanceof Error ? e.message : "") || "저장 중 오류가 발생했습니다.",
    };
  }
  revalidatePath("/expertise");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/expertise/${id}`);
  revalidatePath("/admin/expertise");
  revalidatePath("/");
  redirect("/admin/expertise");
}

export async function deleteExpertiseAction(id: string) {
  await requireAdmin();
  try {
    await deleteExpertise(id);
    revalidatePath("/expertise");
    revalidatePath("/sitemap.xml");
    revalidatePath(`/expertise/${id}`);
    revalidatePath("/admin/expertise");
    revalidatePath("/");
    return { success: true };
  } catch (e: unknown) {
    console.error("Delete expertise error:", e);
    return {
      error:
        (e instanceof Error ? e.message : "") || "삭제 중 오류가 발생했습니다.",
    };
  }
}
