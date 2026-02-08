import Image from 'next/image';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
    id: string;
    client: string;
    location: string;
    title: string;
    date: string;
    problem: string;
    solution: string;
    result: string;
    techs: string[];
    imageSrc?: string;
}

export default function ProjectCard({
    id,
    client,
    location,
    title,
    date,
    problem,
    solution,
    result,
    techs,
    imageSrc
}: ProjectCardProps) {
    return (
        <div id={id} className={`${styles.card} glass-panel`}>
            {imageSrc && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className={styles.image}
                    />
                    <div className={styles.overlay}>
                        <div className={styles.overlayContent}>
                            <span className={styles.location}>{location}</span>
                            <span className={styles.date}>{date}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.client}>{client}</p>
                </div>

                <div className={styles.comparison}>
                    <div className={`${styles.panel} ${styles.before}`}>
                        <h4 className={styles.panelTitle}>PROBLEM</h4>
                        <p className={styles.panelText}>{problem}</p>
                    </div>

                    <div className={styles.arrow}>
                        <svg className={styles.arrowIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>

                    <div className={`${styles.panel} ${styles.after}`}>
                        <h4 className={styles.panelTitle}>SOLUTION & RESULT</h4>
                        <p className={styles.panelText}>{solution}</p>
                        <div className={styles.resultBox}>
                            <span className={styles.resultLabel}>성과:</span> {result}
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.techs}>
                        {techs.map((tech, index) => (
                            <span key={index} className={styles.techTag}>#{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
