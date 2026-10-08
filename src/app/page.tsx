import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LEGAL } from "@/lib/legal";
import { Landing } from "@/components/public/landing";
import { PublicShell } from "@/components/public/public-shell";
import { getSessionOrNull } from "@/lib/auth/session";
import { guideFirst } from "@/server/onboarding/guide";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: `${LEGAL.productName} — CRM de WhatsApp` },
};

/**
 * La raíz decide a dónde se entra (issue #86): mientras falte un paso de la
 * guía de inicio o el agente siga apagado, a `/onboarding`; con todo listo,
 * a la Bandeja como siempre. Sin sesión se muestra la landing pública (Meta y
 * cualquier visitante la ven sin iniciar sesión).
 */
export default async function Home() {
  const session = await getSessionOrNull();
  if (!session) {
    return (
      <PublicShell>
        <Landing />
      </PublicShell>
    );
  }
  if (await guideFirst(session)) redirect("/onboarding");
  redirect("/inbox");
}
