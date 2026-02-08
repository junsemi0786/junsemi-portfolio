import Hero from '@/components/home/Hero';
import { getMainPageData } from '@/lib/main-page-db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getMainPageData();

  return (
    <main>
      <Hero
        badge={data.hero.badge}
        titleLine1={data.hero.titleLine1}
        titleLine2={data.hero.titleLine2}
        description={data.hero.description}
        stats={data.stats}
      />

      {/* Trust Indicators / Stats Section - Placeholder for now but styled */}
      <section className="section text-center" style={{ background: 'var(--color-bg)', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <p className="text-secondary" style={{ marginBottom: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Trusted By Industry Leaders</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            opacity: 0.5,
            filter: 'grayscale(100%)',
            flexWrap: 'wrap'
          }}>
            {/* Logo Placeholders using text for now */}
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>SAMSUNG</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>LG Chemical</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>SK hynix</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>K-WATER</span>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="section text-center" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '60px', borderRadius: 'var(--border-radius-lg)', textAlign: 'center' }}>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
              {data.cta.title}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
              {data.cta.description}
            </p>
            <a href="/contact" className="btn-primary">프로젝트 문의하기</a>
          </div>
        </div>
      </section>
    </main>
  );
}
