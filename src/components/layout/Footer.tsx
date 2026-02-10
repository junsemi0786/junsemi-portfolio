import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

import { getExpertiseList } from '@/lib/expertise-db';

export default async function Footer() {
    const currentYear = new Date().getFullYear();
    const expertises = await getExpertiseList();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.topSection}>
                    <div className={styles.brand}>
                        <div className={styles.logoWrapper}>
                            <Image
                                src="/images/logo_v2.png"
                                alt="JunSemi"
                                width={120}
                                height={32}
                                style={{ objectFit: 'contain', height: 'auto' }}
                            />
                        </div>
                        <address className={styles.address}>
                            <p>경기도 부천시 장말로 282-14</p>
                            <p>Email: hello@junsemi.co.kr</p>
                            <p>Tel: 010-665-0786 | Fax: 0504-445-0786</p>
                        </address>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h3>기술 역량</h3>
                            <ul>
                                {expertises.map((item) => (
                                    <li key={item.id}>
                                        <Link href={`/expertise/${item.id}`}>{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.column}>
                            <h3>바로가기</h3>
                            <ul>
                                <li><Link href="/cases">주요 실적</Link></li>
                                <li><Link href="/contact">문의하기</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <div className={styles.copyrightInfo}>
                        <p>&copy; {currentYear} JunSemi. All rights reserved.</p>
                        <div className={styles.legal}>
                            <Link href="/privacy">개인정보처리방침</Link>
                            <Link href="/terms">이용약관</Link>
                        </div>
                    </div>
                    <div className={styles.visitorSection}>
                        <div className={styles.hitsBadge}>
                            <a href="https://visitorbadge.io/status?path=https%3A%2F%2Fjunsemi.co.kr" target="_blank" rel="noopener noreferrer">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fjunsemi.co.kr&label=VISITORS&labelColor=%232d3748&countColor=%234299e1&style=flat&labelStyle=upper"
                                    alt="Visitors Counter"
                                    style={{ height: '20px', display: 'block' }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
