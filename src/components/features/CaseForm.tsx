'use client';

import { useState } from 'react';
import { CaseStudy, CaseStudyFormData } from '@/types/case-study';
import Button from '@/components/ui/Button';

interface CaseFormProps {
    initialData?: CaseStudy;
    onSubmit: (data: CaseStudyFormData) => Promise<void>;
    isEditing?: boolean;
}

export default function CaseForm({ initialData, onSubmit, isEditing = false }: CaseFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CaseStudyFormData>({
        clientName: initialData?.clientName || '',
        projectName: initialData?.projectName || '',
        period: initialData?.period || '',
        tags: initialData?.tags || [],
        thumbnailUrl: initialData?.thumbnailUrl || '',
        gallery: initialData?.gallery || [],
        summary: initialData?.summary || '',
        description: initialData?.description || '',
        outcome: initialData?.outcome || '',
        status: initialData?.status || 'draft',
        order: initialData?.order || 0,
    });

    const [tagInput, setTagInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            // Next.js redirect는 에러 객체를 통해 작동하므로, 
            // 메시지가 없거나 리다이렉트 관련 에러면 무시
            if (error instanceof Error && (error.message === 'NEXT_REDIRECT' || error.message.includes('redirect'))) {
                return;
            }
            console.error(error);
            alert('Failed to save case study');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Project Name *</label>
                <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>

            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Client Name *</label>
                    <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                    />
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Period (e.g. 2024.01 - 2024.06) *</label>
                    <input
                        type="text"
                        name="period"
                        value={formData.period}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                    />
                </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>썸네일 이미지 경로 (예: /images/thumb.jpg) *</label>
                <input
                    type="text"
                    name="thumbnailUrl"
                    value={formData.thumbnailUrl}
                    onChange={handleChange}
                    required
                    placeholder="/images/project-1.jpg"
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>갤러리 이미지 (선택, 쉼표로 구분)</label>
                <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '0.5rem' }}>상세 페이지 하단에 보여질 추가 이미지들의 경로를 쉼표(,)로 구분하여 입력하세요.</p>
                <input
                    type="text"
                    name="gallery"
                    value={formData.gallery?.join(', ') || ''}
                    onChange={(e) => {
                        const paths = e.target.value.split(',')
                            .map(s => s.trim())
                            .filter(s => s !== '');
                        setFormData(prev => ({ ...prev, gallery: paths }));
                    }}
                    placeholder="/images/detail1.jpg, /images/detail2.jpg"
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>



            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Tags (Press Enter to add)</label>
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="AI, React, Marketing..."
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '0.5rem' }}>
                    {formData.tags.map(tag => (
                        <span key={tag} style={{ background: '#444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer' }}>×</button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Summary (Short description for list) *</label>
                <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    required
                    rows={3}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Performance Outcome (e.g. Sales +30%)</label>
                <input
                    type="text"
                    name="outcome"
                    value={formData.outcome}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Description (Markdown supported) *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={10}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>

            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                    >
                        <option value="draft">Draft (Hidden)</option>
                        <option value="published">Published (Visible)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Display Order (Number)</label>
                    <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                    />
                </div>
            </div>

            <div className="actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : (isEditing ? 'Update Case' : 'Create Case')}
                </Button>
            </div>
        </form>
    );
}
