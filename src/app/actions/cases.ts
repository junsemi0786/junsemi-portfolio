'use server';

import { createCase, deleteCase, updateCase, reorderCases } from '@/lib/cases-db';
import { CaseStudyFormData } from '@/types/case-study';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCaseAction(data: CaseStudyFormData) {
    await createCase(data);
    revalidatePath('/cases');
    revalidatePath('/admin/cases');
    redirect('/admin/cases');
}

export async function updateCaseAction(id: string, data: Partial<CaseStudyFormData>) {
    await updateCase(id, data);
    revalidatePath('/cases');
    revalidatePath(`/cases/${id}`);
    revalidatePath('/admin/cases');
    redirect('/admin/cases');
}

export async function deleteCaseAction(id: string) {
    await deleteCase(id);
    revalidatePath('/cases');
    revalidatePath('/admin/cases');
    redirect('/admin/cases');
}

export async function reorderCasesAction(orderedIds: string[]) {
    await reorderCases(orderedIds);
    revalidatePath('/cases');
    revalidatePath('/admin/cases');
}
