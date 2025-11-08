interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl transition-all duration-300 hover:border-accent/30 hover:shadow-glow group">
      <div className="text-accent mb-6 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl text-text-primary font-semibold mb-4 break-words">
        {title}
      </h3>
      <p className="text-body-sm md:text-body text-text-secondary leading-relaxed break-words">
        {description}
      </p>
    </div>
  );
}
