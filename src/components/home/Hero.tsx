import Link from 'next/link'; // Button 컴포넌트 대신 직접 Link/button 사용하되 스타일 클래스 활용
import styles from './Hero.module.css';

interface HeroProps {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    stats: {
        yearsExp: string;
        yearsLabel: string;
        successRate: string;
        successLabel: string;
        support: string;
        supportLabel: string;
    };
}

export default function Hero({ badge, titleLine1, titleLine2, description, stats }: HeroProps) {
    return (
        <section className={styles.hero}>
            {/* Background Image Overlay handled in CSS or strictly via CSS background-image for easier blend mode control */}
            <div className={styles.bgOverlay}></div>

            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <div className={styles.badge}>{badge}</div>
                    <h1 className={styles.title}>
                        <span className="text-gradient">{titleLine1}</span><br />
                        {titleLine2}
                    </h1>
                    <p className={styles.description}>
                        {description.split('\n').map((line, i) => (
                            <span key={i}>
                                {line}
                                {i < description.split('\n').length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                    <div className={styles.actions}>
                        <Link href="/contact" className="btn-primary">
                            견적 요청하기
                        </Link>
                        <Link href="/cases" className={styles.btnOutline}>
                            주요 실적 보기
                        </Link>
                    </div>

                    <div className={styles.stats}>
                        <div className={`${styles.statItem} glass-panel`}>
                            <span className={styles.statValue}>{stats.yearsExp}</span>
                            <span className={styles.statLabel}>{stats.yearsLabel}</span>
                        </div>
                        <div className={`${styles.statItem} glass-panel`}>
                            <span className={styles.statValue}>{stats.successRate}</span>
                            <span className={styles.statLabel}>{stats.successLabel}</span>
                        </div>
                        <div className={`${styles.statItem} glass-panel`}>
                            <span className={styles.statValue}>{stats.support}</span>
                            <span className={styles.statLabel}>{stats.supportLabel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
