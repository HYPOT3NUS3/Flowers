import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ivory px-6 text-center">
      <div>
        <p className="label">404</p>
        <h1 className="serif mt-4 text-6xl">Page not found</h1>
        <Link href="/ru" className="button-primary mt-8">
          MUZA
        </Link>
      </div>
    </main>
  );
}
