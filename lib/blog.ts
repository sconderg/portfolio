import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { codeToHtml } from 'shiki';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PostMeta = {
    title: string;
    description: string;
    date: string;
    tags: string[];
    slug: string;
};

export type Post = PostMeta & {
    content: string; // rendered HTML
    readingTime: string; // e.g. "4 min read"
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const REQUIRED_FIELDS: (keyof PostMeta)[] = ['title', 'description', 'date', 'tags', 'slug'];

function validateFrontmatter(data: Record<string, unknown>, filename: string): PostMeta {
    for (const field of REQUIRED_FIELDS) {
        if (data[field] === undefined || data[field] === null || data[field] === '') {
            throw new Error(
                `Missing required frontmatter field "${field}" in ${filename}. All fields are required: ${REQUIRED_FIELDS.join(', ')}.`
            );
        }
    }

    if (!Array.isArray(data.tags)) {
        throw new Error(`"tags" must be an array in ${filename}.`);
    }

    return {
        title: String(data.title),
        description: String(data.description),
        date: String(data.date),
        tags: data.tags as string[],
        slug: String(data.slug),
    };
}

function calculateReadingTime(text: string): string {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
}

/**
 * Replaces <pre><code class="language-xxx">...</code></pre> blocks
 * with shiki-highlighted HTML.
 */
async function highlightCodeBlocks(html: string): Promise<string> {
    const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
    const matches = [...html.matchAll(codeBlockRegex)];

    if (matches.length === 0) return html;

    let result = html;
    for (const match of matches) {
        const [fullMatch, lang, encodedCode] = match;
        // Decode HTML entities back to raw code
        const rawCode = encodedCode
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&#x3C;/gi, '<')
            .replace(/&#x3E;/gi, '>')
            .replace(/&#x27;/gi, "'")
            .trim();

        try {
            const highlighted = await codeToHtml(rawCode, {
                lang,
                themes: {
                    light: 'github-light',
                    dark: 'github-dark',
                },
                defaultColor: false,
            });
            result = result.replace(fullMatch, highlighted);
        } catch {
            // If language isn't supported, leave block as-is
        }
    }

    return result;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns sorted metadata for all posts (latest first). */
export function getAllPosts(): PostMeta[] {
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

    const posts = files.map((filename) => {
        const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8');
        const { data } = matter(raw);
        return validateFrontmatter(data, filename);
    });

    return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/** Returns full post data including syntax-highlighted HTML. */
export async function getPostBySlug(slug: string): Promise<Post> {
    const filepath = path.join(CONTENT_DIR, `${slug}.md`);

    if (!fs.existsSync(filepath)) {
        throw new Error(`Post not found: ${slug}`);
    }

    const raw = fs.readFileSync(filepath, 'utf-8');
    const { data, content: markdownBody } = matter(raw);
    const meta = validateFrontmatter(data, `${slug}.md`);

    // Markdown → HTML via remark + rehype
    const result = await remark()
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(markdownBody);

    // Post-process: syntax-highlight code blocks with shiki
    const contentHtml = await highlightCodeBlocks(result.toString());

    return {
        ...meta,
        content: contentHtml,
        readingTime: calculateReadingTime(markdownBody),
    };
}

/** Returns all slugs for static generation. */
export function getAllSlugs(): string[] {
    return fs
        .readdirSync(CONTENT_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.replace(/\.md$/, ''));
}

