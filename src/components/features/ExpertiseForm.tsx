'use client';

import { useState } from 'react';
import { TechnicalExpertise, ExpertiseFormData } from '@/types/expertise';
import Button from '@/components/ui/Button';

interface ExpertiseFormProps {
    initialData?: TechnicalExpertise;
    onSubmit: (data: ExpertiseFormData) => Promise<void>;
    isEditing?: boolean;
}

export default function ExpertiseForm({ initialData, onSubmit, isEditing = false }: ExpertiseFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ExpertiseFormData>({
        id: initialData?.id || '',
        title: initialData?.title || '',
        subtitle: initialData?.subtitle || '',
        description: initialData?.description || '',
        imageSrc: initialData?.imageSrc || '',
        keywords: initialData?.keywords || [],
        features: initialData?.features || [],
        iconType: initialData?.iconType || 'default',
        order: initialData?.order || 0,
    });

    const [keywordInput, setKeywordInput] = useState('');
    const [featureInput, setFeatureInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddKeyword = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && keywordInput.trim()) {
            e.preventDefault();
            if (!formData.keywords.includes(keywordInput.trim())) {
                setFormData(prev => ({ ...prev, keywords: [...prev.keywords, keywordInput.trim()] }));
            }
            setKeywordInput('');
        }
    };

    const removeKeyword = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, keywords: prev.keywords.filter(t => t !== tagToRemove) }));
    };

    const handleAddFeature = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && featureInput.trim()) {
            e.preventDefault();
            setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
            setFeatureInput('');
        }
    };

    const removeFeature = (indexToRemove: number) => {
        setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== indexToRemove) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.id.trim()) {
            alert('ID is required');
            return;
        }
        setLoading(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error(error);
            alert('저장 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>ID (고유 식별자, 예: wet-process) *</label>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                    disabled={isEditing}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: isEditing ? '#333' : '#222', color: 'white' }}
                />
            </div>

            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>제목 (Title) *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                    />
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>부제목 (Subtitle) *</label>
                    <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                    />
                </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>설명 (Description) *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>이미지 경로 (예: /images/solution.png) *</label>
                <input
                    type="text"
                    name="imageSrc"
                    value={formData.imageSrc}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>키워드 (엔터로 추가)</label>
                <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleAddKeyword}
                    placeholder="Refurbish, EasyView..."
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '0.5rem' }}>
                    {formData.keywords.map(k => (
                        <span key={k} style={{ background: '#444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {k}
                            <button type="button" onClick={() => removeKeyword(k)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer' }}>×</button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>주요 특징 (Features) - 엔터로 추가</label>
                <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={handleAddFeature}
                    placeholder="특징을 입력하세요"
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                />
                <ul style={{ marginTop: '0.5rem', paddingLeft: '20px', color: '#ccc' }}>
                    {formData.features.map((f, i) => (
                        <li key={i} style={{ marginBottom: '5px' }}>
                            {f} <button type="button" onClick={() => removeFeature(i)} style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', marginLeft: '10px' }}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>아이콘 타입</label>
                    <select
                        name="iconType"
                        value={formData.iconType}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                    >
                        <option value="semicon">Semiconductor</option>
                        <option value="automation">Automation</option>
                        <option value="scada">SCADA</option>
                        <option value="default">Default</option>
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>노출 순서 (숫자)</label>
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
                <Button type="button" variant="outline" onClick={() => window.history.back()}>취소</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? '저장 중...' : (isEditing ? '수정 완료' : '등록 완료')}
                </Button>
            </div>
        </form>
    );
}
