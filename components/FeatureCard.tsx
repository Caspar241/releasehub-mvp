interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <div className="icon mb-4">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
}
