import { kv } from '@vercel/kv';
import fs from 'fs/promises';
import path from 'path';
import { CaseStudy, CaseStudyFormData } from '@/types/case-study';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'cases.json');

function ensureKVSetup() {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        throw new Error('Vercel KV(데이터베이스) 환경설정이 누락되었습니다. 대시보드에서 환경 변수를 등록해주세요.');
    }
}

export async function getCases(): Promise<CaseStudy[]> {
    try {
        const cached = await kv.get<CaseStudy[]>('cases_data');
        if (cached && Array.isArray(cached) && cached.length > 0) {
            return cached.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        }
    } catch (e) {
        console.warn('Vercel KV 데이터를 읽는 중 문제가 발생했거나 설정되지 않음:', e);
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
    ensureKVSetup();
    const cases = await getCases();
    const newCase: CaseStudy = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    cases.push(newCase);
    await kv.set('cases_data', cases);
    return newCase;
}

export async function updateCase(id: string, data: Partial<CaseStudyFormData>): Promise<CaseStudy | null> {
    ensureKVSetup();
    const cases = await getCases();
    const index = cases.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updatedCase = {
        ...cases[index],
        ...data,
        updatedAt: new Date().toISOString(),
    };
    cases[index] = updatedCase;

    await kv.set('cases_data', cases);
    return updatedCase;
}

export async function deleteCase(id: string): Promise<boolean> {
    ensureKVSetup();
    let cases = await getCases();
    const initialLength = cases.length;
    cases = cases.filter((c) => c.id !== id);

    if (cases.length === initialLength) return false;

    await kv.set('cases_data', cases);
    return true;
}

export async function reorderCases(orderedIds: string[]): Promise<void> {
    ensureKVSetup();
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

    await kv.set('cases_data', newCases);
}
