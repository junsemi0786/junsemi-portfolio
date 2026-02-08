import Image from 'next/image';
import Link from 'next/link';
import styles from './SolutionCard.module.css';

interface SolutionCardProps {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    keywords: string[];
    features: string[];
    iconCode?: React.ReactNode;
    imageSrc?: string;
}

export default function SolutionCard({
    id,
    title,
    subtitle,
    description,
    keywords,
    features,
    iconCode,
    imageSrc
}: SolutionCardProps) {
    return (
        <Link href={`/expertise/${id}`} className={`${styles.card} glass-panel`} style={{ display: 'block', textDecoration: 'none' }}>
            {imageSrc && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className={styles.image}
                    />
                    <div className={styles.imageOverlay}></div>
                    <div className={styles.iconBadge}>
                        {iconCode}
                    </div>
                </div>
            )}

            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.subtitle}>{subtitle}</span>
                    <h2 className={styles.title}>{title}</h2>
                </div>

                <div className={styles.body}>
                    <p className={styles.description}>{description}</p>

                    <div className={styles.keywords}>
                        {keywords.map((keyword, index) => (
                            <span key={index} className={styles.keyword}>#{keyword}</span>
                        ))}
                    </div>

                    <div className={styles.features}>
                        <h4 className={styles.featureTitle}>Key Features</h4>
                        <ul className={styles.featureList}>
                            {features.map((feature, index) => (
                                <li key={index} className={styles.featureItem}>
                                    <span className={styles.check}>✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Link>
    );
}
