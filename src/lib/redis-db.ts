import Redis from 'ioredis';

// 전역 클라이언트 캐싱 (핫 리로드 시 다중 연결 방지)
let globalWithRedis = global as typeof globalThis & {
  _redisClientStats?: Redis;
};

async function getRedisClient() {
    if (!process.env.REDIS_URL) {
        return null;
    }

    if (!globalWithRedis._redisClientStats) {
        try {
            const client = new Redis(process.env.REDIS_URL);
            client.on('error', (err) => console.error('Redis Client Error', err));
            globalWithRedis._redisClientStats = client;
        } catch (e) {
            console.error('Failed to initialize Redis client for stats:', e);
            return null;
        }
    }
    
    return globalWithRedis._redisClientStats;
}

export async function getRedisMemoryUsage(): Promise<string> {
    try {
        const client = await getRedisClient();
        if (!client) return '0B';

        const info = await client.info('memory');
        const match = info.match(/used_memory_human:(.*)/);
        
        if (match && match[1]) {
            return match[1].trim();
        }
        
        return '0B';
    } catch (e) {
        console.error('Failed to fetch Redis memory usage:', e);
        return 'Error';
    }
}
