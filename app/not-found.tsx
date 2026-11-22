import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ivory px-6 text-center">
      <div>
        <p className="label">404</p>
        <h1 className="page-title mt-4">Страница не найдена</h1>
        <p className="mt-4 text-graphite">Page not found / Pagina non trovata</p>
        <Link href="/ru" className="button-primary mt-8">
          Flowers Boutique
        </Link>
      </div>
    </main>
  );
}
