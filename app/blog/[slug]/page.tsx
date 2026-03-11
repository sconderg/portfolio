import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ReadingProgress } from '@/components/reading-progress';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const post = await getPostBySlug(slug);
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amirmuhammad.dev';
        const url = `${siteUrl}/blog/${slug}`;
        return {
            title: `${post.title} — Amir Muhammad`,
            description: post.description,
            openGraph: {
                title: post.title,
                description: post.description,
                type: 'article',
                publishedTime: post.date,
                url,
                authors: ['Amir Muhammad'],
                tags: post.tags,
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.description,
            },
        };
    } catch {
        return {
            title: 'Post Not Found',
        };
    }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let post;
    try {
        post = await getPostBySlug(slug);
    } catch {
        notFound();
    }

    // JSON-LD structured data for Article
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: {
            '@type': 'Person',
            name: 'Amir Muhammad',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://amirmuhammad.dev',
        },
        publisher: {
            '@type': 'Person',
            name: 'Amir Muhammad',
        },
        keywords: post.tags,
        wordCount: post.readingTime.replace(/\D/g, '') ? parseInt(post.readingTime) * 200 : undefined,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ReadingProgress />
            <Header />
            <main className="min-h-screen bg-background bg-grid">
                <article className="mx-auto max-w-3xl px-4 py-20">
                    {/* Back link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 font-mono"
                    >
                        <ArrowLeft size={14} />
                        Back to blog
                    </Link>

                    {/* Header */}
                    <header className="mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono mb-4">
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                            <span>·</span>
                            <span>{post.readingTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="font-mono text-xs px-2 py-0.5 rounded border border-border/50 text-muted-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Article content */}
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
                <Footer />
            </main>
        </>
    );
}

