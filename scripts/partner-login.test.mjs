import assert from "node:assert/strict";
import { test } from "node:test";
import { clearLoginEmail, createEmailLinkCompletion, loginErrorMessage, PartnerLoginError, readLoginEmail, saveLoginEmail } from "../lib/partner-login-client.ts";
import { isRejectedAuthCredential } from "../lib/auth-errors.ts";

test("blocked localStorage does not prevent requesting or completing login", () => {
  globalThis.window = { get localStorage() { throw new Error("SecurityError"); } };
  assert.equal(readLoginEmail(), "");
  assert.doesNotThrow(() => saveLoginEmail("person@example.test"));
  assert.doesNotThrow(clearLoginEmail);
  delete globalThis.window;
});

test("transient session failure retries with verified user, without redeeming a single-use link twice", async () => {
  let redemptions = 0;
  let sessions = 0;
  const complete = createEmailLinkCompletion(async () => {
    assert.equal(++redemptions, 1);
    return { uid: "partner" };
  }, async user => {
    assert.equal(user.uid, "partner");
    if (++sessions === 1) throw new PartnerLoginError("Retry the session", "session-503");
    return "/partners";
  });
  await assert.rejects(complete("a@example.test", "one-use-link"), /Retry the session/);
  assert.equal(await complete("a@example.test", "one-use-link"), "/partners");
  assert.equal(redemptions, 1);
});

test("simultaneous completion calls share the same redemption and session", async () => {
  let count = 0;
  const complete = createEmailLinkCompletion(async () => { count++; return "admin"; }, async () => "/admin");
  const first = complete("a@example.test", "link");
  assert.equal(complete("a@example.test", "link"), first);
  assert.equal(await first, "/admin");
  assert.equal(count, 1);
});

test("another email or link cannot reuse a previously verified user", async () => {
  const redemptions = [];
  const complete = createEmailLinkCompletion(async email => { redemptions.push(email); return email; }, async () => "/partners");
  await complete("a@example.test", "a-link");
  await complete("b@example.test", "b-link");
  assert.deepEqual(redemptions, ["a@example.test", "b@example.test"]);
});

test("wrong email can be corrected without caching a failed redemption", async () => {
  const complete = createEmailLinkCompletion(async email => {
    if (email !== "right@example.test") throw new Error("wrong email");
    return email;
  }, async () => "/partners");
  await assert.rejects(complete("wrong@example.test", "link"));
  assert.equal(await complete("right@example.test", "link"), "/partners");
});

test("service failures are not reported as expired links or signed-out sessions", () => {
  assert.equal(isRejectedAuthCredential({ code: "auth/session-cookie-expired" }), true);
  assert.equal(isRejectedAuthCredential({ code: "auth/session-cookie-revoked" }), true);
  assert.equal(isRejectedAuthCredential({ code: "auth/user-disabled" }), true);
  for (const code of ["auth/invalid-credential", "auth/internal-error", "UNAVAILABLE", "permission-denied"]) {
    assert.equal(isRejectedAuthCredential({ code }), false);
  }
  assert.match(loginErrorMessage({ code: "auth/network-request-failed" }), /connection/);
  assert.match(loginErrorMessage({ code: "auth/expired-action-code" }), /Request a new/);
  assert.equal(loginErrorMessage(new PartnerLoginError("Retry the session", "session-503")), "Retry the session");
});
