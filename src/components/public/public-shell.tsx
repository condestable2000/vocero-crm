import Link from "next/link";
import { LEGAL } from "@/lib/legal";

/**
 * Marco de las páginas públicas (sin sesión): cabecera con el nombre del
 * producto y pie con los enlaces legales que Meta exige visibles.
 */
export function PublicShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-bold tracking-[-0.02em]">
            {LEGAL.productName}
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-brand-hover"
          >
            Iniciar sesión
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">{children}</main>
      <footer className="border-t border-border bg-subtle">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {LEGAL.controllerName} · {LEGAL.productName}
          </span>
          <nav className="flex flex-wrap gap-4" aria-label="Legal">
            <Link href="/privacy" className="hover:text-foreground">
              Política de privacidad
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Condiciones del servicio
            </Link>
            <Link href="/data-deletion" className="hover:text-foreground">
              Eliminación de datos
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

/** Contenedor tipográfico de un texto legal. */
export function LegalDoc({
  title,
  updated,
  children,
}: Readonly<{ title: string; updated: string; children: React.ReactNode }>) {
  return (
    <article className="max-w-none space-y-4 text-[15px] leading-relaxed text-secondary-foreground [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_a]:text-brand-text [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6">
      <h1 className="text-3xl font-bold tracking-[-0.03em] text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground">Última actualización: {updated}</p>
      {children}
    </article>
  );
}
