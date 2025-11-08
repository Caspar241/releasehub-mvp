import Link from 'next/link';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  ctaText?: string;
  stripePriceId?: string;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  featured = false,
  ctaText = 'Jetzt starten',
  stripePriceId,
}: PricingCardProps) {
  return (
    <div className={`pricing-card ${featured ? 'pricing-card-featured' : ''}`}>
      {featured && (
        <span className="absolute top-4 right-4 badge">
          Beliebt
        </span>
      )}
      <h3 className="text-feature-md text-text-primary font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-section-lg md:text-section-xl text-text-primary font-bold">{price}</span>
        <span className="text-body text-text-muted">/Monat</span>
      </div>
      <p className="text-body text-text-secondary mb-6 leading-relaxed">{description}</p>
      <Link
        href={stripePriceId ? `/pricing?plan=${stripePriceId}` : '/pricing'}
        className={`w-full py-3.5 rounded-lg font-semibold text-center block transition-all duration-200 ${
          featured
            ? 'bg-accent text-text-inverse hover:bg-accent-hover hover:shadow-glow'
            : 'bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-text-inverse'
        }`}
      >
        {ctaText}
      </Link>
      <ul className="mt-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-body-sm md:text-body text-text-secondary">
            <span className="w-5 h-5 text-accent flex-shrink-0 mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
