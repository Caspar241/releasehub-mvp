'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  alignment = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignmentClasses = alignment === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`max-w-3xl ${alignmentClasses} ${className}`}
    >
      {eyebrow && (
        <motion.div variants={fadeInUp} className="mb-4">
          <span className="badge">{eyebrow}</span>
        </motion.div>
      )}

      <motion.h2
        variants={fadeInUp}
        className="text-3xl md:text-4xl lg:text-5xl text-text-primary font-bold mb-6"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeInUp}
          className="text-lead text-text-secondary leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
