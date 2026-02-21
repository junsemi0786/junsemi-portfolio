'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { t, tx } from '@/lib/translations';

interface HomeStaticProps {
    ctaTitle: string;
    ctaDescription: string;
}

export default function HomePageContent({ ctaTitle, ctaDescription }: HomeStaticProps) {
    const { language } = useLanguage();

    return (
        <>
            {/* Trust Indicators */}
            <section className="section text-center" style={{ background: 'var(--color-bg)', position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <p className="text-secondary" style={{ marginBottom: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                        {tx(t.home.trustedBy, language)}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', opacity: 0.5, filter: 'grayscale(100%)', flexWrap: 'wrap' }}>
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
                            {ctaTitle}
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
                            {ctaDescription}
                        </p>
                        <a href="/contact" className="btn-primary">{tx(t.home.ctaButton, language)}</a>
                    </div>
                </div>
            </section>
        </>
    );
}
