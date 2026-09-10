import Redis from "ioredis";
import fs from "node:fs/promises";
import path from "node:path";
const globals = globalThis as typeof globalThis & { junsemiRedis?: Redis };
function redis() {
  if (!process.env.REDIS_URL) return null;
  if (!globals.junsemiRedis) {
    const client = new Redis(process.env.REDIS_URL, {
      connectTimeout: 5000,
      maxRetriesPerRequest: 1,
      retryStrategy: () => null,
    });
    client.on("error", () => console.error("콘텐츠 저장소 연결 실패"));
    globals.junsemiRedis = client;
  }
  return globals.junsemiRedis;
}
const localEnabled = () =>
  process.env.NODE_ENV === "development" &&
  process.env.LOCAL_CONTENT === "true" &&
  !process.env.REDIS_URL;
export async function readContent<T>(
  key: string,
  file: string | null,
  fallback: T,
): Promise<T> {
  const client = redis();
  if (client) {
    const value = await client.get(key);
    if (value !== null) return JSON.parse(value) as T;
  }
  if (localEnabled()) {
    try {
      return JSON.parse(
        await fs.readFile(
          path.join(process.cwd(), ".local-data", `${key}.json`),
          "utf8",
        ),
      ) as T;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
    }
  }
  if (file) {
    return JSON.parse(
      await fs.readFile(path.join(process.cwd(), "data", file), "utf8"),
    ) as T;
  }
  return fallback;
}
export async function writeContent(key: string, data: unknown): Promise<void> {
  const client = redis();
  if (client) {
    await client.set(key, JSON.stringify(data));
    return;
  }
  if (localEnabled()) {
    const dir = path.join(process.cwd(), ".local-data");
    await fs.mkdir(dir, { recursive: true });
    const dest = path.join(dir, `${key}.json`);
    const temp = `${dest}.${crypto.randomUUID()}.tmp`;
    await fs.writeFile(temp, JSON.stringify(data, null, 2));
    await fs.rename(temp, dest);
    return;
  }
  throw new Error("프로젝트 저장을 위해 기존 REDIS_URL 연결이 필요합니다.");
}
