import { createHmac, timingSafeEqual } from "node:crypto";
const DAY = 86400000;
function signature(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}
export function issueSession(secret: string, now = Date.now()) {
  if (!secret) throw new Error("관리자 인증 설정이 필요합니다.");
  const expiry = String(now + DAY);
  return `${expiry}.${signature(expiry, secret)}`;
}
export function verifySession(
  token: string | undefined,
  secret: string,
  now = Date.now(),
): boolean {
  if (!token || !secret) return false;
  const [expiry, mac, ...extra] = token.split(".");
  if (
    extra.length ||
    !/^\d{13}$/.test(expiry) ||
    !/^([a-f0-9]{64})$/.test(mac || "")
  )
    return false;
  const time = Number(expiry);
  if (time <= now || time > now + DAY) return false;
  return timingSafeEqual(
    Buffer.from(mac, "hex"),
    Buffer.from(signature(expiry, secret), "hex"),
  );
}
export function passwordMatches(input: string, expected: string) {
  if (!expected) return false;
  const a = createHmac("sha256", "password-comparison").update(input).digest();
  const b = createHmac("sha256", "password-comparison")
    .update(expected)
    .digest();
  return timingSafeEqual(a, b);
}
