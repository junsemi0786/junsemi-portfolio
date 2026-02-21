'use client';

import ContactForm from '@/components/home/ContactForm';
import styles from '@/app/contact/page.module.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { t, tx } from '@/lib/translations';

interface ContactInfo {
    phone: string;
    email: string;
    fax: string;
    address: string;
    mapMessage?: string;
    transport?: string;
}

export default function ContactPageContent({ info }: { info: ContactInfo }) {
    const { language } = useLanguage();
    const subtitle = tx(t.contact.pageSubtitle, language).split('\n');

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>{tx(t.contact.pageTitle, language)}</h1>
                <p className={styles.pageSubtitle}>
                    {subtitle[0]}<br />
                    {subtitle[1]}
                </p>
            </header>

            <div className={styles.contentWrapper}>
                <div className={styles.infoSection}>
                    <div className={styles.infoBlock}>
                        <h3 className={styles.infoTitle}>{tx(t.contact.contactInfo, language)}</h3>
                        <ul className={styles.infoList}>
                            <li>
                                <span className={styles.label}>{tx(t.contact.phone, language)}</span>
                                <a href={`tel:${info.phone}`} className={styles.value}>{info.phone}</a>
                            </li>
                            <li>
                                <span className={styles.label}>{tx(t.contact.email, language)}</span>
                                <a href={`mailto:${info.email}`} className={styles.value}>{info.email}</a>
                            </li>
                            <li>
                                <span className={styles.label}>{tx(t.contact.fax, language)}</span>
                                <span className={styles.value}>{info.fax}</span>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.infoBlock}>
                        <h3 className={styles.infoTitle}>{tx(t.contact.directions, language)}</h3>
                        <p className={styles.address}>{info.address}</p>
                        <div className={styles.mapPlaceholder}>
                            <div className={styles.mapMessage}>
                                <span>{info.mapMessage || tx(t.contact.mapMessage, language)}</span>
                                <span style={{ fontSize: '0.8rem', color: '#718096', marginTop: '8px' }}>
                                    {tx(t.contact.mapNote, language)}
                                </span>
                            </div>
                        </div>
                        <div className={styles.transport}>
                            <span className={styles.transportItem}>{info.transport || (language === 'ko' ? '교통편 정보가 없습니다.' : 'No transport info available.')}</span>
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
