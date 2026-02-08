import type { Metadata } from 'next';
import ContactForm from '@/components/home/ContactForm';
import styles from './page.module.css';
import { getContactInfo } from '@/lib/contact-db';

export const metadata: Metadata = {
    title: '문의 및 견적 | 엔지니어링 플랫폼',
    description: '부천/경기 지역 노후 설비 수명 연장 및 SCADA 구축 견적 문의. 긴급 기술 지원 요청.',
};

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
    const info = await getContactInfo();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>문의 및 지원</h1>
                <p className={styles.pageSubtitle}>
                    기술적인 고민이 있으신가요?<br />
                    지금 바로 전문가와 상의하세요.
                </p>
            </header>

            <div className={styles.contentWrapper}>
                <div className={styles.infoSection}>
                    <div className={styles.infoBlock}>
                        <h3 className={styles.infoTitle}>연락처</h3>
                        <ul className={styles.infoList}>
                            <li>
                                <span className={styles.label}>대표 전화</span>
                                <a href={`tel:${info.phone}`} className={styles.value}>{info.phone}</a>
                            </li>
                            <li>
                                <span className={styles.label}>이메일</span>
                                <a href={`mailto:${info.email}`} className={styles.value}>{info.email}</a>
                            </li>
                            <li>
                                <span className={styles.label}>팩스</span>
                                <span className={styles.value}>{info.fax}</span>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.infoBlock}>
                        <h3 className={styles.infoTitle}>찾아오시는 길</h3>
                        <p className={styles.address}>{info.address}</p>
                        {/* Map Placeholder */}
                        <div className={styles.mapPlaceholder}>
                            <div className={styles.mapMessage}>
                                <span>{info.mapMessage || "📍 위치 안내 (지도)"}</span>
                                <span style={{ fontSize: '0.8rem', color: '#718096', marginTop: '8px' }}>
                                    (실제 서비스 시 네이버 지도 API가 연동됩니다)
                                </span>
                            </div>
                        </div>
                        <div className={styles.transport}>
                            <span className={styles.transportItem}>{info.transport || "교통편 정보가 없습니다."}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
