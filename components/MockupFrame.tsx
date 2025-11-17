'use client';

import Image from 'next/image';

interface MockupFrameProps {
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  variant?: 'phone' | 'desktop' | 'tablet';
  floatAnimation?: boolean;
  children?: React.ReactNode;
}

export default function MockupFrame({
  imageSrc,
  imageAlt = 'App mockup',
  className = '',
  variant = 'phone',
  floatAnimation = true,
  children,
}: MockupFrameProps) {
  const variantStyles = {
    phone: 'aspect-[9/19] max-w-[280px] rounded-[32px] border-[8px]',
    desktop: 'aspect-[16/10] max-w-[600px] rounded-[16px] border-[6px]',
    tablet: 'aspect-[4/3] max-w-[400px] rounded-[24px] border-[8px]',
  };

  return (
    <div className={`relative ${variantStyles[variant]} border-surface-raised bg-surface-base shadow-3 overflow-hidden ${className}`}>
      {/* Screen Content */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 280px, 600px"
          />
        ) : children ? (
          <div className="w-full h-full flex items-center justify-center p-6">
            {children}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-text-muted text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-surface-raised flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-body-sm">Mockup Preview</p>
            </div>
          </div>
        )}
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/20 pointer-events-none" />

      {/* Notch for phone variant */}
      {variant === 'phone' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-surface-base rounded-b-2xl" />
      )}
    </div>
  );
}
