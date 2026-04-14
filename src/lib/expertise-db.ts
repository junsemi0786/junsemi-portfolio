import Redis from 'ioredis';
import fs from 'fs/promises';
import path from 'path';
import { TechnicalExpertise, ExpertiseFormData } from '@/types/expertise';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'expertise.json');

// 전역 클라이언트 캐싱 (핫 리로드 시 다중 연결 방지)
let globalWithRedis = global as typeof globalThis & {
  _redisClientExportise?: Redis;
};

async function getRedisClient() {
    if (!process.env.REDIS_URL) {
        throw new Error('REDIS_URL 환경 변수가 누락되었습니다. Vercel 환경 변수에 REDIS_URL을 등록해주세요.');
    }

    if (!globalWithRedis._redisClientExportise) {
        const client = new Redis(process.env.REDIS_URL);
        client.on('error', (err) => console.error('Redis Client Error', err));
        globalWithRedis._redisClientExportise = client;
    }
    
    return globalWithRedis._redisClientExportise;
}

export async function getExpertiseList(): Promise<TechnicalExpertise[]> {
    try {
        if (process.env.REDIS_URL) {
            const client = await getRedisClient();
            const dataStr = await client.get('expertise_data');
            
            if (dataStr) {
                const cached = JSON.parse(dataStr) as TechnicalExpertise[];
                if (Array.isArray(cached) && cached.length > 0) {
                    return cached.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                }
            }
        }
    } catch (e) {
        console.warn('Redis 데이터를 읽는 중 문제가 발생했거나 연결 실패:', e);
    }

    // Fallback: 파일에서 데이터 로드
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const list = JSON.parse(fileContent) as TechnicalExpertise[];
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
    const client = await getRedisClient(); // REDIS_URL 없으면 에러 던짐
    const list = await getExpertiseList();
    const newItem: TechnicalExpertise = {
        ...data,
        id: data.id || crypto.randomUUID(),
        updatedAt: new Date().toISOString(),
    };

    list.push(newItem);
    await client.set('expertise_data', JSON.stringify(list));
    return newItem;
}

export async function updateExpertise(id: string, data: Partial<ExpertiseFormData>): Promise<TechnicalExpertise | null> {
    const client = await getRedisClient();
    const list = await getExpertiseList();
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const updatedItem = {
        ...list[index],
        ...data,
        updatedAt: new Date().toISOString(),
    };
    list[index] = updatedItem;
    
    await client.set('expertise_data', JSON.stringify(list));
    return updatedItem;
}

export async function deleteExpertise(id: string): Promise<boolean> {
    const client = await getRedisClient();
    let list = await getExpertiseList();
    const initialLength = list.length;
    list = list.filter((item) => item.id !== id);

    if (list.length === initialLength) return false;
    
    await client.set('expertise_data', JSON.stringify(list));
    return true;
}
