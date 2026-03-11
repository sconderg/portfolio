/**
 * Site content and links — edit this file to personalize your portfolio.
 */

export const site = {
  name: 'Amir Muhammad',
  role: 'Frontend Engineer (React / Next.js)',
  tagline:
    'Frontend Engineer with 4+ years of experience building production web applications using React, Next.js, TypeScript, and modern JavaScript.',
  engineerStatement:
    'I care about performance, architecture, and building interfaces that scale. I enjoy building products where frontend engineering shapes the experience, not just the UI.',
  location: 'Egypt',
  email: 'ameermohamed2500@gmail.com',
  phone: '+20 109 946 1559',
  github: 'https://github.com/sconderg',
  linkedin: 'https://www.linkedin.com/in/sconder/',
  cvUrl: '/cv.pdf',
} as const;

export const about = {
  paragraphs: [
    'I build production web applications with React, Next.js, and TypeScript. I focus on scalable UI systems, clear API boundaries, and interfaces that stay fast as they grow.',
    'Most of my work is owning frontend features end-to-end: from architecture and implementation to shipping and iteration. I care about maintainability, performance, and how the code holds up over time.',
  ],
  developerNote: 'Systems that are fast, maintainable, and predictable.',
} as const;

export const experiences = [
  {
    company: 'Jomla.ae',
    role: 'Frontend Engineer',
    location: 'Remote',
    period: 'Nov 2021 – Feb 2026',
    description:
      'Built and maintained frontend architecture for an e-commerce platform, with a focus on video features, performance, and internal tooling.',
    highlights: [
      'Built a TikTok-style reels video feature for an e-commerce platform',
      'Implemented frontend architecture for video feed performance',
      'Integrated BunnyCDN for media delivery',
      'Built automation pipeline to import Instagram reels',
      'Developed internal dashboards for content and operations',
      'Optimized multiple production pages',
    ],
  },
  {
    company: 'SkilledCV',
    role: 'Frontend Engineer',
    location: 'Remote',
    period: 'Jul 2025 – Nov 2025',
    description:
      'Led frontend development of a resume builder SaaS, managing architecture decisions and mentoring junior engineers.',
    highlights: [
      'Led frontend development of a resume builder SaaS using Next.js and Zustand',
      'Managed and mentored a frontend intern',
      'Designed reusable component architecture and application state structure',
      'Built dynamic CV templates and export logic',
      'Collaborated cross-functionally with tech leadership on frontend architecture decisions',
    ],
  },
] as const;

export const education = [
  {
    degree: "Bachelor's Degree in Computer Science",
    institution: 'Thebes Academy',
    period: 'Expected Graduation: 2026',
  },
] as const;

export const certifications = [
  'Google Developer Student Clubs Core Team',
  'Coursera React Development',
  'Udacity Full Stack Track',
  'Jest and Cypress Testing Course',
] as const;

export const engineeringAreas = [
  {
    area: 'Frontend Architecture',
    description: 'Component structure, state, and patterns that scale with the product.',
    tools: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Hooks', 'Context API'],
  },
  {
    area: 'UI Systems',
    description: 'Consistent, responsive interfaces and design-system thinking.',
    tools: ['HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    area: 'Performance & Tooling',
    description: 'Fast loads, smooth interactions, and reliable pipelines.',
    tools: ['Git', 'Docker', 'GitHub Actions', 'Jest', 'Cypress'],
  },
  {
    area: 'Integrations & APIs',
    description: 'Connecting frontend to services and third-party APIs.',
    tools: ['REST APIs', 'Redis', 'Odoo', 'WPGraphQL', 'BunnyCDN', 'Tap Payments', 'Apple Pay'],
  },
] as const;

/** Case-study shape: one list drives both featured (first) and grid (rest). */
export const projects: {
  title: string;
  description: string;
  role: string;
  features: string[];
  tags: string[];
  liveUrl: string | null;
  liveUrls: { label: string; url: string }[] | null;
  githubUrl: string | null;
  image: string | null;
  note?: string;
}[] = [
    {
      title: 'Bik Industries Platform',
      description:
        'A full order management platform for a clothing manufacturer — covering everything from client intake to production tracking and delivery.',
      role: 'Designed and implemented the entire frontend system.',
      features: [
        'Client dashboard for tracking order progress',
        'Admin panel for factory staff to manage orders',
        'Order stage tracking with status transitions',
        'Notes and communication system between clients and staff',
        'Image uploads for production progress updates',
        'Budget, quantities, deadlines, and product configuration',
      ],
      tags: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
      liveUrl: 'https://www.bik-industries.com',
      liveUrls: null,
      githubUrl: null,
      image: "/bik-screenshot.png",
      note: 'Sole frontend engineer — owned architecture, UI, and client-facing features end-to-end.',
    },
    {
      title: 'Jomla Headless Blog',
      description:
        'A headless CMS architecture using WordPress as a content backend and Next.js as the frontend, delivering fast, SEO-friendly blog pages.',
      role: 'Built the frontend and integrated GraphQL APIs.',
      features: [
        'Headless WordPress architecture with decoupled frontend',
        'Content fetching via WPGraphQL',
        'Optimized rendering and caching for blog pages',
        'SEO-friendly markup and metadata',
      ],
      tags: ['Next.js', 'WordPress', 'GraphQL', 'WPGraphQL'],
      liveUrl: 'https://blog.jomla.ae',
      liveUrls: null,
      githubUrl: null,
      image: null,
    },
    {
      title: 'Static Product Catalogs — iFlat & Taktik',
      description:
        'Static product catalog websites powered by automated data pipelines that rebuild weekly with zero manual effort.',
      role: 'Built the frontend architecture and automation workflows.',
      features: [
        'Product data fetched from an external API',
        'GitHub Actions pipeline that rebuilds the site weekly',
        'Automated product updates every Sunday',
        'Fast static site generation with Astro',
      ],
      tags: ['Astro', 'GitHub Actions', 'API Integration'],
      liveUrl: null,
      liveUrls: [
        { label: 'iFlat', url: 'https://getiflat.com' },
        { label: 'Taktik', url: 'https://gotaktik.com' },
      ],
      githubUrl: null,
      image: null,
    },
    {
      title: 'Alshabah — Wholesale Supplier Website',
      description:
        'A WordPress-based website for a wholesale product supplier in KSA, featuring a customized theme with responsive layouts and performance optimizations.',
      role: 'Implemented and customized the WordPress theme and layouts.',
      features: [
        'Responsive product-focused layout',
        'Custom WordPress theme development',
        'Performance optimizations for page load',
      ],
      tags: ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://alshabah.com.sa',
      liveUrls: null,
      githubUrl: null,
      image: null,
    },
  ];

/** First project is featured. */
export const featuredProject = projects[0];

export const sectionIntros = {
  work: 'Things I\'ve shipped.',
  experience: 'Where I\'ve built.',
  about: 'How I work.',
  engineering: 'Areas I focus on.',
  contact: 'Get in touch.',
} as const;

export const contactCopy = 'I\'m open to product-minded frontend work and interesting problems. Reach out via email or LinkedIn.';

export const footer = {
  name: site.name,
  privacyUrl: '/privacy',
  termsUrl: '/terms',
  sitemapUrl: '/site-map',
} as const;

/** Nav links and section ids — single source of truth. */
export const navLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#about', label: 'About' },
  { href: '/#engineering', label: 'Engineering' },
  { href: '/#contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
] as const;
