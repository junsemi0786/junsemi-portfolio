"use server";

import { requireAdmin } from "@/lib/admin-session";

import {
  createCase,
  deleteCase,
  updateCase,
  reorderCases,
} from "@/lib/cases-db";
import { CaseStudyFormData } from "@/types/case-study";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCaseAction(data: CaseStudyFormData) {
  await requireAdmin();
  try {
    await createCase(data);
  } catch (e: unknown) {
    return {
      error:
        (e instanceof Error ? e.message : "") || "저장 중 오류가 발생했습니다.",
    };
  }
  revalidatePath("/cases");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
  revalidatePath("/admin/cases");
  redirect("/admin/cases");
}

export async function updateCaseAction(
  id: string,
  data: Partial<CaseStudyFormData>,
) {
  await requireAdmin();
  try {
    await updateCase(id, data);
  } catch (e: unknown) {
    return {
      error:
        (e instanceof Error ? e.message : "") || "저장 중 오류가 발생했습니다.",
    };
  }
  revalidatePath("/cases");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
  revalidatePath(`/cases/${id}`);
  revalidatePath("/admin/cases");
  redirect("/admin/cases");
}

export async function deleteCaseAction(id: string) {
  await requireAdmin();
  try {
    await deleteCase(id);
  } catch (e: unknown) {
    return {
      error:
        (e instanceof Error ? e.message : "") || "저장 중 오류가 발생했습니다.",
    };
  }
  revalidatePath("/cases");
  revalidatePath(`/cases/${id}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
  revalidatePath("/admin/cases");
  redirect("/admin/cases");
}

export async function reorderCasesAction(orderedIds: string[]) {
  await requireAdmin();
  try {
    await reorderCases(orderedIds);
  } catch (e: unknown) {
    return {
      error:
        (e instanceof Error ? e.message : "") || "저장 중 오류가 발생했습니다.",
    };
  }
  revalidatePath("/cases");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
  revalidatePath("/admin/cases");
  return { success: true };
}
