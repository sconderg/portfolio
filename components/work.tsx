'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { projects, sectionIntros } from '@/lib/site';
import { sectionReveal, staggerContainer, staggerItem, viewport } from '@/lib/motion';

function CaseStudyBlock({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
        {label}
      </p>
      <div className="text-sm text-foreground/90 leading-relaxed">{children}</div>
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-1">
      {features.map((f) => (
        <li key={f} className="text-sm text-foreground/90 leading-relaxed flex items-start gap-2">
          <span className="text-accent mt-1 shrink-0">▸</span>
          {f}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({
  liveUrl,
  liveUrls,
  githubUrl,
  size = 'sm',
}: {
  liveUrl: string | null;
  liveUrls: { label: string; url: string }[] | null;
  githubUrl: string | null;
  size?: 'sm' | 'default';
}) {
  const hasLinks = liveUrl || liveUrls || githubUrl;
  if (!hasLinks) return null;

  return (
    <>
      {liveUrl && (
        <Button asChild size={size} variant="outline" className="border-border">
          <a href={liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
            View project
          </a>
        </Button>
      )}
      {liveUrls?.map(({ label, url }) => (
        <Button key={url} asChild size={size} variant="outline" className="border-border">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
            {label}
          </a>
        </Button>
      ))}
      {githubUrl && (
        <Button asChild size={size} variant="ghost" className="text-muted-foreground">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            Repo
          </a>
        </Button>
      )}
    </>
  );
}

export function Work() {
  const [featured, ...rest] = projects;

  return (
    <Section id="work" className="py-20">
      <motion.div {...sectionReveal}>
        <h2 className="text-2xl font-bold text-foreground mb-1">Work</h2>
        <p className="text-muted-foreground text-sm mb-12">{sectionIntros.work}</p>
      </motion.div>

      {/* Featured case study */}
      <motion.article
        className="rounded-lg border border-border bg-card/50 overflow-hidden mb-16 hover:border-border/80 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-video md:aspect-auto bg-muted/30 flex items-center justify-center min-h-[200px]">
            {featured.image ? (
              <>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
                {/* Overlay for contrast in both light and dark modes */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/30 to-transparent dark:from-card/90 dark:via-card/40 dark:to-card/10" />
                <div className="absolute inset-0 ring-1 ring-inset ring-border/20" />
              </>
            ) : (
              <span className="text-xs text-muted-foreground font-mono">Screenshot</span>
            )}
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">{featured.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {featured.description}
              </p>
              <div className="space-y-4">
                <CaseStudyBlock label="Role">{featured.role}</CaseStudyBlock>
                <CaseStudyBlock label="Architecture & Features">
                  <FeatureList features={featured.features} />
                </CaseStudyBlock>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-1 rounded border border-border bg-muted/30 text-foreground/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {featured.note && (
                <p className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground font-mono">
                  {featured.note}
                </p>
              )}
            </div>
            <div className="flex gap-3 mt-6 pt-6 border-t border-border">
              <ProjectLinks
                liveUrl={featured.liveUrl}
                liveUrls={featured.liveUrls}
                githubUrl={featured.githubUrl}
              />
            </div>
          </div>
        </div>
      </motion.article>

      {/* Other projects */}
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {rest.map((project, index) => (
          <motion.article
            key={index}
            variants={staggerItem}
            className="rounded-lg border border-border bg-card/30 p-6 hover:border-border/80 transition-colors flex flex-col"
          >
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <CaseStudyBlock label="Role">{project.role}</CaseStudyBlock>
              <CaseStudyBlock label="Key Features" className="mt-3">
                <FeatureList features={project.features} />
              </CaseStudyBlock>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5 rounded border border-border/50 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.note && (
                <p className="mt-3 text-xs text-muted-foreground font-mono">{project.note}</p>
              )}
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <ProjectLinks
                liveUrl={project.liveUrl}
                liveUrls={project.liveUrls}
                githubUrl={project.githubUrl}
              />
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
