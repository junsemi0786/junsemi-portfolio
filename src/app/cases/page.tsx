import { getCases } from '@/lib/cases-db';
import CaseCard from '@/components/features/CaseCard';

export const metadata = {
    title: 'Cases | Major Achievements',
    description: 'Explore our portfolio of successful projects and engineering solutions.',
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
                            Our Works
                        </h1>
                        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            Turning complex problems into elegant engineering solutions.
                            Here are some of our key projects that made a difference.
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
                                <p>No published cases yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
