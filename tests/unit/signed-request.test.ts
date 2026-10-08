import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { parseSignedRequest } from "@/server/meta/signed-request";

const SECRET = "test-app-secret";

function sign(payload: object, secret = SECRET): string {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${sig}.${encoded}`;
}

describe("parseSignedRequest", () => {
  it("acepta una firma válida y devuelve el payload", () => {
    const sr = sign({ algorithm: "HMAC-SHA256", user_id: "123", issued_at: 1 });
    expect(parseSignedRequest(sr, SECRET)?.user_id).toBe("123");
  });

  it("rechaza una firma hecha con otro secreto", () => {
    const sr = sign({ algorithm: "HMAC-SHA256", user_id: "123" }, "otro");
    expect(parseSignedRequest(sr, SECRET)).toBeNull();
  });

  it("rechaza un payload manipulado", () => {
    const [sig] = sign({ algorithm: "HMAC-SHA256", user_id: "123" }).split(".");
    const forged = Buffer.from(
      JSON.stringify({ algorithm: "HMAC-SHA256", user_id: "999" })
    ).toString("base64url");
    expect(parseSignedRequest(`${sig}.${forged}`, SECRET)).toBeNull();
  });

  it("rechaza algoritmos distintos de HMAC-SHA256", () => {
    expect(parseSignedRequest(sign({ algorithm: "none", user_id: "1" }), SECRET)).toBeNull();
  });

  it("rechaza basura y formatos incompletos", () => {
    for (const bad of ["", "abc", "a.b.c", ".x", "x."]) {
      expect(parseSignedRequest(bad, SECRET)).toBeNull();
    }
  });
});
