import type { Metadata } from "next";
import { LegalDoc } from "@/components/public/public-shell";
import { LEGAL, legalDate } from "@/lib/legal";

export const metadata: Metadata = {
  title: { absolute: `Condiciones del servicio — ${LEGAL.productName}` },
  description: `Condiciones de uso de ${LEGAL.productName}, el CRM de WhatsApp.`,
};

export default function TermsPage() {
  const mail = LEGAL.contactEmail;
  return (
    <LegalDoc title="Condiciones del servicio" updated={legalDate()}>
      <p>
        Estas condiciones regulan el uso de {LEGAL.productName}, un CRM de WhatsApp
        operado por {LEGAL.controllerName}. Al crear una cuenta o usar el servicio las
        aceptas.
      </p>

      <h2>1. El servicio</h2>
      <p>
        {LEGAL.productName} permite a una empresa conectar su propia cuenta de WhatsApp
        Business, gestionar conversaciones con sus clientes, enviar mensajes de plantilla
        aprobados y organizar contactos, embudo y citas. La empresa usuaria conecta su
        cuenta mediante el flujo oficial de Meta (Embedded Signup) y puede desconectarla
        en cualquier momento.
      </p>

      <h2>2. Tu cuenta</h2>
      <ul>
        <li>Debes aportar datos veraces y mantener la confidencialidad de tus credenciales.</li>
        <li>Eres responsable de la actividad realizada desde tu cuenta y de tu equipo.</li>
        <li>Debes tener capacidad y autoridad para obligar a la empresa que representas.</li>
      </ul>

      <h2>3. Uso aceptable y políticas de Meta</h2>
      <p>
        Al usar WhatsApp a través de {LEGAL.productName} te comprometes a cumplir los{" "}
        <a href="https://www.whatsapp.com/legal/business-terms" rel="noopener noreferrer">
          Términos de WhatsApp Business
        </a>
        , la{" "}
        <a href="https://www.whatsapp.com/legal/business-policy" rel="noopener noreferrer">
          Política de WhatsApp Business
        </a>{" "}
        y la{" "}
        <a href="https://business.whatsapp.com/policy" rel="noopener noreferrer">
          Política de mensajería
        </a>
        . En particular:
      </p>
      <ul>
        <li>
          Solo puedes enviar mensajes de iniciativa propia (plantillas) a personas que han
          dado su consentimiento previo, y debes poder acreditarlo.
        </li>
        <li>Debes respetar las bajas: si una persona pide no recibir más mensajes, dejas de escribirle.</li>
        <li>Prohibido el spam, el contenido ilegal, engañoso, fraudulento o que infrinja derechos de terceros.</li>
        <li>Prohibido enviar categorías de contenido que Meta restringe.</li>
      </ul>
      <p>
        Meta puede limitar o suspender tu número o tu cuenta; esas decisiones son
        ajenas a {LEGAL.controllerName}.
      </p>

      <h2>4. Datos y privacidad</h2>
      <p>
        El tratamiento de datos personales se describe en la{" "}
        <a href="/privacy">Política de privacidad</a>. Eres responsable de la licitud
        de los datos de tus clientes que incorporas al servicio.
      </p>

      <h2>5. Disponibilidad y cambios</h2>
      <p>
        Procuramos mantener el servicio disponible, pero no garantizamos un
        funcionamiento ininterrumpido: depende en parte de servicios de terceros como la
        API de WhatsApp Business. Podemos modificar o retirar funciones avisando con
        antelación razonable.
      </p>

      <h2>6. Limitación de responsabilidad</h2>
      <p>
        En la medida permitida por la ley, {LEGAL.controllerName} no responde de daños
        indirectos, pérdida de beneficios o interrupciones causadas por terceros. Nada en
        estas condiciones limita derechos que la ley reconozca como irrenunciables.
      </p>

      <h2>7. Terminación</h2>
      <p>
        Puedes cerrar tu cuenta en cualquier momento. Podemos suspenderla si incumples
        estas condiciones o las políticas de Meta. Al terminar, los datos se tratan según
        la <a href="/privacy">Política de privacidad</a>.
      </p>

      <h2>8. Ley aplicable y contacto</h2>
      <p>
        Estas condiciones se rigen por la ley española. Para cualquier duda escribe a{" "}
        <a href={`mailto:${mail}`}>{mail}</a>.
      </p>
    </LegalDoc>
  );
}
