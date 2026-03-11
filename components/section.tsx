import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  as?: 'section' | 'div';
};

export function Section({ id, children, className = '', as: Tag = 'section' }: SectionProps) {
  return (
    <Tag
      id={id}
      className={`mx-auto max-w-5xl px-4 py-20 ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
