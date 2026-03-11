import Link from 'next/link';
import { site } from '@/lib/site';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: `Sitemap | ${site.name}`,
  description: `Sitemap for ${site.name}'s portfolio.`,
};

export default function SitemapPage() {
  const posts = getAllPosts();

  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/#work', label: 'Projects' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#about', label: 'About' },
    { href: '/#engineering', label: 'Engineering' },
    { href: '/#contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
  ];

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-accent hover:underline mb-8 inline-block"
        >
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-8">Sitemap</h1>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-3">Pages</h2>
          <ul className="space-y-2">
            {mainLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-accent hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {posts.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Blog Posts</h2>
            <ul className="space-y-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="text-accent hover:underline">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
