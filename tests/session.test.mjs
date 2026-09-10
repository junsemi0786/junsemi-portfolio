import test from "node:test";
import assert from "node:assert/strict";
import {
  issueSession,
  verifySession,
  passwordMatches,
} from "../src/lib/session-token.ts";
test("signed session rejects forged, expired and changed-password cookies", () => {
  const now = 1789000000000;
  const token = issueSession("test-secret", now);
  assert.equal(verifySession(token, "test-secret", now + 1), true);
  for (const invalid of [
    "true",
    "false",
    "",
    token + "extra",
    token.replace(/.$/, "z"),
  ])
    assert.equal(verifySession(invalid, "test-secret", now), false);
  assert.equal(verifySession(token, "other-secret", now), false);
  assert.equal(verifySession(token, "test-secret", now + 86400000), false);
  assert.equal(verifySession(token, "", now), false);
});
test("an absent administrator password never authenticates", () => {
  assert.equal(passwordMatches("", ""), false);
  assert.equal(passwordMatches("0901", ""), false);
  assert.equal(passwordMatches("wrong", "configured"), false);
  assert.equal(passwordMatches("configured", "configured"), true);
});

import { cleanExpertiseDescription } from '../src/lib/content-text.ts';
test('legacy copy cleanup preserves actual model numbers',()=>{
 assert.equal(cleanExpertiseDescription('SCADA를 구축합니다...2222'),'SCADA를 구축합니다.');
 assert.equal(cleanExpertiseDescription('PLC 1111 모델과 2000 태그를 확인합니다.'),'PLC 1111 모델과 2000 태그를 확인합니다.');
});
