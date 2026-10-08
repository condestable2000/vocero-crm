import { scheduleAgentTurn } from "@/server/ai/pipeline";
import { isAiConfiguredFor } from "@/lib/ai/provider";

/**
 * Punto de enganche del turno del agente tras la ingesta de un mensaje
 * entrante REAL (las conversaciones del Laboratorio invocan el pipeline
 * directamente, sin debounce).
 */
export async function maybeRunAgentTurn(
  conversationId: string,
  organizationId: string
): Promise<void> {
  if (!(await isAiConfiguredFor(organizationId))) return;
  scheduleAgentTurn(conversationId);
}
