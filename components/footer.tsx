

import Link from 'next/link';
import { footer } from '@/lib/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {footer.name}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href={footer.privacyUrl} className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href={footer.termsUrl} className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href={footer.sitemapUrl} className="hover:text-foreground transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
