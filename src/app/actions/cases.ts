'use server';

import { createCase, deleteCase, updateCase, reorderCases } from '@/lib/cases-db';
import { CaseStudyFormData } from '@/types/case-study';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCaseAction(data: CaseStudyFormData) {
    try {
        await createCase(data);
    } catch (e: any) {
        return { error: e.message || '저장 중 오류가 발생했습니다.' };
    }
    revalidatePath('/cases');
    revalidatePath('/admin/cases');
    redirect('/admin/cases');
}

export async function updateCaseAction(id: string, data: Partial<CaseStudyFormData>) {
    try {
        await updateCase(id, data);
    } catch (e: any) {
        return { error: e.message || '저장 중 오류가 발생했습니다.' };
    }
    revalidatePath('/cases');
    revalidatePath(`/cases/${id}`);
    revalidatePath('/admin/cases');
    redirect('/admin/cases');
}

export async function deleteCaseAction(id: string) {
    try {
        await deleteCase(id);
    } catch (e: any) {
        return { error: e.message || '저장 중 오류가 발생했습니다.' };
    }
    revalidatePath('/cases');
    revalidatePath('/admin/cases');
    redirect('/admin/cases');
}

export async function reorderCasesAction(orderedIds: string[]) {
    try {
        await reorderCases(orderedIds);
    } catch (e: any) {
        return { error: e.message || '저장 중 오류가 발생했습니다.' };
    }
    revalidatePath('/cases');
    revalidatePath('/admin/cases');
    return { success: true };
}
