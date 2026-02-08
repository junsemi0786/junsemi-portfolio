import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: '기술 지식 창고 | 엔지니어링 플랫폼',
    description: 'PLC, SCADA, 반도체 설비 유지보수에 관한 전문 엔지니어링 팁과 노하우를 공유합니다.',
};

export default function KnowledgePage() {
    const posts = [
        {
            id: 1,
            category: 'SCADA',
            title: 'CIMON SCADA 통신 오류 시 우선 확인해야 할 3가지는?',
            excerpt: '현장에서 가장 빈번하게 발생하는 통신 두절 현상, 케이블 단선부터 드라이버 설정까지 단계별 체크리스트를 공개합니다.',
            date: '2025.10.15'
        },
        {
            id: 2,
            category: 'Maintenance',
            title: '반도체 Wet Station 펌프 소음 증가 원인 분석',
            excerpt: '케미컬 펌프의 이상 소음은 고장의 전조 증상입니다. 베어링 마모와 임펠러 손상을 구분하는 방법을 알아봅니다.',
            date: '2025.09.28'
        },
        {
            id: 3,
            category: 'PLC',
            title: 'Mitsubishi PLC 배터리 교체 주기와 백업 요령',
            excerpt: '오래된 장비의 데이터 손실을 막기 위해 필수적인 배터리 관리법. 프로그램 백업 절차를 상세히 안내합니다.',
            date: '2025.08.10'
        },
        {
            id: 4,
            category: 'Automation',
            title: '인버터(VFD) 과열 알람 발생 시 조치 방법',
            excerpt: '냉각 팬 고장이나 부하 과다로 인한 과열 트립 시, 현장에서 즉시 조치할 수 있는 응급 대응 매뉴얼.',
            date: '2025.07.22'
        }
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>기술 지식 창고</h1>
                <p className={styles.pageSubtitle}>
                    현장 엔지니어들이 궁금해하는 실무 노하우.<br />
                    정확한 기술 정보로 답해드립니다.
                </p>
            </header>

            <div className={styles.postList}>
                {posts.map((post) => (
                    <article key={post.id} className={styles.post}>
                        <div className={styles.postMeta}>
                            <span className={styles.category}>{post.category}</span>
                            <span className={styles.date}>{post.date}</span>
                        </div>
                        <Link href={`/knowledge/${post.id}`} className={styles.postLink}>
                            <h2 className={styles.postTitle}>{post.title}</h2>
                        </Link>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        <div className={styles.readMore}>
                            <Link href={`/knowledge/${post.id}`}>자세히 보기 →</Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
