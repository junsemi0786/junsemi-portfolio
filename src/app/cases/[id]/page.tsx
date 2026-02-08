// import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCaseById, getCases } from '@/lib/cases-db';
import Button from '@/components/ui/Button';
import styles from './CaseDetail.module.css';

// Generate static params for existing cases (optional but good for static export/performance)
export async function generateStaticParams() {
    const cases = await getCases();
    return cases.map((c) => ({
        id: c.id,
    }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const caseStudy = await getCaseById(params.id);
    if (!caseStudy) return { title: 'Case Not Found' };

    return {
        title: `${caseStudy.projectName} | Cases`,
        description: caseStudy.summary,
    };
}

export default async function CaseDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const caseStudy = await getCaseById(params.id);

    if (!caseStudy) {
        notFound();
    }

    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <div className={styles.hero}>
                {caseStudy.thumbnailUrl ? (
                    <Image
                        src={caseStudy.thumbnailUrl}
                        alt={caseStudy.projectName}
                        fill
                        className={styles.heroImage}
                        priority
                    />
                ) : (
                    <div className={styles.heroPlaceholder} />
                )}
                <div className={styles.heroContent}>
                    <span className={styles.clientBadge}>
                        {caseStudy.clientName}
                    </span>
                    <h1 className={styles.title}>{caseStudy.projectName}</h1>
                    <p className={styles.period}>{caseStudy.period}</p>
                </div>
            </div>

            <div className={`container ${styles.layout}`} style={{ padding: '4rem 0' }}>
                {/* Main Content */}
                <div className={styles.mainColumn}>

                    {/* Outcome Highlight */}
                    {caseStudy.outcome && (
                        <div className={styles.outcomeBox}>
                            <h3 className={styles.outcomeTitle}>Key Outcome</h3>
                            <p className={styles.outcomeText}>{caseStudy.outcome}</p>
                        </div>
                    )}

                    {/* Content Body */}
                    {/* Note: In a real app we'd use a Markdown renderer like 'react-markdown' */}
                    <div className={styles.prose}>
                        {caseStudy.description.split('\n').map((line, i) => {
                            if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
                            if (line.trim() === '') return <br key={i} />;
                            return <p key={i}>{line}</p>;
                        })}
                    </div>

                    <div className={styles.tagsSection}>
                        <h3>Technologies Used</h3>
                        <div className={styles.tagsWrapper}>
                            {caseStudy.tags.map(tag => (
                                <span key={tag} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Gallery Section */}
                {caseStudy.gallery && caseStudy.gallery.length > 0 && (
                    <div className={styles.gallerySection}>
                        <h3 className={styles.galleryTitle}>Project Gallery</h3>
                        <div className={styles.galleryGrid}>
                            {caseStudy.gallery.map((imgSrc, index) => (
                                <div key={index} className={styles.galleryItem}>
                                    <Image
                                        src={imgSrc}
                                        alt={`${caseStudy.projectName} gallery ${index + 1}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA Section */}
                <div className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>Interested in a similar solution?</h2>
                    <p className={styles.ctaText}>
                        We can help you build success stories like {caseStudy.clientName}.
                    </p>
                    <Button href="/contact" size="lg">
                        Inquire about this project
                    </Button>
                </div>

            </div>
        </main>
    );
}
