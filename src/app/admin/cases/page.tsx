import Link from 'next/link';
import { getCases } from '@/lib/cases-db';
import Button from '@/components/ui/Button';
import styles from './AdminCases.module.css';

export const dynamic = 'force-dynamic';

export default async function AdminCasesPage() {
    const cases = await getCases();

    return (

        <main className={styles.main}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className="text-gradient">Case Management</h1>
                    <Button href="/admin/cases/new">
                        + Add New Case
                    </Button>
                </div>

                <div className={`glass-panel ${styles.tableContainer}`}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Project Name</th>
                                <th className={styles.th}>Client</th>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Last Update</th>
                                <th className={styles.thRight}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cases.map((c) => (
                                <tr key={c.id} className={styles.tr}>
                                    <td className={styles.tdProject}>
                                        <div className={styles.projectWrapper}>
                                            {c.thumbnailUrl && (
                                                <div className={styles.thumbnailWrapper}>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={c.thumbnailUrl} className={styles.thumbnail} alt="" />
                                                </div>
                                            )}
                                            {c.projectName}
                                        </div>
                                    </td>
                                    <td className={styles.tdClient}>{c.clientName}</td>
                                    <td className={styles.tdStatus}>
                                        <span className={`${styles.statusBadge} ${c.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
                                            {c.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className={styles.tdDate}>
                                        {new Date(c.updatedAt).toLocaleDateString()}
                                    </td>
                                    <td className={styles.tdActions}>
                                        <div className={styles.actionsWrapper}>
                                            <Link href={`/admin/cases/${c.id}`} className={styles.editLink}>
                                                Edit
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {cases.length === 0 && (
                                <tr className={styles.emptyRow}>
                                    <td colSpan={5}>
                                        No case studies found. Create your first one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
