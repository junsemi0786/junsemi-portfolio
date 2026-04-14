import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

import { getExpertiseList } from '@/lib/expertise-db';
import { getContactInfo } from '@/lib/contact-db';
import { getRedisMemoryUsage } from '@/lib/redis-db';
import { cookies } from 'next/headers';

export default async function Footer() {
    const currentYear = new Date().getFullYear();
    const expertises = await getExpertiseList();
    const contactInfo = await getContactInfo();
    
    // 관리자 여부 및 DB 사용량 확인 (에러 방지 처리)
    let isAdmin = false;
    let redisUsage = '...';
    
    try {
        const cookieStore = await cookies();
        isAdmin = cookieStore.get('admin_session')?.value === 'true';
        
        if (isAdmin) {
            redisUsage = await getRedisMemoryUsage();
        }
    } catch (e) {
        console.error('Footer auth check error:', e);
    }

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
                            <p>{contactInfo.address || '경기도 부천시 장말로 282-14'}</p>
                            <p>Email: {contactInfo.email || 'hello@junsemi.co.kr'}</p>
                            <p>Tel: {contactInfo.phone || '010-6659-0786'} | Fax: {contactInfo.fax || '0504-445-0786'}</p>
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
                        <div className={styles.visitorBadges}>
                            {/* DB 사용량 (관리자 전용) */}
                            {isAdmin && (
                                <div className={styles.dbBadge} title="Vercel KV (Redis) Usage">
                                    <span className={styles.dbBadgeLabel}>DB</span>
                                    <span className={styles.dbBadgeValue}>{redisUsage} / 30MB</span>
                                </div>
                            )}

                            {/* 당일 방문자 */}
                            <div className={styles.badgeWrapper} style={{ marginRight: '8px' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fjunsemi.co.kr-today-${currentYear}-${new Date().getMonth() + 1}-${new Date().getDate()}&label=TODAY&labelColor=003366&countColor=003366&style=flat-square`}
                                    alt="Today Visitors"
                                    style={{ height: '22px', display: 'block' }}
                                />
                            </div>
                            {/* 누적 방문자 */}
                            <div className={styles.badgeWrapper}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fjunsemi.co.kr&label=TOTAL&labelColor=003366&countColor=003366&style=flat-square"
                                    alt="Total Visitors"
                                    style={{ height: '22px', display: 'block' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
