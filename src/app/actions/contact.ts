'use server';

import { ContactInfo, updateContactInfo } from '@/lib/contact-db';
import { revalidatePath } from 'next/cache';

export async function updateContactInfoAction(data: ContactInfo) {
    await updateContactInfo(data);
    revalidatePath('/contact');
    revalidatePath('/admin/contact');
}
