'use client';

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
    <div className={`max-w-3xl ${alignmentClasses} ${className}`}>
      {eyebrow && (
        <div className="mb-4">
          <span className="badge">{eyebrow}</span>
        </div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary font-bold mb-6">
        {title}
      </h2>

      {description && (
        <p className="text-lead text-text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
