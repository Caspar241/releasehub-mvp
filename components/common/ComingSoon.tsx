import * as LucideIcons from "lucide-react";

interface ComingSoonProps {
  icon?: keyof typeof LucideIcons;
  title: string;
  description?: string;
  cta?: string;
  onCtaClick?: () => void;
}

export default function ComingSoon({
  icon = "Sparkles",
  title,
  description,
  cta,
  onCtaClick,
}: ComingSoonProps) {
  const Icon = LucideIcons[icon] as React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md px-6">
        {/* Icon */}
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20">
          {Icon && <Icon className="text-accent" size={32} strokeWidth={2} />}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-text-primary mb-3">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-text-secondary mb-6 leading-relaxed">
            {description}
          </p>
        )}

        {/* CTA Button */}
        {cta && onCtaClick && (
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all duration-200 shadow-soft hover:shadow-card"
          >
            <LucideIcons.Bell size={18} strokeWidth={2} />
            {cta}
          </button>
        )}
      </div>
    </div>
  );
}
