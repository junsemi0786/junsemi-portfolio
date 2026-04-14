'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminPassword } from '@/lib/admin-config-db';

const FALLBACK_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '0901'; // Default password for demo

export async function loginAction(password: string) {
    const dbPassword = await getAdminPassword();
    const validPassword = dbPassword || FALLBACK_ADMIN_PASSWORD;

    if (password === validPassword) {
        (await cookies()).set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        redirect('/admin');
    }
    return false;
}

export async function logoutAction() {
    (await cookies()).delete('admin_session');
    redirect('/admin/login');
}
