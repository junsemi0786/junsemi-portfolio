'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface ContactInfo {
    phone: string;
    email: string;
    fax: string;
    address: string;
    transport?: string;
    mapMessage?: string;
}

interface AdminContactFormProps {
    initialData: ContactInfo;
    onSubmit: (data: ContactInfo) => Promise<any>;
}

export default function AdminContactForm({ initialData, onSubmit }: AdminContactFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ContactInfo>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const toastId = toast.loading('저장 중...');

        try {
            const res = await onSubmit(formData);
            if (res && res.error) {
                toast.error(res.error, { id: toastId });
                return;
            }
            toast.success('정보가 수정되었습니다.', { id: toastId });
        } catch (error) {
            if (error instanceof Error && (error.message === 'NEXT_REDIRECT' || error.message.includes('redirect'))) {
                toast.dismiss(toastId);
                throw error;
            } else if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string' && ((error as any).message === 'NEXT_REDIRECT' || (error as any).message.includes('redirect'))) {
                toast.dismiss(toastId);
                throw error;
            }
            console.error(error);
            toast.error('저장에 실패했습니다.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>대표 전화</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>이메일</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>팩스</label>
                <input
                    type="text"
                    name="fax"
                    value={formData.fax}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>주소</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>교통편 안내 (예: 7호선 부천시청역...)</label>
                <input
                    type="text"
                    name="transport"
                    value={formData.transport || ''}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>지도 대체 문구 (예: 위치 안내)</label>
                <input
                    type="text"
                    name="mapMessage"
                    value={formData.mapMessage || ''}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>

            <Button type="submit" disabled={loading} fullWidth>
                {loading ? '저장 중...' : '정보 저장'}
            </Button>
        </form>
    );
}
