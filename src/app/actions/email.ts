'use server';

import { sendInquiryEmail, EmailData } from '@/lib/email';

export async function submitInquiry(formData: FormData) {
    const rawData: EmailData = {
        company: formData.get('company') as string,
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        type: formData.get('type') as string,
        message: formData.get('message') as string,
    };

    // Validation (basic)
    if (!rawData.company || !rawData.name || !rawData.phone || !rawData.message) {
        return { success: false, message: '필수 항목을 모두 입력해주세요.' };
    }

    try {
        const result = await sendInquiryEmail(rawData);
        if (result.success) {
            return { success: true, message: '접수가 완료되었습니다.' };
        } else {
            return { success: false, message: '메일 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' };
        }
    } catch (error) {
        console.error('Action Error:', error);
        return { success: false, message: '서버 오류가 발생했습니다.' };
    }
}
