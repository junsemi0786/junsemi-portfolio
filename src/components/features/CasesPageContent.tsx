'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { t, tx } from '@/lib/translations';
import { CaseStudy } from '@/types/case-study';
import CaseCard from './CaseCard';

export default function CasesPageContent({ cases }: { cases: CaseStudy[] }) {
    const { language } = useLanguage();
    const publishedCases = cases.filter(c => c.status === 'published');
    const subtitle = tx(t.cases.pageSubtitle, language).split('\n');

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <section className="section">
                <div className="container">
                    <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            {tx(t.cases.pageTitle, language)}
                        </h1>
                        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            {subtitle[0]}<br />
                            {subtitle[1]}
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                        {publishedCases.map((caseStudy) => (
                            <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
                        ))}

                        {publishedCases.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                                <p>{tx(t.cases.empty, language)}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
