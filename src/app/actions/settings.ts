'use server';

import { updateAdminPassword } from '@/lib/admin-config-db';
import { revalidatePath } from 'next/cache';

export async function updateAdminPasswordAction(newPassword: string) {
    try {
        if (!newPassword || newPassword.trim() === '') {
            return { error: '비밀번호를 입력해주세요.' };
        }
        await updateAdminPassword(newPassword);
        revalidatePath('/admin/settings');
        return { success: true };
    } catch (e: any) {
        console.error('Update admin password error:', e);
        return { error: e.message || '저장 중 오류가 발생했습니다.' };
    }
}
