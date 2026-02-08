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

export async function getContactInfo(): Promise<ContactInfo> {
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
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
}
