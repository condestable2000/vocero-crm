import { customAlphabet } from "nanoid";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import { newId } from "@/lib/db/ids";

const codeAlphabet = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);

/** Forma válida de un código: lo que acepta la página de estado. */
export const DELETION_CODE_RE = /^del_[0-9a-z]{16}$/;

/**
 * Registra una solicitud de eliminación de datos que llegó de Meta y devuelve
 * su código de confirmación. Idempotente: si ese usuario de Meta ya tiene una
 * solicitud abierta (Meta reintenta), se devuelve la misma.
 */
export async function registerDeletionRequest(
  metaUserId: string
): Promise<string> {
  const db = getDb();
  const { dataDeletionRequest: t } = schema;
  const code = `del_${codeAlphabet()}`;

  await db
    .insert(t)
    .values({
      id: newId("dataDeletion"),
      confirmationCode: code,
      metaUserId,
    })
    .onConflictDoNothing();

  // Si ya había una abierta, el insert no hizo nada: devolvemos la existente.
  const rows = await db
    .select({
      code: t.confirmationCode,
      status: t.status,
    })
    .from(t)
    .where(eq(t.metaUserId, metaUserId));
  const open = rows.find((r) => r.status === "recibida");
  return open?.code ?? code;
}

export type DeletionStatus = { status: string; createdAt: Date };

/** Estado de una solicitud por su código; `null` si no existe. */
export async function getDeletionStatus(
  code: string
): Promise<DeletionStatus | null> {
  if (!DELETION_CODE_RE.test(code)) return null;
  const { dataDeletionRequest: t } = schema;
  const [row] = await getDb()
    .select({ status: t.status, createdAt: t.createdAt })
    .from(t)
    .where(eq(t.confirmationCode, code))
    .limit(1);
  return row ?? null;
}
