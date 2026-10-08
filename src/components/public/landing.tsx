import Link from "next/link";
import { LEGAL } from "@/lib/legal";

const FEATURES = [
  {
    title: "Conecta tu propio WhatsApp Business",
    body: "Vincula tu número con el flujo oficial de Meta. Los mensajes salen de tu cuenta, no de la nuestra.",
  },
  {
    title: "Bandeja compartida en tiempo real",
    body: "Todo el equipo atiende las conversaciones desde un único lugar, con notas, etiquetas y embudo.",
  },
  {
    title: "Plantillas aprobadas por Meta",
    body: "Consulta las plantillas de tu cuenta y envía recordatorios y avisos a clientes que han dado su consentimiento.",
  },
  {
    title: "Agente de IA opcional",
    body: "Un asistente que responde fuera de horario y pasa la conversación a una persona cuando hace falta.",
  },
];

/** Landing pública: lo que ve quien llega a la raíz sin sesión (y Meta). */
export function Landing() {
  return (
    <div className="space-y-12">
      <section className="space-y-4 pt-4">
        <h1 className="text-4xl font-bold leading-tight tracking-[-0.03em]">
          {LEGAL.productName}, el CRM de WhatsApp para tu negocio
        </h1>
        <p className="max-w-2xl text-lg text-secondary-foreground">
          Atiende a tus clientes, envía recordatorios con plantillas aprobadas y
          organiza tus ventas desde tu propio número de WhatsApp Business.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/login"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-hover"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="rounded-md border border-border-strong px-4 py-2 text-sm font-medium hover:bg-subtle"
          >
            Crear cuenta
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-lg border border-border bg-subtle p-5">
            <h2 className="font-bold">{f.title}</h2>
            <p className="mt-1 text-sm text-secondary-foreground">{f.body}</p>
          </div>
        ))}
      </section>

      <section className="space-y-2 text-sm text-secondary-foreground">
        <h2 className="text-lg font-bold text-foreground">Tus datos, bajo tu control</h2>
        <p>
          {LEGAL.productName} solo envía mensajes de iniciativa propia a personas que
          han dado su consentimiento, y puedes desconectar tu cuenta o pedir la
          eliminación de tus datos en cualquier momento. Consulta nuestra{" "}
          <Link href="/privacy" className="text-brand-text underline">
            política de privacidad
          </Link>
          , las{" "}
          <Link href="/terms" className="text-brand-text underline">
            condiciones del servicio
          </Link>{" "}
          y cómo{" "}
          <Link href="/data-deletion" className="text-brand-text underline">
            eliminar tus datos
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
