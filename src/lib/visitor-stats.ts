import { kv } from '@vercel/kv';

export interface VisitorStats {
    total: number;
    today: number;
}

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환합니다 (KST 기준)
 */
function getTodayKey() {
    const now = new Date();
    // 한국 시간(KST) 보정
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(now.getTime() + kstOffset);
    return `daily_visitors:${kstDate.toISOString().split('T')[0]}`;
}

const TOTAL_KEY = 'total_visitors';

export async function getVisitorStats(): Promise<VisitorStats> {
    const todayKey = getTodayKey();

    try {
        // 다중 조회를 위해 mget 사용 가능하지만 간단히 개별 호출
        const [total, today] = await Promise.all([
            kv.get<number>(TOTAL_KEY),
            kv.get<number>(todayKey)
        ]);

        return {
            total: total || 0,
            today: today || 0
        };
    } catch (error) {
        console.error('Failed to fetch visitor stats:', error);
        // Vercel KV가 설정되지 않은 로컬 환경 등에서는 0 반환
        return { total: 0, today: 0 };
    }
}

export async function incrementVisitorStats(): Promise<VisitorStats> {
    const todayKey = getTodayKey();

    try {
        // 전체 카운트와 오늘 카운트 동시 증감
        const [newTotal, newToday] = await Promise.all([
            kv.incr(TOTAL_KEY),
            kv.incr(todayKey)
        ]);

        // 당일 카운터는 평생 보관하기보다 2일 정도 후 만료되게 설정 가능 (옵션)
        // await kv.expire(todayKey, 60 * 60 * 48); 

        return {
            total: Number(newTotal),
            today: Number(newToday)
        };
    } catch (error) {
        console.error('Failed to increment visitor stats:', error);
        return { total: 0, today: 0 };
    }
}
