import { createHmac } from "node:crypto";
import { safeEqual } from "@/server/inbox/webhook";

/**
 * Verificación del `signed_request` que Meta envía a las URLs de devolución de
 * llamada (eliminación de datos, desautorización). Formato:
 * `base64url(firma).base64url(payload)`, con firma HMAC-SHA256 del payload
 * (la parte codificada tal cual) usando el App Secret.
 * Módulo puro (sin BD) para testearlo unitariamente.
 */

export type SignedRequestPayload = {
  user_id?: string;
  algorithm?: string;
  issued_at?: number;
  [key: string]: unknown;
};

/** Devuelve el payload si la firma es válida; `null` en cualquier otro caso. */
export function parseSignedRequest(
  signedRequest: string,
  appSecret: string
): SignedRequestPayload | null {
  const parts = signedRequest.split(".");
  if (parts.length !== 2) return null;
  const [encodedSig, encodedPayload] = parts as [string, string];
  if (!encodedSig || !encodedPayload) return null;

  const expected = createHmac("sha256", appSecret)
    .update(encodedPayload)
    .digest("base64url");
  // Meta puede enviar la firma con relleno `=`; el base64url de Node no lo lleva.
  if (!safeEqual(encodedSig.replace(/=+$/, ""), expected)) return null;

  try {
    const payload: unknown = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    );
    if (!payload || typeof payload !== "object") return null;
    const p = payload as SignedRequestPayload;
    if (p.algorithm && String(p.algorithm).toUpperCase() !== "HMAC-SHA256") {
      return null;
    }
    return p;
  } catch {
    return null;
  }
}
