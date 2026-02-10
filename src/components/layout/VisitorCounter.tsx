'use client';

import { useEffect, useState } from 'react';
import styles from './VisitorCounter.module.css';

interface Stats {
    total: number;
    today: number;
}

export default function VisitorCounter() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/stats', { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to load visitor stats:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.skeleton}></div>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className={styles.container}>
            <div className={styles.statItem}>
                <span className={styles.label}>오늘</span>
                <span className={styles.value}>{stats.today.toLocaleString()}</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statItem}>
                <span className={styles.label}>전체</span>
                <span className={styles.value}>{stats.total.toLocaleString()}</span>
            </div>
        </div>
    );
}
