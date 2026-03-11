'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { experiences, education, certifications, sectionIntros } from '@/lib/site';
import { sectionReveal, staggerContainer, staggerItem, viewport } from '@/lib/motion';

export function Experience() {
  return (
    <Section id="experience" className="py-20">
      <motion.div {...sectionReveal}>
        <h2 className="text-2xl font-bold text-foreground mb-1">Experience</h2>
        <p className="text-muted-foreground text-sm mb-12">{sectionIntros.experience}</p>
      </motion.div>

      <motion.div
        className="space-y-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="relative pl-6 border-l border-border"
          >
            <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
            <div className="rounded-lg border border-border bg-card/30 p-5 hover:border-border/80 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h3 className="text-base font-bold text-foreground">{exp.company}</h3>
                <span className="text-xs text-muted-foreground">{exp.period}</span>
              </div>
              <p className="font-mono text-xs text-accent mb-2">{exp.role}</p>
              {'location' in exp && exp.location && (
                <p className="text-xs text-muted-foreground mb-3">{exp.location}</p>
              )}
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">{exp.description}</p>
              {'highlights' in exp && exp.highlights && exp.highlights.length > 0 && (
                <ul className="list-disc list-inside space-y-0.5 text-xs text-foreground/70">
                  {exp.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-14"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h3 className="text-lg font-bold text-foreground mb-4">Education</h3>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-card/20 py-4 px-5"
            >
              <h4 className="text-sm font-bold text-foreground">{edu.degree}</h4>
              <p className="text-xs text-accent mt-0.5">{edu.institution}</p>
              <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-14"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h3 className="text-lg font-bold text-foreground mb-4">Certifications</h3>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert, index) => (
            <span
              key={index}
              className="font-mono text-xs px-3 py-1.5 rounded border border-border bg-muted/20 text-foreground/80"
            >
              {cert}
            </span>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
