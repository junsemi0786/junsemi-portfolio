import fs from 'fs/promises';
import path from 'path';
import { kv } from '@vercel/kv';
import { TechnicalExpertise, ExpertiseFormData } from '@/types/expertise';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'expertise.json');
const KV_KEY = 'cms:expertise';
const hasKVVars = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

async function ensureDataFile() {
    try {
        await fs.access(DATA_FILE_PATH);
    } catch {
        const initialData: TechnicalExpertise[] = [];
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(initialData, null, 2));
    }
}

export async function getExpertiseList(): Promise<TechnicalExpertise[]> {
    // 1. Redis에서 시도
    if (hasKVVars) {
        try {
            const cachedList = await kv.get<TechnicalExpertise[]>(KV_KEY);
            if (cachedList) return cachedList;
        } catch (error) {
            console.error('Failed to get expertise list from KV:', error);
        }
    }

    // 2. Redis에 없거나 로컬이면 JSON 파일 시도
    await ensureDataFile();
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    try {
        const list = JSON.parse(fileContent) as TechnicalExpertise[];
        const normalized = list.map(item => ({
            ...item,
            order: typeof item.order === 'number' ? item.order : 0,
            keywords: Array.isArray(item.keywords) ? item.keywords : [],
            features: Array.isArray(item.features) ? item.features : [],
        }));
        const sorted = normalized.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        // 마이그레이션: Redis가 비어있으면 채워넣기
        if (hasKVVars) {
            await kv.set(KV_KEY, sorted);
        }

        return sorted;
    } catch (error) {
        console.error('Failed to parse expertise.json', error);
        return [];
    }
}

// 내부 헬퍼: Redis와 로컬 파일(가능할 경우) 동시 저장
async function saveExpertiseList(list: TechnicalExpertise[]) {
    if (hasKVVars) {
        await kv.set(KV_KEY, list);
    }
    try {
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(list, null, 2));
    } catch {
        // Vercel 환경 실패 무시
    }
}

export async function getExpertiseById(id: string): Promise<TechnicalExpertise | undefined> {
    const list = await getExpertiseList();
    return list.find((item) => item.id === id);
}

export async function createExpertise(data: ExpertiseFormData): Promise<TechnicalExpertise> {
    const list = await getExpertiseList();
    const newItem: TechnicalExpertise = {
        ...data,
        id: data.id || crypto.randomUUID(), // Allow manual ID or generate one
        updatedAt: new Date().toISOString(),
    };

    list.push(newItem);
    await saveExpertiseList(list);
    return newItem;
}

export async function updateExpertise(id: string, data: Partial<ExpertiseFormData>): Promise<TechnicalExpertise | null> {
    const list = await getExpertiseList();
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const updatedItem = {
        ...list[index],
        ...data,
        updatedAt: new Date().toISOString(),
    };
    list[index] = updatedItem;

    await saveExpertiseList(list);
    return updatedItem;
}

export async function deleteExpertise(id: string): Promise<boolean> {
    let list = await getExpertiseList();
    const initialLength = list.length;
    list = list.filter((item) => item.id !== id);

    if (list.length === initialLength) return false;

    await saveExpertiseList(list);
    return true;
}
