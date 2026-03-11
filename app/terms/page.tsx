import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata = {
  title: `Terms of Use | ${site.name}`,
  description: `Terms of use for ${site.name}'s portfolio.`,
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-accent hover:underline mb-8 inline-block"
        >
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-6">Terms of Use</h1>
        <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="prose max-w-none text-muted-foreground space-y-4">
          <p>
            This portfolio and its content are provided for informational purposes. You may view and share links to this site. Do not scrape, mirror, or use the content for commercial purposes without permission.
          </p>
          <p>
            Projects and descriptions are presented as-is. External links (e.g., to demos or repositories) may change or become unavailable.
          </p>
          <p>
            By using this site, you agree to these terms. For questions, use the contact information on the homepage.
          </p>
        </div>
      </div>
    </main>
  );
}
