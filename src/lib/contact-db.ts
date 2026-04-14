import { kv } from '@vercel/kv';
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

function ensureKVSetup() {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        throw new Error('Vercel KV(데이터베이스) 환경설정이 누락되었습니다. 대시보드에서 환경 변수를 등록해주세요.');
    }
}

export async function getContactInfo(): Promise<ContactInfo> {
    try {
        const cached = await kv.get<ContactInfo>('contact_info');
        if (cached && Object.keys(cached).length > 0) {
            return cached;
        }
    } catch (e) {
        console.warn('Vercel KV 데이터를 읽는 중 문제가 발생했거나 설정되지 않음:', e);
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
    ensureKVSetup();
    await kv.set('contact_info', data);
}
