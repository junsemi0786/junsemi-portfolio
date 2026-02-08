'use client';

import { useState } from 'react';
import { loginAction } from '@/app/actions/auth';
import Button from '@/components/ui/Button';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const success = await loginAction(password);
            if (!success) {
                setError('비밀번호가 올바르지 않습니다.');
            }
        } catch {
            setError('로그인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ padding: '3rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>Admin Login</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #444',
                                background: '#222',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
                    <Button type="submit" fullWidth disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </div>
        </main>
    );
}
