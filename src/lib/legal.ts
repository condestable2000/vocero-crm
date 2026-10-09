/**
 * Datos del responsable y del producto que muestran las páginas públicas
 * (landing, privacidad, términos, eliminación de datos). Un solo sitio, para
 * que Meta, el usuario y el pie de página digan siempre lo mismo.
 */
export const LEGAL = {
  productName: "GreenIA",
  controllerName: "Green Valley Business, S.L.",
  /** Nombre corto para el texto corrido. */
  controllerShort: "Green Valley",
  taxId: "B97809818",
  address: "Calle Luis de Hoyos Sainz, 192, planta 3, puerta D, 28030 Madrid (España)",
  contactEmail: "rgpd@greenvalley.es",
  siteUrl: "https://crm.greenvalley.es",
  /** Fecha de la última revisión de los textos legales (ISO). */
  updatedAt: "2026-10-08",
  /** Plazo máximo para atender una solicitud de eliminación, en días. */
  deletionDays: 30,
} as const;

/** Fecha legible en español para el encabezado de cada texto legal. */
export function legalDate(): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${LEGAL.updatedAt}T00:00:00Z`));
}
