import { notFound } from 'next/navigation';
import { getCaseById } from '@/lib/cases-db';
import CaseForm from '@/components/features/CaseForm';
import { updateCaseAction } from '@/app/actions/cases';
import { deleteCaseAction } from '@/app/actions/cases';

export default async function EditCasePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const caseStudy = await getCaseById(params.id);

    if (!caseStudy) {
        notFound();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpdate = async (data: any) => {
        'use server';
        await updateCaseAction(params.id, data);
    };

    const handleDelete = async () => {
        'use server';
        await deleteCaseAction(params.id);
    };

    return (
        <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 className="text-gradient">Edit Case Study</h1>
                    {/* Delete Button - Using form for server action invoke */}
                    <form action={handleDelete}>
                        <button
                            type="submit"
                            style={{
                                background: 'rgba(255, 50, 50, 0.2)',
                                color: '#ff6b6b',
                                border: '1px solid rgba(255, 50, 50, 0.3)',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                            data-confirm="Are you sure you want to delete this project?"
                        >
                            Delete Project
                        </button>
                    </form>
                </div>

                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <CaseForm
                        initialData={caseStudy}
                        onSubmit={handleUpdate}
                        isEditing={true}
                    />
                </div>
            </div>
        </main>
    );
}
