import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getExpertiseById, getExpertiseList } from '@/lib/expertise-db';
import styles from './ExpertiseDetail.module.css';

// Generate static params for existing items
export async function generateStaticParams() {
    const list = await getExpertiseList();
    return list.map((item) => ({
        id: item.id,
    }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const item = await getExpertiseById(params.id);
    if (!item) return { title: 'Expertise Not Found' };

    return {
        title: `${item.title} | Technical Expertise`,
        description: item.description,
    };
}

export default async function ExpertiseDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const item = await getExpertiseById(params.id);

    if (!item) {
        notFound();
    }

    return (
        <main className={styles.container}>
            <Link href="/expertise" className={styles.backLink}>
                ← Back to Expertise
            </Link>

            <div className={styles.contentWrapper}>
                <div className={styles.imageSection}>
                    <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className={styles.image}
                        priority
                    />
                </div>

                <div className={styles.textSection}>
                    <span className={styles.subtitle}>{item.subtitle}</span>
                    <h1 className={styles.title}>{item.title}</h1>
                    <p className={styles.description}>{item.description}</p>

                    <h3 className={styles.sectionTitle}>Key Features</h3>
                    <ul className={styles.featuresList}>
                        {item.features.map((feature, index) => (
                            <li key={index} className={styles.featureItem}>
                                <span className={styles.checkIcon}>✓</span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <h3 className={styles.sectionTitle}>Related Keywords</h3>
                    <div className={styles.keywords}>
                        {item.keywords.map((keyword, index) => (
                            <span key={index} className={styles.keyword}>
                                #{keyword}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
