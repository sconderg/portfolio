import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
      <p className="text-muted-foreground mb-8">This page could not be found.</p>
      <Link
        href="/"
        className="text-accent hover:underline font-medium"
      >
        Back to home
      </Link>
    </main>
  );
}
