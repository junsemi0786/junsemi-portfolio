import Redis from 'ioredis';

let globalWithRedis = global as typeof globalThis & {
  _redisClientAdminConfig?: Redis;
};

async function getRedisClient() {
    if (!process.env.REDIS_URL) {
        throw new Error('REDIS_URL 환경 변수가 누락되었습니다.\nVercel 환경 변수에 REDIS_URL을 등록해주세요.');
    }

    if (!globalWithRedis._redisClientAdminConfig) {
        const client = new Redis(process.env.REDIS_URL);
        client.on('error', (err) => console.error('Redis Client Error', err));
        globalWithRedis._redisClientAdminConfig = client;
    }
    
    return globalWithRedis._redisClientAdminConfig;
}

export async function getAdminPassword(): Promise<string | null> {
    try {
        if (process.env.REDIS_URL) {
            const client = await getRedisClient();
            const pwd = await client.get('admin_config_password');
            if (pwd) return pwd;
        }
    } catch (e) {
        console.warn('Redis 데이터를 읽는 중 문제가 발생했거나 연결 실패:', e);
    }
    return null; // Fallback to env var in auth.ts
}

export async function updateAdminPassword(newPassword: string): Promise<void> {
    const client = await getRedisClient();
    await client.set('admin_config_password', newPassword);
}
