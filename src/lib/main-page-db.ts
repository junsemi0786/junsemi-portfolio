import fs from 'fs/promises';
import path from 'path';
import { kv } from '@vercel/kv';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'main-page.json');
const KV_KEY = 'cms:main-page';
const hasKVVars = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

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

export async function getMainPageData(): Promise<MainPageData> {
    // 1. Redis에서 시도 (Vercel 배포 환경 대응)
    if (hasKVVars) {
        try {
            const cachedData = await kv.get<MainPageData>(KV_KEY);
            if (cachedData) return cachedData;
        } catch (error) {
            console.error('Failed to get main page data from KV:', error);
        }
    }

    // 2. Redis에 없거나 로컬 환경이면 JSON 파일에서 시도
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContent) as MainPageData;

        // Redis가 비어있다면 초기 데이터로 채워넣기 (첫 배포 시 자동 마이그레이션)
        if (hasKVVars) {
            await kv.set(KV_KEY, data);
        }

        return data;
    } catch {
        // 3. 파일도 없으면 기본값 반환
        return defaultData;
    }
}

export async function updateMainPageData(data: MainPageData): Promise<void> {
    // 1. Redis 업데이트 (가장 중요 - Vercel에서 작동하는 유일한 방법)
    if (hasKVVars) {
        await kv.set(KV_KEY, data);
    }

    // 2. 로컬 파일 업데이트 시도 (로컬 개발 환경 대응)
    try {
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        // Vercel 운영 환경에서는 실패하지만, Redis가 성공했으므로 괜찮음
        console.warn('Local filesystem write failed (expected in Vercel):', error);
    }
}
