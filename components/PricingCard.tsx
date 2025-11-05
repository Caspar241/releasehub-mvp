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
        <div className="mb-4">
          <span className="badge">Beliebtester Plan</span>
        </div>
      )}
      <h3 className="text-3xl font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-5xl font-bold">{price}</span>
        <span className="text-text-secondary">/Monat</span>
      </div>
      <p className="text-text-secondary mb-6">{description}</p>
      <Link
        href={stripePriceId ? `/pricing?plan=${stripePriceId}` : '/pricing'}
        className={featured ? 'btn-primary w-full block text-center' : 'btn-secondary w-full block text-center'}
      >
        {ctaText}
      </Link>
      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-accent mt-1">✓</span>
            <span className="text-text-primary">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
