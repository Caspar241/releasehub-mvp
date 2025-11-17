'use client';

import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  category?: string;
  imageUrl?: string;
  href: string;
  readTime?: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  author,
  category,
  imageUrl,
  href,
  readTime,
}: BlogCardProps) {
  return (
    <div>
      <Link href={href}>
        <article
          className="group glass-card rounded-xl overflow-hidden h-full transition-all duration-300 hover:shadow-e3"
        >
          {/* Image */}
          {imageUrl && (
            <div className="relative w-full h-48 bg-surface-raised overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {category && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="badge bg-accent text-text-inverse">
                    {category}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Meta */}
            <div className="flex items-center gap-3 text-body-sm text-text-muted mb-3">
              <time dateTime={date}>{date}</time>
              {readTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-text-muted" />
                  <span>{readTime}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="text-title text-text-primary mb-3 group-hover:text-accent transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-body-sm text-text-secondary mb-4 line-clamp-2">
              {excerpt}
            </p>

            {/* Footer */}
            {author && (
              <div className="flex items-center gap-2 text-body-sm text-text-muted">
                <div className="w-6 h-6 rounded-full bg-accent-subtle flex items-center justify-center text-caption text-accent font-semibold">
                  {author.charAt(0)}
                </div>
                <span>{author}</span>
              </div>
            )}

            {/* Read More Link */}
            <div className="mt-4 flex items-center gap-2 text-accent font-semibold text-body-sm group-hover:gap-3 transition-all">
              <span>Read more</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
