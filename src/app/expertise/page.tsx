import type { Metadata } from 'next';
import SolutionCard from '@/components/features/SolutionCard';
import styles from './page.module.css';
import { getExpertiseList } from '@/lib/expertise-db';

export const metadata: Metadata = {
    title: '기술 역량 | JunSemi',
    description: '반도체 WET Process, PLC, SCADA 등 JunSemi의 핵심 기술 역량을 소개합니다.',
};

export const dynamic = 'force-dynamic';

export default async function ExpertisePage() {
    const expertises = await getExpertiseList();

    const getIcon = (type: string) => {
        switch (type) {
            case 'semicon':
                return (
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '32px', height: '32px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12h1.5m-1.5 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                );
            case 'automation':
                return (
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '32px', height: '32px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                    </svg>
                );
            case 'scada':
                return (
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '32px', height: '32px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.068 0 2.077.504 2.749 1.35l.863 1.09c.37.47.942.731 1.543.708.6-.023 1.134-.336 1.453-.84l.679-1.06c.355-.554.267-1.3-.223-1.74a2.25 2.25 0 00-1.67-.67H9.75" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>기술 역량 (Expertise)</h1>
                <p className={styles.pageSubtitle}>
                    반도체 장비부터 제어 시스템까지,<br />
                    JunSemi만의 차별화된 기술력을 소개합니다.
                </p>
            </header>

            <div className={styles.grid}>
                {expertises.map((item) => (
                    <SolutionCard
                        key={item.id}
                        {...item}
                        title={item.title.replace('\\n', '\n')} // Handle newline escape
                        iconCode={getIcon(item.iconType)}
                    />
                ))}
            </div>
        </div>
    );
}
