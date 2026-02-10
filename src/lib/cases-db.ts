import fs from 'fs/promises';
import path from 'path';
import { kv } from '@vercel/kv';
import { CaseStudy, CaseStudyFormData } from '@/types/case-study';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'cases.json');
const KV_KEY = 'cms:cases';
const hasKVVars = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

// Ensure data directory exists (utility helper)
async function ensureDataFile() {
    try {
        await fs.access(DATA_FILE_PATH);
    } catch {
        const initialData: CaseStudy[] = [];
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(initialData, null, 2));
    }
}

export async function getCases(): Promise<CaseStudy[]> {
    // 1. Redis에서 시도
    if (hasKVVars) {
        try {
            const cachedCases = await kv.get<CaseStudy[]>(KV_KEY);
            if (cachedCases) return cachedCases;
        } catch (error) {
            console.error('Failed to get cases from KV:', error);
        }
    }

    // 2. Redis에 없거나 로컬이면 JSON 파일 시도
    await ensureDataFile();
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    try {
        const cases = JSON.parse(fileContent) as CaseStudy[];
        const normalized = cases.map(c => ({
            ...c,
            order: typeof c.order === 'number' ? c.order : 0,
            tags: Array.isArray(c.tags) ? c.tags : [],
            gallery: Array.isArray(c.gallery) ? c.gallery : [],
        }));
        const sorted = normalized.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        // 마이그레이션: Redis 비어있으면 채우기
        if (hasKVVars) {
            await kv.set(KV_KEY, sorted);
        }

        return sorted;
    } catch (error) {
        console.error('Failed to parse cases.json', error);
        return [];
    }
}

// 내부 헬퍼: Redis와 로컬 파일 동시 저장
async function saveCases(cases: CaseStudy[]) {
    if (hasKVVars) {
        await kv.set(KV_KEY, cases);
    }
    try {
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(cases, null, 2));
    } catch {
        // Vercel 환경 실패 무시
    }
}

export async function getCaseById(id: string): Promise<CaseStudy | undefined> {
    const cases = await getCases();
    return cases.find((c) => c.id === id);
}

export async function createCase(data: CaseStudyFormData): Promise<CaseStudy> {
    const cases = await getCases();
    const newCase: CaseStudy = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    cases.push(newCase);
    await saveCases(cases);
    return newCase;
}

export async function updateCase(id: string, data: Partial<CaseStudyFormData>): Promise<CaseStudy | null> {
    const cases = await getCases();
    const index = cases.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updatedCase = {
        ...cases[index],
        ...data,
        updatedAt: new Date().toISOString(),
    };
    cases[index] = updatedCase;

    await saveCases(cases);
    return updatedCase;
}

export async function deleteCase(id: string): Promise<boolean> {
    let cases = await getCases();
    const initialLength = cases.length;
    cases = cases.filter((c) => c.id !== id);

    if (cases.length === initialLength) return false;

    await saveCases(cases);
    return true;
}

export async function reorderCases(orderedIds: string[]): Promise<void> {
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

    await saveCases(newCases);
}
