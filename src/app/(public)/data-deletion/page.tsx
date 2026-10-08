import type { Metadata } from "next";
import { LegalDoc } from "@/components/public/public-shell";
import { LEGAL, legalDate } from "@/lib/legal";

export const metadata: Metadata = {
  title: { absolute: `Eliminación de datos — ${LEGAL.productName}` },
  description: `Cómo solicitar la eliminación de tus datos en ${LEGAL.productName}.`,
};

export default function DataDeletionPage() {
  const mail = LEGAL.contactEmail;
  const subject = encodeURIComponent(`Solicitud de eliminación de datos — ${LEGAL.productName}`);
  return (
    <LegalDoc title="Eliminación de datos de usuario" updated={legalDate()}>
      <p>
        Puedes pedir en cualquier momento que eliminemos los datos que {LEGAL.productName}{" "}
        guarda sobre ti. Esta página explica cómo hacerlo y qué ocurre después.
      </p>

      <h2>Si eres una empresa usuaria</h2>
      <p>Para eliminar tu cuenta y tu conexión con WhatsApp:</p>
      <ol>
        <li>
          Inicia sesión y ve a <strong>Configuración → WhatsApp</strong> para desconectar
          tu cuenta de WhatsApp Business. Esto borra el token de acceso que guardamos.
        </li>
        <li>
          Si además quieres borrar la cuenta y todos sus datos (contactos,
          conversaciones, plantillas y ajustes), envíanos la solicitud por correo, como
          se indica más abajo.
        </li>
        <li>
          Si lo prefieres, también puedes revocar el acceso de la aplicación desde tu
          cuenta de Meta en <strong>Configuración del negocio → Integraciones →
          Aplicaciones</strong>.
        </li>
      </ol>

      <h2>Si eres un cliente final que escribió por WhatsApp</h2>
      <p>
        Tus mensajes están en el CRM de la empresa con la que hablaste. Puedes pedirle a
        esa empresa que borre tu conversación, o escribirnos a nosotros y gestionaremos
        la solicitud con ella.
      </p>

      <h2>Cómo enviar la solicitud</h2>
      <p>
        Escribe a <a href={`mailto:${mail}?subject=${subject}`}>{mail}</a> con el asunto
        «Solicitud de eliminación de datos» e indica:
      </p>
      <ul>
        <li>El correo con el que te registraste, o el número de WhatsApp del que se trata.</li>
        <li>Si quieres borrar toda la cuenta o solo determinadas conversaciones.</li>
      </ul>
      <p>
        Podemos pedirte que confirmes tu identidad antes de borrar nada, para evitar que
        otra persona elimine tus datos.
      </p>

      <h2>Qué sucede después</h2>
      <ul>
        <li>Confirmamos la recepción de tu solicitud.</li>
        <li>
          Eliminamos los datos en un máximo de {LEGAL.deletionDays} días y te lo
          comunicamos.
        </li>
        <li>
          Podemos conservar durante el tiempo legalmente exigido solo aquello que una
          norma nos obligue a guardar (por ejemplo, datos de facturación).
        </li>
        <li>
          Los datos que ya estén en WhatsApp o en Meta se rigen por sus propias
          políticas; puedes gestionarlos directamente con ellos.
        </li>
      </ul>

      <p>
        Más información sobre cómo tratamos los datos en nuestra{" "}
        <a href="/privacy">Política de privacidad</a>.
      </p>
    </LegalDoc>
  );
}
