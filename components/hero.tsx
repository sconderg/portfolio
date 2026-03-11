'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { site } from '@/lib/site';
import { staggerContainer, staggerItem } from '@/lib/motion';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 sm:pt-0">
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={staggerItem}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-3 tracking-tight"
        >
          {site.name}
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="font-mono text-sm sm:text-base text-accent mb-1"
        >
          {site.role}
        </motion.p>
        {site.location && (
          <motion.p
            variants={staggerItem}
            className="text-muted-foreground text-sm mb-6"
          >
            {site.location}
          </motion.p>
        )}

        <motion.p
          variants={staggerItem}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {site.engineerStatement}
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
            <Link href="#work">View work</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-muted/50"
          >
            <a href={site.cvUrl}>
              <Download className="mr-2 h-4 w-4" />
              CV
            </a>
          </Button>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="flex gap-6 justify-center items-center"
        >
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#work"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to work"
      >
        <div className="w-5 h-8 border border-muted-foreground/50 rounded-full flex justify-center pt-1.5 hover:border-accent transition-colors">
          <div className="w-1 h-1.5 bg-muted-foreground/50 rounded-full" />
        </div>
      </motion.a>
    </section>
  );
}
