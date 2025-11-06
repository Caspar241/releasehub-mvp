'use client';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
  stripePriceId: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '29,99 €',
    description: 'Für Solo-Artists, 1–4 Releases pro Jahr',
    stripePriceId: 'basic',
    features: [
      { text: '1 Artist Workspace', included: true },
      { text: '4 Releases/Jahr', included: true },
      { text: 'Smartlinks inklusive', included: true },
      { text: 'Starter-Templates', included: true },
      { text: 'Basis-Analytics', included: true },
      { text: 'Standard-Support (48h)', included: true },
      { text: 'Upload-Gebühren: Single 9€ / EP 14€ / Album 19€', included: false },
    ],
  },
  {
    name: 'Premium',
    price: '79,99 €',
    description: 'Für aktive Artists, Manager & DIY-Labels',
    stripePriceId: 'premium',
    highlighted: true,
    features: [
      { text: 'Unbegrenzte Releases (0€ Upload)', included: true },
      { text: 'Bis zu 3 Artists', included: true },
      { text: '3 Team-Member', included: true },
      { text: 'EPK-Builder', included: true },
      { text: 'Full Analytics (alle Plattformen)', included: true },
      { text: 'Premium-Templates & Custom Blocks', included: true },
      { text: 'Priority-Support (<24h) + Onboarding-Call', included: true },
    ],
  },
  {
    name: 'Label',
    price: '129,99 €',
    description: 'Für Labels, Studios & Multi-Artist-Teams',
    stripePriceId: 'label',
    features: [
      { text: 'Unbegrenzte Artists', included: true },
      { text: '10 Team-Member + Rollen', included: true },
      { text: 'Unbegrenzte Releases (0€ Upload)', included: true },
      { text: 'Label-Analytics & Royalty-Reporting', included: true },
      { text: 'White-Label EPK & Domains', included: true },
      { text: 'API-Zugriff', included: true },
      { text: 'Account Manager + Onboarding-Call', included: true },
    ],
  },
];

export default function PricingCards() {
  const handleSelectPlan = async (stripePriceId: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: stripePriceId }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <section className="section-spacing bg-bg-secondary">
      <div className="container-custom scroll-reveal">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Pricing</h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Wähle den Plan, der zu deinen Zielen passt. Kein Free-Plan, kein Bullshit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl p-8 ${
                plan.highlighted
                  ? 'ring-2 ring-accent shadow-2xl scale-105'
                  : 'border border-border-light shadow-lg'
              }`}
            >
              {/* Header */}
              <div className="mb-8">
                {plan.highlighted && (
                  <div className="inline-block bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    Beliebt
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-3">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-text-secondary ml-2">/ Monat</span>
                </div>
                <p className="text-text-secondary text-sm">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      className={`text-lg mt-0.5 flex-shrink-0 ${
                        feature.included ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {feature.included ? '✔' : '✖'}
                    </span>
                    <span
                      className={`text-sm leading-relaxed ${
                        feature.included ? 'text-text-primary' : 'text-text-secondary'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleSelectPlan(plan.stripePriceId)}
                className={`w-full py-3 rounded-full font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-primary text-white hover:bg-primary-hover hover:-translate-y-0.5'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                Plan wählen
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
