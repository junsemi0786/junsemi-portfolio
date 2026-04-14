'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface AdminSettingsFormProps {
    onSubmit: (password: string) => Promise<any>;
}

export default function AdminSettingsForm({ onSubmit }: AdminSettingsFormProps) {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const toastId = toast.loading('저장 중...');

        try {
            const res = await onSubmit(password);
            if (res && res.error) {
                toast.error(res.error, { id: toastId });
                return;
            }
            toast.success('비밀번호가 성공적으로 변경되었습니다.', { id: toastId });
            setPassword(''); // 폼 비우기
        } catch (error) {
            toast.error('변경 중 오류가 발생했습니다.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>새 비밀번호</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="새로운 비밀번호 입력"
                    style={{ 
                        width: '100%', padding: '10px', borderRadius: '4px', 
                        border: '1px solid #444', background: '#222', color: 'white' 
                    }}
                />
            </div>

            <Button type="submit" disabled={loading} fullWidth>
                {loading ? '저장 중...' : '비밀번호 변경'}
            </Button>
        </form>
    );
}
