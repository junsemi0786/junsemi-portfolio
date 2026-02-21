import type { Metadata } from 'next';
import ContactPageContent from '@/components/features/ContactPageContent';
import { getContactInfo } from '@/lib/contact-db';

export const metadata: Metadata = {
    title: '문의 및 견적 | 엔지니어링 플랫폼',
    description: '부천/경기 지역 노후 설비 수명 연장 및 SCADA 구축 견적 문의. 긴급 기술 지원 요청.',
};

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
    const info = await getContactInfo();

    return <ContactPageContent info={info} />;
}
