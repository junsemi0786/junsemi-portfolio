import fs from 'fs/promises';
import path from 'path';
import { TechnicalExpertise, ExpertiseFormData } from '@/types/expertise';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'expertise.json');

async function ensureDataFile() {
    try {
        await fs.access(DATA_FILE_PATH);
    } catch {
        const initialData: TechnicalExpertise[] = [];
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(initialData, null, 2));
    }
}

export async function getExpertiseList(): Promise<TechnicalExpertise[]> {
    await ensureDataFile();
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    try {
        const list = JSON.parse(fileContent) as TechnicalExpertise[];
        // Normalize data to ensure type safety
        const normalized = list.map(item => ({
            ...item,
            order: typeof item.order === 'number' ? item.order : 0,
            keywords: Array.isArray(item.keywords) ? item.keywords : [],
            features: Array.isArray(item.features) ? item.features : [],
        }));
        return normalized.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    } catch (error) {
        console.error('Failed to parse expertise.json', error);
        return [];
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
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(list, null, 2));
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

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(list, null, 2));
    return updatedItem;
}

export async function deleteExpertise(id: string): Promise<boolean> {
    let list = await getExpertiseList();
    const initialLength = list.length;
    list = list.filter((item) => item.id !== id);

    if (list.length === initialLength) return false;

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(list, null, 2));
    return true;
}
