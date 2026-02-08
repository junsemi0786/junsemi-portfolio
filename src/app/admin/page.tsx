// import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AdminDashboard() {
    return (
        <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px' }}>
            <div className="container">
                <h1 className="text-gradient" style={{ marginBottom: '3rem', textAlign: 'center' }}>Admin Dashboard</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Cases Management Card */}
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '1rem' }}>주요 실적 관리 (Cases)</h2>
                        <p style={{ marginBottom: '2rem', color: '#888' }}>
                            프로젝트 성공 사례를 등록하고 수정합니다.
                        </p>
                        <Button href="/admin/cases" fullWidth>
                            실적 관리 바로가기
                        </Button>
                    </div>

                    {/* Expertise Management Card */}
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '1rem' }}>기술 역량 관리 (Expertise)</h2>
                        <p style={{ marginBottom: '2rem', color: '#888' }}>
                            보유 기술 및 솔루션 정보를 관리합니다.
                        </p>
                        <Button href="/admin/expertise" fullWidth>
                            역량 관리 바로가기
                        </Button>
                    </div>

                    {/* Contact Info Management Card */}
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '1rem' }}>문의처 정보 (Contact)</h2>
                        <p style={{ marginBottom: '2rem', color: '#888' }}>
                            전화번호, 이메일, 주소를 관리합니다.
                        </p>
                        <Button href="/admin/contact" fullWidth>
                            정보 수정 바로가기
                        </Button>
                    </div>

                    {/* Main Page Management Card */}
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '1rem' }}>메인 페이지 관리</h2>
                        <p style={{ marginBottom: '2rem', color: '#888' }}>
                            메인 화면의 문구와 텍스트를 수정합니다.
                        </p>
                        <Button href="/admin/main" fullWidth>
                            메인 관리 바로가기
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
