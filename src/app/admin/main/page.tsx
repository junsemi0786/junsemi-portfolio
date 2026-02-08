import { getMainPageData } from '@/lib/main-page-db';
import { updateMainPageAction } from '@/app/actions/main-page';
import AdminMainPageForm from '@/components/features/AdminMainPageForm';
import Button from '@/components/ui/Button';

export default async function AdminMainPage() {
    const mainPageData = await getMainPageData();

    return (
        <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
                    <Button href="/admin" variant="outline" size="sm">
                        ← Back to Dashboard
                    </Button>
                    <h1 className="text-gradient" style={{ margin: 0 }}>메인 페이지 관리</h1>
                </div>

                <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{ marginBottom: '2rem', color: '#888', textAlign: 'center' }}>
                        메인 페이지의 텍스트 문구를 실시간으로 수정할 수 있습니다.
                    </p>
                    <AdminMainPageForm initialData={mainPageData} onSubmit={updateMainPageAction} />
                </div>
            </div>
        </main>
    );
}
