'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { t, tx } from '@/lib/translations';
import styles from '@/app/expertise/page.module.css';

export default function ExpertisePageContent({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    const subtitle = tx(t.expertise.pageSubtitle, language).split('\n');

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>{tx(t.expertise.pageTitle, language)}</h1>
                <p className={styles.pageSubtitle}>
                    {subtitle[0]}<br />
                    {subtitle[1]}
                </p>
            </header>
            <div className={styles.grid}>
                {children}
            </div>
        </div>
    );
}
