import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata = {
    title: 'Blog — Amir Muhammad',
    description: 'Technical writing on frontend architecture, React, Next.js, and building production web applications.',
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <>
            <Header />
            <main className="min-h-screen bg-background bg-grid">
                <section className="mx-auto max-w-3xl px-4 py-20">
                    <h1 className="text-2xl font-bold text-foreground mb-1">Blog</h1>
                    <p className="text-muted-foreground text-sm mb-12">
                        Writing about frontend engineering, architecture, and lessons from production.
                    </p>

                    {posts.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No posts yet. Stay tuned.</p>
                    ) : (
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="block rounded-lg border border-border bg-card/30 p-6 hover:border-border/80 transition-colors group"
                                >
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mb-2">
                                        <time dateTime={post.date}>
                                            {new Date(post.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>
                                    </div>
                                    <h2 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                        {post.description}
                                    </p>
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
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
                <Footer />
            </main>
        </>
    );
}
