'use client';

import { useState } from 'react';
import { MainPageData } from '@/lib/main-page-db';
import Button from '@/components/ui/Button';

interface AdminMainPageFormProps {
    initialData: MainPageData;
    onSubmit: (data: MainPageData) => Promise<void>;
}

export default function AdminMainPageForm({ initialData, onSubmit }: AdminMainPageFormProps) {
    const [formData, setFormData] = useState<MainPageData>(initialData);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (section: keyof MainPageData, field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Specifically handle nested change for stats cause it's flat structure inside stats object in our type definition
    // wait, existing type definition has sections.
    // hero: {...}, stats: {...}, cta: {...}
    // So handleChange logic above works if we pass 'hero', 'badge', value.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await onSubmit(formData);
            setMessage('메인 페이지 정보가 성공적으로 업데이트되었습니다.');
        } catch {
            setMessage('업데이트 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #444',
        background: '#222',
        color: 'white',
        fontSize: '1rem',
        marginBottom: '1rem'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        color: '#ccc',
        fontSize: '0.9rem'
    };

    const sectionStyle = {
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px'
    };

    const sectionTitleStyle = {
        fontSize: '1.2rem',
        color: 'var(--color-primary)',
        marginBottom: '1rem',
        borderBottom: '1px solid #444',
        paddingBottom: '0.5rem'
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Hero Section */}
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Hero Section (상단 메인)</h3>

                <div>
                    <label style={labelStyle}>Badge Text</label>
                    <input
                        type="text"
                        value={formData.hero.badge}
                        onChange={(e) => handleChange('hero', 'badge', e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Title Line 1 (Gradient)</label>
                        <input
                            type="text"
                            value={formData.hero.titleLine1}
                            onChange={(e) => handleChange('hero', 'titleLine1', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Title Line 2</label>
                        <input
                            type="text"
                            value={formData.hero.titleLine2}
                            onChange={(e) => handleChange('hero', 'titleLine2', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Description (줄바꿈 가능)</label>
                    <textarea
                        value={formData.hero.description}
                        onChange={(e) => handleChange('hero', 'description', e.target.value)}
                        style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                    />
                </div>
            </div>

            {/* Stats Section */}
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Stats Section (통계/지표)</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Years Value</label>
                        <input
                            type="text"
                            value={formData.stats.yearsExp}
                            onChange={(e) => handleChange('stats', 'yearsExp', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Years Label</label>
                        <input
                            type="text"
                            value={formData.stats.yearsLabel}
                            onChange={(e) => handleChange('stats', 'yearsLabel', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Success Value</label>
                        <input
                            type="text"
                            value={formData.stats.successRate}
                            onChange={(e) => handleChange('stats', 'successRate', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Success Label</label>
                        <input
                            type="text"
                            value={formData.stats.successLabel}
                            onChange={(e) => handleChange('stats', 'successLabel', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Support Value</label>
                        <input
                            type="text"
                            value={formData.stats.support}
                            onChange={(e) => handleChange('stats', 'support', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Support Label</label>
                        <input
                            type="text"
                            value={formData.stats.supportLabel}
                            onChange={(e) => handleChange('stats', 'supportLabel', e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Bottom CTA Section (하단 행동 유도)</h3>

                <div>
                    <label style={labelStyle}>Title</label>
                    <input
                        type="text"
                        value={formData.cta.title}
                        onChange={(e) => handleChange('cta', 'title', e.target.value)}
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={labelStyle}>Description</label>
                    <textarea
                        value={formData.cta.description}
                        onChange={(e) => handleChange('cta', 'description', e.target.value)}
                        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                    />
                </div>
            </div>

            {message && (
                <p style={{
                    color: message.includes('오류') ? '#ff6b6b' : '#51cf66',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontWeight: 500
                }}>
                    {message}
                </p>
            )}

            <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
            </Button>
        </form>
    );
}
