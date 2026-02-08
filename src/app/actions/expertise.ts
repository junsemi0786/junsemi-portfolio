'use server';

import { createExpertise, deleteExpertise, updateExpertise } from '@/lib/expertise-db';
import { ExpertiseFormData } from '@/types/expertise';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createExpertiseAction(data: ExpertiseFormData) {
    await createExpertise(data);
    revalidatePath('/expertise');
    revalidatePath('/admin/expertise');
    redirect('/admin/expertise');
}

export async function updateExpertiseAction(id: string, data: Partial<ExpertiseFormData>) {
    await updateExpertise(id, data);
    revalidatePath('/expertise');
    revalidatePath('/admin/expertise');
    redirect('/admin/expertise');
}

export async function deleteExpertiseAction(id: string) {
    await deleteExpertise(id);
    revalidatePath('/expertise');
    revalidatePath('/admin/expertise');
    redirect('/admin/expertise');
}
