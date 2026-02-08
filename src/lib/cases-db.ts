import fs from 'fs/promises';
import path from 'path';
import { CaseStudy, CaseStudyFormData } from '@/types/case-study';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'cases.json');

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
    await ensureDataFile();
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    try {
        const cases = JSON.parse(fileContent) as CaseStudy[];
        // Sort by order by default
        return cases.sort((a, b) => a.order - b.order);
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
    const cases = await getCases();
    const newCase: CaseStudy = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Add to beginning of list or end? Usually specific order matters.
    // Add to end for now.
    cases.push(newCase);

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(cases, null, 2));
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

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(cases, null, 2));
    return updatedCase;
}

export async function deleteCase(id: string): Promise<boolean> {
    let cases = await getCases();
    const initialLength = cases.length;
    cases = cases.filter((c) => c.id !== id);

    if (cases.length === initialLength) return false;

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(cases, null, 2));
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

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(newCases, null, 2));
}
