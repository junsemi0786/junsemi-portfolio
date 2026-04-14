'use server';

import { ContactInfo, updateContactInfo } from '@/lib/contact-db';
import { revalidatePath } from 'next/cache';

export async function updateContactInfoAction(data: ContactInfo) {
    try {
        await updateContactInfo(data);
        revalidatePath('/contact');
        revalidatePath('/admin/contact');
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('Update contact info error:', e);
        return { error: e.message || '저장 중 오류가 발생했습니다.' };
    }
}
