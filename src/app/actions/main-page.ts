'use server';

import { getMainPageData, updateMainPageData, MainPageData } from '@/lib/main-page-db';
import { revalidatePath } from 'next/cache';

export async function updateMainPageAction(data: MainPageData) {
    try {
        await updateMainPageData(data);
        revalidatePath('/');
        return { success: true };
    } catch (e: any) {
        console.error('Update main page error:', e);
        return { error: e.message || '저장 중 오류가 발생했습니다.' };
    }
}
