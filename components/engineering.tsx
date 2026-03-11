'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { engineeringAreas, sectionIntros } from '@/lib/site';
import { sectionReveal, staggerContainer, staggerItem, viewport } from '@/lib/motion';

export function Engineering() {
  return (
    <Section id="engineering" className="py-20">
      <motion.div {...sectionReveal}>
        <h2 className="text-2xl font-bold text-foreground mb-1">Engineering</h2>
        <p className="text-muted-foreground text-sm mb-2">{sectionIntros.engineering}</p>
        <p className="text-sm text-muted-foreground/90 mb-12 font-mono">
          Systems that are fast, maintainable, and predictable.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {engineeringAreas.map((area, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="rounded-lg border border-border bg-card/30 p-6 hover:border-border/80 transition-colors"
          >
            <h3 className="text-lg font-bold text-foreground mb-2">{area.area}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {area.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {area.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-xs px-2 py-1 rounded border border-border/50 bg-muted/20 text-foreground/80"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
