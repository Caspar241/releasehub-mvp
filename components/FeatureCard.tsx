interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="feature-card group">
      <div className="icon mb-4">
        <span className="text-2xl text-accent">{icon}</span>
      </div>
      <h3 className="text-feature-md md:text-title text-text-primary font-semibold mb-3">{title}</h3>
      <p className="text-body-sm md:text-body text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}
