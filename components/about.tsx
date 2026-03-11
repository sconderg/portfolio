'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { about, sectionIntros } from '@/lib/site';
import { sectionReveal, viewport } from '@/lib/motion';

export function About() {
  return (
    <Section id="about" className="py-20">
      <motion.div {...sectionReveal}>
        <h2 className="text-2xl font-bold text-foreground mb-1">About</h2>
        <p className="text-muted-foreground text-sm mb-8">{sectionIntros.about}</p>
      </motion.div>

      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="space-y-5">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-foreground/90 leading-relaxed text-sm sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
        {about.developerNote && (
          <blockquote className="mt-8 pl-4 border-l-2 border-border font-mono text-sm text-muted-foreground">
            {about.developerNote}
          </blockquote>
        )}
      </motion.div>
    </Section>
  );
}
