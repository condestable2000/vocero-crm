import { getEnv } from "@/lib/env";
import { registerDeletionRequest } from "@/server/meta/data-deletion";
import { parseSignedRequest } from "@/server/meta/signed-request";

/**
 * Callback de eliminación de datos de Meta («URL de devolución de llamada»).
 * Meta hace POST con `signed_request` (form-urlencoded) cuando una persona
 * elimina la app desde su cuenta. Se valida la firma con el App Secret y se
 * responde `{ url, confirmation_code }`: Meta muestra esa URL al usuario.
 * Sin META_APP_SECRET no se puede verificar nada → 503 (nunca se acepta sin firma).
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const env = getEnv();
  if (!env.META_APP_SECRET) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let signedRequest: string | null = null;
  try {
    const form = await req.formData();
    const v = form.get("signed_request");
    signedRequest = typeof v === "string" ? v : null;
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  if (!signedRequest) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const payload = parseSignedRequest(signedRequest, env.META_APP_SECRET);
  if (!payload?.user_id) {
    return Response.json({ error: "invalid_signature" }, { status: 401 });
  }

  const code = await registerDeletionRequest(String(payload.user_id));
  const base = env.APP_BASE_URL.replace(/\/+$/, "");
  return Response.json({
    url: `${base}/data-deletion/status?code=${code}`,
    confirmation_code: code,
  });
}
