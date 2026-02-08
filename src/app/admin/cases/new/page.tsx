import CaseForm from '@/components/features/CaseForm';
import { createCaseAction } from '@/app/actions/cases';

export default function NewCasePage() {
    return (
        <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px' }}>
            <div className="container">
                <h1 className="text-gradient" style={{ marginBottom: '2rem', textAlign: 'center' }}>Create New Case Study</h1>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <CaseForm onSubmit={createCaseAction} />
                </div>
            </div>
        </main>
    );
}
