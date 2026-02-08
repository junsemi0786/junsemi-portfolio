import { notFound } from 'next/navigation';
import { getExpertiseById } from '@/lib/expertise-db';
import ExpertiseForm from '@/components/features/ExpertiseForm';
import { updateExpertiseAction, deleteExpertiseAction } from '@/app/actions/expertise';

export default async function EditExpertisePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const item = await getExpertiseById(params.id);

    if (!item) {
        notFound();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpdate = async (data: any) => {
        'use server';
        await updateExpertiseAction(params.id, data);
    };

    const handleDelete = async () => {
        'use server';
        await deleteExpertiseAction(params.id);
    };

    return (
        <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 className="text-gradient">기술 역량 수정</h1>
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
                            data-confirm="정말로 삭제하시겠습니까?"
                        >
                            삭제
                        </button>
                    </form>
                </div>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <ExpertiseForm
                        initialData={item}
                        onSubmit={handleUpdate}
                        isEditing={true}
                    />
                </div>
            </div>
        </main>
    );
}
