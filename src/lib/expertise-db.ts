import { kv } from '@vercel/kv';
import fs from 'fs/promises';
import path from 'path';
import { TechnicalExpertise, ExpertiseFormData } from '@/types/expertise';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'expertise.json');

function ensureKVSetup() {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        throw new Error('Vercel KV(데이터베이스) 환경설정이 누락되었습니다. 대시보드에서 환경 변수를 등록해주세요.');
    }
}

export async function getExpertiseList(): Promise<TechnicalExpertise[]> {
    try {
        // 1. KV에서 먼저 읽기 시도
        const cached = await kv.get<TechnicalExpertise[]>('expertise_data');
        if (cached && Array.isArray(cached) && cached.length > 0) {
            return cached.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        }
    } catch (e) {
        console.warn('Vercel KV 데이터를 읽는 중 문제가 발생했거나 설정되지 않음:', e);
    }

    // 2. KV에 없거나 에러 발생 시 정적 JSON 파일 렌더링 (Fallback)
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const list = JSON.parse(fileContent) as TechnicalExpertise[];
        // Normalize
        const normalized = list.map(item => ({
            ...item,
            order: typeof item.order === 'number' ? item.order : 0,
            keywords: Array.isArray(item.keywords) ? item.keywords : [],
            features: Array.isArray(item.features) ? item.features : [],
        }));
        return normalized.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    } catch (error) {
        console.error('Failed to parse or read expertise.json', error);
        return [];
    }
}

export async function getExpertiseById(id: string): Promise<TechnicalExpertise | undefined> {
    const list = await getExpertiseList();
    return list.find((item) => item.id === id);
}

export async function createExpertise(data: ExpertiseFormData): Promise<TechnicalExpertise> {
    ensureKVSetup();
    const list = await getExpertiseList();
    const newItem: TechnicalExpertise = {
        ...data,
        id: data.id || crypto.randomUUID(),
        updatedAt: new Date().toISOString(),
    };

    list.push(newItem);
    await kv.set('expertise_data', list);
    return newItem;
}

export async function updateExpertise(id: string, data: Partial<ExpertiseFormData>): Promise<TechnicalExpertise | null> {
    ensureKVSetup();
    const list = await getExpertiseList();
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const updatedItem = {
        ...list[index],
        ...data,
        updatedAt: new Date().toISOString(),
    };
    list[index] = updatedItem;
    
    await kv.set('expertise_data', list);
    return updatedItem;
}

export async function deleteExpertise(id: string): Promise<boolean> {
    ensureKVSetup();
    let list = await getExpertiseList();
    const initialLength = list.length;
    list = list.filter((item) => item.id !== id);

    if (list.length === initialLength) return false;
    
    await kv.set('expertise_data', list);
    return true;
}
