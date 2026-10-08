import type { Metadata } from "next";
import { LegalDoc } from "@/components/public/public-shell";
import { LEGAL } from "@/lib/legal";
import { getDeletionStatus } from "@/server/meta/data-deletion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: `Estado de tu solicitud — ${LEGAL.productName}` },
  robots: { index: false },
};

const fmt = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** Destino de la `url` que le devolvemos a Meta tras una solicitud de eliminación. */
export default async function DeletionStatusPage({
  searchParams,
}: Readonly<{ searchParams: Promise<{ code?: string }> }>) {
  const { code = "" } = await searchParams;
  const found = await getDeletionStatus(code).catch(() => null);

  return (
    <LegalDoc title="Estado de tu solicitud de eliminación" updated={fmt.format(new Date())}>
      {found ? (
        <>
          <p>
            Código de confirmación: <strong>{code}</strong>
          </p>
          <p>
            Recibida el {fmt.format(found.createdAt)}. Estado:{" "}
            <strong>{found.status === "completada" ? "completada" : "en curso"}</strong>.
          </p>
          {found.status !== "completada" && (
            <p>
              Eliminaremos tus datos en un máximo de {LEGAL.deletionDays} días desde la
              recepción. Si tienes dudas, escribe a{" "}
              <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a> indicando el
              código.
            </p>
          )}
        </>
      ) : (
        <p>
          No encontramos ninguna solicitud con ese código. Revisa que el enlace esté
          completo o escribe a <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>.
        </p>
      )}
    </LegalDoc>
  );
}
