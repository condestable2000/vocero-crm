import type { Metadata } from "next";
import { LegalDoc } from "@/components/public/public-shell";
import { LEGAL, legalDate } from "@/lib/legal";

export const metadata: Metadata = {
  title: { absolute: `Política de privacidad — ${LEGAL.productName}` },
  description: `Cómo ${LEGAL.productName} trata los datos personales, incluidos los de WhatsApp Business.`,
};

export default function PrivacyPage() {
  const mail = LEGAL.contactEmail;
  return (
    <LegalDoc title="Política de privacidad" updated={legalDate()}>
      <p>
        Esta política explica qué datos personales trata {LEGAL.productName}, para qué
        los usa y qué derechos tienes. {LEGAL.productName} es un CRM de WhatsApp que
        permite a una empresa gestionar sus conversaciones con clientes a través de su
        propia cuenta de WhatsApp Business, operado por {LEGAL.controllerName}.
      </p>

      <h2>1. Quién es el responsable</h2>
      <p>
        {LEGAL.controllerName} (NIF {LEGAL.taxId}, domicilio en {LEGAL.address}) es la
        responsable del tratamiento de los datos de las personas que crean una cuenta en{" "}
        {LEGAL.productName}. Respecto a los mensajes y contactos de los clientes finales
        de cada empresa usuaria, la empresa usuaria es la responsable y{" "}
        {LEGAL.controllerShort} actúa como encargada del tratamiento. Contacto de
        protección de datos: <a href={`mailto:${mail}`}>{mail}</a>.
      </p>

      <h2>2. Qué datos tratamos</h2>
      <ul>
        <li>
          <strong>Cuenta de usuario:</strong> nombre, correo electrónico y credenciales
          de acceso (la contraseña se almacena cifrada con hash).
        </li>
        <li>
          <strong>Conexión con WhatsApp Business:</strong> identificadores de la cuenta
          de WhatsApp Business (WABA ID), del número de teléfono (Phone Number ID), el
          número conectado, las plantillas de mensaje y el token de acceso que autoriza
          la conexión. El token se guarda cifrado en reposo y nunca se muestra al
          navegador ni se escribe en registros.
        </li>
        <li>
          <strong>Conversaciones:</strong> número de teléfono o identificador de WhatsApp
          del cliente, nombre de perfil, contenido de los mensajes, adjuntos, fecha y
          estado de entrega.
        </li>
        <li>
          <strong>Datos operativos:</strong> notas, etapas del embudo, citas y etiquetas
          que la empresa usuaria añade a sus contactos.
        </li>
      </ul>

      <h2>3. Para qué los usamos</h2>
      <ul>
        <li>Prestar el servicio: recibir, mostrar y enviar mensajes de WhatsApp.</li>
        <li>
          Enviar mensajes de plantilla aprobados por Meta (por ejemplo, recordatorios y
          avisos) a contactos que han dado su consentimiento a la empresa usuaria.
        </li>
        <li>Autenticar a los usuarios y mantener la seguridad de la plataforma.</li>
        <li>Atender solicitudes de soporte y de ejercicio de derechos.</li>
      </ul>
      <p>
        La base jurídica es la ejecución del contrato con la empresa usuaria, el
        consentimiento del cliente final recabado por dicha empresa y nuestro interés
        legítimo en la seguridad del servicio. No vendemos datos personales ni los usamos
        para publicidad propia.
      </p>

      <h2>4. Con quién los compartimos</h2>
      <ul>
        <li>
          <strong>Meta Platforms Ireland Ltd.</strong> a través de la API de WhatsApp
          Business Platform, imprescindible para enviar y recibir los mensajes. Su
          tratamiento se rige por la{" "}
          <a href="https://www.whatsapp.com/legal/business-policy" rel="noopener noreferrer">
            política de WhatsApp Business
          </a>{" "}
          y por la{" "}
          <a href="https://www.facebook.com/privacy/policy/" rel="noopener noreferrer">
            política de privacidad de Meta
          </a>
          .
        </li>
        <li>
          <strong>Proveedor de modelos de lenguaje</strong>, solo si la empresa usuaria
          activa el agente de IA: recibe el texto necesario para generar la respuesta.
        </li>
        <li>
          Autoridades, cuando exista una obligación legal.
        </li>
      </ul>
      <p>
        {LEGAL.productName} se aloja en infraestructura propia de {LEGAL.controllerName}{" "}
        en la Unión Europea.
      </p>

      <h2>5. Cuánto tiempo los conservamos</h2>
      <p>
        Conservamos los datos mientras la cuenta esté activa. Al desconectar WhatsApp
        eliminamos el token de acceso. Al cerrar la cuenta o atender una solicitud de
        eliminación, borramos los datos asociados en un máximo de {LEGAL.deletionDays}{" "}
        días, salvo los que debamos conservar por obligación legal.
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes ejercer los derechos de acceso, rectificación, supresión, oposición,
        limitación y portabilidad escribiendo a <a href={`mailto:${mail}`}>{mail}</a>. Para
        eliminar tus datos sigue las instrucciones de{" "}
        <a href="/data-deletion">Eliminación de datos</a>. Si consideras que tus derechos
        no se han atendido, puedes reclamar ante la Agencia Española de Protección de
        Datos (<a href="https://www.aepd.es" rel="noopener noreferrer">aepd.es</a>).
      </p>
      <p>
        Si eres cliente final de una empresa que usa {LEGAL.productName}, dirige primero
        tu solicitud a esa empresa; nosotros te ayudaremos a atenderla.
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos cifrado en tránsito (HTTPS), cifrado en reposo de credenciales y
        tokens, aislamiento de los datos por organización y control de acceso por rol.
      </p>

      <h2>8. Cambios en esta política</h2>
      <p>
        Publicaremos aquí cualquier cambio y actualizaremos la fecha de revisión. Si el
        cambio es relevante, avisaremos a los usuarios con cuenta.
      </p>
    </LegalDoc>
  );
}
