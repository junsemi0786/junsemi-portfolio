import { kv } from '@vercel/kv';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'main-page.json');

export interface MainPageData {
    hero: {
        badge: string;
        titleLine1: string;
        titleLine2: string;
        description: string;
    };
    stats: {
        yearsExp: string;
        yearsLabel: string;
        successRate: string;
        successLabel: string;
        support: string;
        supportLabel: string;
    };
    cta: {
        title: string;
        description: string;
    };
}

const defaultData: MainPageData = {
    hero: {
        badge: "Engineered Precision",
        titleLine1: "Smart Engineering",
        titleLine2: "For Future Industry",
        description: "반도체 장비 리퍼비시부터 관공서 SCADA 구축까지.\n복잡한 현장 문제를 기술과 데이터로 해결합니다."
    },
    stats: {
        yearsExp: "15+",
        yearsLabel: "Years Exp",
        successRate: "100%",
        successLabel: "Success Rate",
        support: "24h",
        supportLabel: "Support"
    },
    cta: {
        title: "엔지니어링의 미래를 경험하세요",
        description: "복잡한 산업 현장의 문제를 해결하고, 생산성을 극대화하는 맞춤형 솔루션을 제공합니다."
    }
};

function ensureKVSetup() {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        throw new Error('Vercel KV(데이터베이스) 환경설정이 누락되었습니다. 대시보드에서 환경 변수를 등록해주세요.');
    }
}

export async function getMainPageData(): Promise<MainPageData> {
    try {
        const cached = await kv.get<MainPageData>('main_page_data');
        if (cached && Object.keys(cached).length > 0) {
            return cached;
        }
    } catch (e) {
        console.warn('Vercel KV 데이터를 읽는 중 문제가 발생했거나 설정되지 않음:', e);
    }

    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(fileContent) as MainPageData;
    } catch {
        // Return default if file missing or error
        return defaultData;
    }
}

export async function updateMainPageData(data: MainPageData): Promise<void> {
    ensureKVSetup();
    await kv.set('main_page_data', data);
}
