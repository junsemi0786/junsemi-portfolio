import Link from 'next/link';
import { getExpertiseList } from '@/lib/expertise-db';
import Button from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function AdminExpertisePage() {
    const expertises = await getExpertiseList();

    return (
        <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 className="text-gradient">기술 역량 관리 (Expertise)</h1>
                    <Button href="/admin/expertise/new">
                        + 새 기술 역량 등록
                    </Button>
                </div>

                <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={{ padding: '1.5rem' }}>제목 (Title)</th>
                                <th style={{ padding: '1.5rem' }}>구분 (Subtitle)</th>
                                <th style={{ padding: '1.5rem' }}>순서</th>
                                <th style={{ padding: '1.5rem', textAlign: 'right' }}>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expertises.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1.5rem', fontWeight: 600 }}>
                                        {item.title}
                                    </td>
                                    <td style={{ padding: '1.5rem', color: '#aaa' }}>{item.subtitle}</td>
                                    <td style={{ padding: '1.5rem' }}>{item.order}</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <Link href={`/admin/expertise/${item.id}`} style={{
                                                padding: '8px 16px',
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: '4px',
                                                color: 'white',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem'
                                            }}>
                                                수정
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {expertises.length === 0 && (
                                <tr>
                                    <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>
                                        등록된 기술 역량이 없습니다.
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
