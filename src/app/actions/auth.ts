'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '0901'; // Default password for demo

export async function loginAction(password: string) {
    if (password === ADMIN_PASSWORD) {
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
