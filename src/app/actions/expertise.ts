'use server';

import { createExpertise, deleteExpertise, updateExpertise } from '@/lib/expertise-db';
import { ExpertiseFormData } from '@/types/expertise';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createExpertiseAction(data: ExpertiseFormData) {
    try {
        await createExpertise(data);
    } catch (e: any) {
        return { error: e.message || '저장 중 오류가 발생했습니다.' };
    }
    revalidatePath('/expertise');
    revalidatePath('/admin/expertise');
    revalidatePath('/');
    redirect('/admin/expertise');
}

export async function updateExpertiseAction(id: string, data: Partial<ExpertiseFormData>) {
    try {
        await updateExpertise(id, data);
    } catch (e: any) {
        return { error: e.message || '저장 중 오류가 발생했습니다.' };
    }
    revalidatePath('/expertise');
    revalidatePath(`/expertise/${id}`);
    revalidatePath('/admin/expertise');
    revalidatePath('/');
    redirect('/admin/expertise');
}

export async function deleteExpertiseAction(id: string) {
    try {
        await deleteExpertise(id);
        revalidatePath('/expertise');
        revalidatePath(`/expertise/${id}`);
        revalidatePath('/admin/expertise');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('Delete expertise error:', e);
        return { error: e.message || '삭제 중 오류가 발생했습니다.' };
    }
}
