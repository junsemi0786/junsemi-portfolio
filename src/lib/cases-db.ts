import { createClient } from 'redis';
import fs from 'fs/promises';
import path from 'path';
import { CaseStudy, CaseStudyFormData } from '@/types/case-study';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'cases.json');

let globalWithRedis = global as typeof globalThis & {
  _redisClientCases?: ReturnType<typeof createClient>;
};

async function getRedisClient() {
    if (!process.env.REDIS_URL) {
        throw new Error('REDIS_URL 환경 변수가 누락되었습니다.\nVercel 환경 변수에 REDIS_URL을 등록해주세요.');
    }

    if (!globalWithRedis._redisClientCases) {
        const client = createClient({ url: process.env.REDIS_URL });
        client.on('error', (err) => console.error('Redis Client Error', err));
        await client.connect();
        globalWithRedis._redisClientCases = client;
    }
    
    return globalWithRedis._redisClientCases;
}

export async function getCases(): Promise<CaseStudy[]> {
    try {
        if (process.env.REDIS_URL) {
            const client = await getRedisClient();
            const dataStr = await client.get('cases_data');
            if (dataStr) {
                const cached = JSON.parse(dataStr) as CaseStudy[];
                if (Array.isArray(cached) && cached.length > 0) {
                    return cached.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                }
            }
        }
    } catch (e) {
        console.warn('Redis 데이터를 읽는 중 문제가 발생했거나 연결 실패:', e);
    }

    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const cases = JSON.parse(fileContent) as CaseStudy[];
        // Normalize data to ensure type safety
        const normalized = cases.map(c => ({
            ...c,
            order: typeof c.order === 'number' ? c.order : 0,
            tags: Array.isArray(c.tags) ? c.tags : [],
            gallery: Array.isArray(c.gallery) ? c.gallery : [],
        }));
        // Sort by order with safe fallback
        return normalized.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    } catch (error) {
        console.error('Failed to parse cases.json', error);
        return [];
    }
}

export async function getCaseById(id: string): Promise<CaseStudy | undefined> {
    const cases = await getCases();
    return cases.find((c) => c.id === id);
}

export async function createCase(data: CaseStudyFormData): Promise<CaseStudy> {
    const client = await getRedisClient();
    const cases = await getCases();
    const newCase: CaseStudy = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    cases.push(newCase);
    await client.set('cases_data', JSON.stringify(cases));
    return newCase;
}

export async function updateCase(id: string, data: Partial<CaseStudyFormData>): Promise<CaseStudy | null> {
    const client = await getRedisClient();
    const cases = await getCases();
    const index = cases.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updatedCase = {
        ...cases[index],
        ...data,
        updatedAt: new Date().toISOString(),
    };
    cases[index] = updatedCase;

    await client.set('cases_data', JSON.stringify(cases));
    return updatedCase;
}

export async function deleteCase(id: string): Promise<boolean> {
    const client = await getRedisClient();
    let cases = await getCases();
    const initialLength = cases.length;
    cases = cases.filter((c) => c.id !== id);

    if (cases.length === initialLength) return false;

    await client.set('cases_data', JSON.stringify(cases));
    return true;
}

export async function reorderCases(orderedIds: string[]): Promise<void> {
    const client = await getRedisClient();
    const cases = await getCases();
    const casesMap = new Map(cases.map(c => [c.id, c]));

    const newCases: CaseStudy[] = [];
    orderedIds.forEach((id, index) => {
        const c = casesMap.get(id);
        if (c) {
            c.order = index; // Update order index
            newCases.push(c);
        }
    });

    // Add any missing cases back to the end (safety check)
    cases.forEach(c => {
        if (!newCases.find(nc => nc.id === c.id)) {
            c.order = newCases.length;
            newCases.push(c);
        }
    });

    await client.set('cases_data', JSON.stringify(newCases));
}
