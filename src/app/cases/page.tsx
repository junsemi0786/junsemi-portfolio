import { getCases } from '@/lib/cases-db';
import CaseCard from '@/components/features/CaseCard';

export const metadata = {
    title: 'Cases | 주요 실적',
    description: '성공적인 프로젝트와 엔지니어링 솔루션 포트폴리오를 확인해보세요.',
};

export default async function CasesPage() {
    const cases = await getCases();
    const publishedCases = cases.filter(c => c.status === 'published');

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <section className="section">
                <div className="container">
                    <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            주요 실적
                        </h1>
                        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            복잡한 문제를 우아한 엔지니어링 솔루션으로 해결합니다.
                            변화를 만들어낸 주요 프로젝트들을 소개합니다.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '2rem'
                    }}>
                        {publishedCases.map((caseStudy) => (
                            <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
                        ))}

                        {publishedCases.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                                <p>아직 등록된 실적이 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
