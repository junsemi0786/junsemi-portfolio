import { createClient } from 'redis';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'contact.json');

export interface ContactInfo {
    phone: string;
    email: string;
    fax: string;
    address: string;
    transport?: string;
    mapMessage?: string;
}

let globalWithRedis = global as typeof globalThis & {
  _redisClientContact?: ReturnType<typeof createClient>;
};

async function getRedisClient() {
    if (!process.env.REDIS_URL) {
        throw new Error('REDIS_URL 환경 변수가 누락되었습니다.\nVercel 환경 변수에 REDIS_URL을 등록해주세요.');
    }

    if (!globalWithRedis._redisClientContact) {
        const client = createClient({ url: process.env.REDIS_URL });
        client.on('error', (err) => console.error('Redis Client Error', err));
        await client.connect();
        globalWithRedis._redisClientContact = client;
    }
    
    return globalWithRedis._redisClientContact;
}

export async function getContactInfo(): Promise<ContactInfo> {
    try {
        if (process.env.REDIS_URL) {
            const client = await getRedisClient();
            const dataStr = await client.get('contact_info');
            if (dataStr) {
                const cached = JSON.parse(dataStr) as ContactInfo;
                if (cached && Object.keys(cached).length > 0) {
                    return cached;
                }
            }
        }
    } catch (e) {
        console.warn('Redis 데이터를 읽는 중 문제가 발생했거나 연결 실패:', e);
    }

    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(fileContent) as ContactInfo;
    } catch {
        // Return default if file missing
        return {
            phone: "010-0000-0000",
            email: "contact@example.com",
            fax: "000-000-0000",
            address: "주소를 입력해주세요.",
            transport: "대중교통 정보를 입력해주세요.",
            mapMessage: "지도 준비 중"
        };
    }
}

export async function updateContactInfo(data: ContactInfo): Promise<void> {
    const client = await getRedisClient();
    await client.set('contact_info', JSON.stringify(data));
}
