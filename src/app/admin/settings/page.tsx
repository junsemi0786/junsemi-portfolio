import { updateAdminPasswordAction } from '@/app/actions/settings';
import AdminSettingsForm from '@/components/features/AdminSettingsForm';

export default function AdminSettingsPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
        'use server';
        return await updateAdminPasswordAction(currentPassword, newPassword);
    };

    return (
        <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px' }}>
            <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>관리자 설정</h1>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#ccc' }}>비밀번호 변경</h2>
                    <p style={{ color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>
                        로그인에 사용할 새로운 비밀번호를 입력하세요. 
                        입력하지 않으면 기본 환경변수(ADMIN_PASSWORD)가 적용됩니다.
                    </p>
                    <AdminSettingsForm onSubmit={handleUpdatePassword} />
                </div>
            </div>
        </main>
    );
}
