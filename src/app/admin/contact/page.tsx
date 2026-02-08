import { getContactInfo } from '@/lib/contact-db';
import { updateContactInfoAction } from '@/app/actions/contact';
import AdminContactForm from '@/components/features/AdminContactForm';

export default async function AdminContactPage() {
    const contactInfo = await getContactInfo();

    return (
        <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px' }}>
            <div className="container">
                <h1 className="text-gradient" style={{ marginBottom: '2rem', textAlign: 'center' }}>문의처 정보 관리</h1>
                <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
                    <AdminContactForm initialData={contactInfo} onSubmit={updateContactInfoAction} />
                </div>
            </div>
        </main>
    );
}
