import ExpertiseForm from '@/components/features/ExpertiseForm';
import { createExpertiseAction } from '@/app/actions/expertise';

export default function NewExpertisePage() {
    return (
        <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px' }}>
            <div className="container">
                <h1 className="text-gradient" style={{ marginBottom: '2rem', textAlign: 'center' }}>새 기술 역량 등록</h1>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <ExpertiseForm onSubmit={createExpertiseAction} />
                </div>
            </div>
        </main>
    );
}
