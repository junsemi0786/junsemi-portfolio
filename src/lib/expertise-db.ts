import fs from 'fs/promises';
import path from 'path';
import { TechnicalExpertise, ExpertiseFormData } from '@/types/expertise';

// Vercel(서버리스) 환경을 위한 인메모리 캐시
let expertiseCache: TechnicalExpertise[] | null = null;
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'expertise.json');

export async function getExpertiseList(): Promise<TechnicalExpertise[]> {
    if (expertiseCache) return expertiseCache;

    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const list = JSON.parse(fileContent) as TechnicalExpertise[];
        // Normalize data to ensure type safety
        const normalized = list.map(item => ({
            ...item,
            order: typeof item.order === 'number' ? item.order : 0,
            keywords: Array.isArray(item.keywords) ? item.keywords : [],
            features: Array.isArray(item.features) ? item.features : [],
        }));
        expertiseCache = normalized.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        return expertiseCache;
    } catch (error) {
        console.error('Failed to parse or read expertise.json', error);
        expertiseCache = [];
        return expertiseCache;
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
    expertiseCache = list;
    
    // Vercel 환경에서는 파일 시스템이 읽기 전용이므로 파일 쓰기 생략
    // 데이터는 메모리에만 저장되며 콜드 스타트 시 초기화됩니다.
    // await fs.writeFile(DATA_FILE_PATH, JSON.stringify(list, null, 2));
    
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
    expertiseCache = list;

    // Vercel 환경에서는 파일 시스템이 읽기 전용이므로 파일 쓰기 생략
    // await fs.writeFile(DATA_FILE_PATH, JSON.stringify(list, null, 2));
    
    return updatedItem;
}

export async function deleteExpertise(id: string): Promise<boolean> {
    let list = await getExpertiseList();
    const initialLength = list.length;
    list = list.filter((item) => item.id !== id);

    if (list.length === initialLength) return false;
    
    expertiseCache = list;

    // Vercel 환경에서는 파일 시스템이 읽기 전용이므로 파일 쓰기 생략
    // await fs.writeFile(DATA_FILE_PATH, JSON.stringify(list, null, 2));
    
    return true;
}
