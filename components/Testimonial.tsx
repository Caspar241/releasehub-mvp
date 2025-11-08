'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatarSrc?: string;
  rating?: number;
  className?: string;
}

export default function Testimonial({
  quote,
  author,
  role,
  avatarSrc,
  rating = 5,
  className = '',
}: TestimonialProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInUp}
      className={`glass-card p-8 shadow-e2 hover:shadow-e3 transition-all duration-300 ${className}`}
    >
      {/* Rating Stars */}
      {rating > 0 && (
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < rating ? 'text-accent' : 'text-border-strong'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="text-body text-text-secondary mb-6 leading-relaxed break-words">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        {avatarSrc ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border-strong">
            <Image
              src={avatarSrc}
              alt={author}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border-2 border-accent/30">
            <span className="text-accent font-semibold text-lg">
              {author.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div>
          <div className="text-text-primary font-semibold">{author}</div>
          <div className="text-body-sm text-text-muted">{role}</div>
        </div>
      </div>
    </motion.div>
  );
}
