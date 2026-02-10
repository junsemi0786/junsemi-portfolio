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

export async function getMainPageData(): Promise<MainPageData> {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(fileContent) as MainPageData;
    } catch {
        // Return default if file missing or error
        return defaultData;
    }
}

export async function updateMainPageData(data: MainPageData): Promise<void> {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
}
