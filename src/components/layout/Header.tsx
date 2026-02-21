'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { t, tx } from '@/lib/translations';

export default function Header() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <header className={`${styles.header} glass-panel`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logoWrapper}>
                    <Image
                        src="/images/logo_v2.png"
                        alt="JunSemi"
                        width={150}
                        height={40}
                        style={{ objectFit: 'contain', height: 'auto' }}
                        priority
                    />
                </Link>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li><Link href="/expertise" className={styles.navLink}>{tx(t.nav.expertise, language)}</Link></li>
                        <li><Link href="/cases" className={styles.navLink}>{tx(t.nav.cases, language)}</Link></li>
                        <li><Link href="/admin" className={styles.navLink} style={{ color: '#888', fontSize: '0.8rem' }}>[Admin]</Link></li>
                        <li><Link href="/contact" className={`btn-primary ${styles.contactBtn}`}>{tx(t.nav.contact, language)}</Link></li>
                        <li>
                            <button
                                onClick={toggleLanguage}
                                className={styles.langToggle}
                                title={language === 'ko' ? 'Switch to English' : '한국어로 전환'}
                            >
                                <span className={language === 'ko' ? styles.langActive : styles.langInactive}>KO</span>
                                <span className={styles.langDivider}>|</span>
                                <span className={language === 'en' ? styles.langActive : styles.langInactive}>EN</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
