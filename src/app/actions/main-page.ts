'use server';

import { getMainPageData, updateMainPageData, MainPageData } from '@/lib/main-page-db';
import { revalidatePath } from 'next/cache';

export async function updateMainPageAction(data: MainPageData) {
    await updateMainPageData(data);
    revalidatePath('/');
}
