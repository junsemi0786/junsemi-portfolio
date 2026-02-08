import Link from 'next/link';
import Image from 'next/image';
import { CaseStudy } from '@/types/case-study';
import styles from './CaseCard.module.css';

interface CaseCardProps {
    caseStudy: CaseStudy;
}

export default function CaseCard({ caseStudy }: CaseCardProps) {
    return (
        <Link href={`/cases/${caseStudy.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                {caseStudy.thumbnailUrl ? (
                    <Image
                        src={caseStudy.thumbnailUrl}
                        alt={caseStudy.projectName}
                        fill
                        style={{ objectFit: 'cover' }}
                        className={styles.image}
                    />
                ) : (
                    <div className={styles.placeholder} />
                )}
                <div className={styles.overlay}>
                    <span className={styles.viewMore}>View Case Study</span>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.client}>{caseStudy.clientName}</span>
                    <span className={styles.period}>{caseStudy.period}</span>
                </div>
                <h3 className={styles.title}>{caseStudy.projectName}</h3>
                <p className={styles.summary}>{caseStudy.summary}</p>
                <div className={styles.tags}>
                    {caseStudy.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
