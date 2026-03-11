'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { site, sectionIntros, contactCopy } from '@/lib/site';
import { sectionReveal, viewport } from '@/lib/motion';

export function Contact() {
  return (
    <Section id="contact" className="py-20">
      <motion.div {...sectionReveal}>
        <h2 className="text-2xl font-bold text-foreground mb-1">Contact</h2>
        <p className="text-muted-foreground text-sm mb-4">{sectionIntros.contact}</p>
        <p className="text-foreground/80 text-sm max-w-md mb-10">{contactCopy}</p>
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center gap-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
        >
          <Mail size={18} />
          {site.email}
        </a>
        {'phone' in site && site.phone && (
          <a
            href={`tel:${site.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
          >
            <Phone size={18} />
            {site.phone}
          </a>
        )}
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <Github size={18} />
          GitHub
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
          LinkedIn
        </a>
      </motion.div>
    </Section>
  );
}
