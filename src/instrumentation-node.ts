import { eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import { mediaDirStatus } from "@/server/media-dir";

/**
 * 008 — Aviso al arranque si MEDIA_DIR no es escribible. Sin esto, el primer
 * síntoma era un 500 al subir el logo o el icono, o adjuntos entrantes "no
 * disponibles" (se reintentan al abrirlos, pero solo mientras Meta los
 * conserve), con el EACCES enterrado en el log de un request. Se prueba
 * escribiendo de verdad (lo mismo que hará saveMediaFile) y nunca tumba el
 * arranque: el resto del CRM funciona sin adjuntos.
 *
 * El sondeo vive en `server/media-dir.ts` y es el mismo que `/api/health`
 * expone como `mediaWritable` (#82): este resultado queda cacheado y el
 * healthcheck lo reutiliza en vez de volver a escribir.
 */
export async function checkMediaDir(): Promise<void> {
  const media = await mediaDirStatus();
  // Sin entorno válido no hay nada que sondear: lo reporta, con detalle, el
  // primer getEnv() de la app.
  if (!media || media.writable) return;
  console.error(
    `[boot] MEDIA_DIR=${media.dir} no es escribible (${media.code}): los adjuntos entrantes, el logo y el icono NO se van a poder guardar. ` +
      "En Docker: monta un volumen persistente en /data (la imagen ya usa /data/media) y arranca el contenedor como root —el default—, " +
      "que el entrypoint le da el volumen al usuario de la app. Fuera de Docker: apunta MEDIA_DIR a un directorio escribible."
  );
}

/**
 * Limpieza al arranque (FR-034): corridas del Laboratorio que quedaron
 * "running" tras un reinicio → fallidas. Solo corre en el runtime Node.
 */
export async function cleanupOrphanRuns(): Promise<void> {
  try {
    const db = getDb();
    const updated = await db
      .update(schema.agentTestRun)
      .set({
        status: "failed",
        error: "Interrumpida por un reinicio del servidor",
        finishedAt: new Date(),
      })
      .where(eq(schema.agentTestRun.status, "running"))
      .returning({ id: schema.agentTestRun.id });
    if (updated.length > 0) {
      console.log(
        `[boot] ${updated.length} corrida(s) del Laboratorio huérfana(s) marcada(s) como fallida(s)`
      );
    }
  } catch (err) {
    // La BD puede no estar lista aún (migraciones corren antes del server).
    console.error("[boot] limpieza de corridas huérfanas falló:", err);
  }
}
