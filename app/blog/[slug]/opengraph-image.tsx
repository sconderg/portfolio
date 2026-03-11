import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'nodejs';
export const alt = 'Blog post preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let title = 'Blog Post';
    let tags: string[] = [];

    try {
        const post = await getPostBySlug(slug);
        title = post.title;
        tags = post.tags;
    } catch {
        // fallback to defaults
    }

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '60px 80px',
                    background: 'linear-gradient(145deg, #0a0a0b 0%, #111214 50%, #0d1117 100%)',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                {/* Top branding */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '40px',
                    }}
                >
                    <span style={{ color: '#f5f5f5', fontSize: 28, fontWeight: 700 }}>
                        Amir
                    </span>
                    <span style={{ color: '#0d9488', fontSize: 28, fontWeight: 700 }}>
                        .
                    </span>
                    <span
                        style={{
                            color: '#6b7280',
                            fontSize: 18,
                            marginLeft: 16,
                            fontWeight: 400,
                        }}
                    >
                        Blog
                    </span>
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontSize: 52,
                        fontWeight: 700,
                        color: '#f5f5f5',
                        lineHeight: 1.2,
                        margin: 0,
                        marginBottom: '30px',
                        maxWidth: '900px',
                    }}
                >
                    {title}
                </h1>

                {/* Tags */}
                {tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    fontSize: 16,
                                    color: '#0d9488',
                                    border: '1px solid #1f2937',
                                    borderRadius: '6px',
                                    padding: '4px 12px',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Bottom accent line */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #0d9488, #06b6d4)',
                    }}
                />
            </div>
        ),
        { ...size }
    );
}
