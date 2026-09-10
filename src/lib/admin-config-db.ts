import { readContent, writeContent } from "./content-store";
// Legacy Redis password is a raw string; preserve that storage format.
import Redis from "ioredis";
async function passwordClient() {
  if (!process.env.REDIS_URL) return null;
  const client = new Redis(process.env.REDIS_URL, {
    connectTimeout: 5000,
    maxRetriesPerRequest: 1,
    retryStrategy: () => null,
  });
  client.on("error", () => console.error("관리자 설정 연결 실패"));
  return client;
}
export async function getAdminPassword(): Promise<string | null> {
  const client = await passwordClient();
  if (client) {
    try {
      return await client.get("admin_config_password");
    } finally {
      client.disconnect();
    }
  }
  return readContent<string | null>("admin_password_local", null, null);
}
export async function updateAdminPassword(password: string) {
  const client = await passwordClient();
  if (client) {
    try {
      await client.set("admin_config_password", password);
    } finally {
      client.disconnect();
    }
  } else {
    await writeContent("admin_password_local", password);
  }
}
