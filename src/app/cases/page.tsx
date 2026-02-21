import { getCases } from '@/lib/cases-db';
import CasesPageContent from '@/components/features/CasesPageContent';

export const metadata = {
    title: 'Cases | 주요 실적',
    description: '성공적인 프로젝트와 엔지니어링 솔루션 포트폴리오를 확인해보세요.',
};

export const dynamic = 'force-dynamic';

export default async function CasesPage() {
    const cases = await getCases();

    return <CasesPageContent cases={cases} />;
}
