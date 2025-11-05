import Link from 'next/link';

interface PillarProps {
  number: string;
  title: string;
  subtitle: string;
  features: string[];
  conclusion: string;
}

function Pillar({ number, title, subtitle, features, conclusion }: PillarProps) {
  return (
    <div className="feature-card">
      <div className="text-6xl font-bold text-accent mb-4">{number}</div>
      <h3 className="text-3xl font-bold mb-2">{title}</h3>
      <p className="text-xl text-accent mb-6">{subtitle}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span className="text-text-primary">{feature}</span>
          </li>
        ))}
      </ul>
      <p className="text-text-secondary italic">→ {conclusion}</p>
    </div>
  );
}

export default function ThreePillars() {
  const pillars: PillarProps[] = [
    {
      number: '1️⃣',
      title: 'PLAN',
      subtitle: 'Von Chaos zu Struktur',
      features: [
        'Release-Templates für Singles, EPs, Alben',
        'Deadlines & Meilensteine (Produktion → Marketing → Launch)',
        'Asset-Checklisten (Cover, Bio, Pressefotos, Social-Content)',
        'Team-Collaboration (Producer, Designer, Manager im Loop)',
      ],
      conclusion: 'Du weißt immer, was als Nächstes kommt.',
    },
    {
      number: '2️⃣',
      title: 'RELEASE',
      subtitle: 'Distribution ohne % Cuts',
      features: [
        'Direktes Hochladen zu Distro-Partnern (Spotify, Apple, TikTok, Deezer...)',
        'Metadata-Management (ISRC, UPC, Credits, Lyrics)',
        'Split-Management (Kollaborationen, Features)',
        'Release-Tracking (wo live, wo pending)',
      ],
      conclusion: '0% Distribution-Fee. 0% Rights Taken. Nur dein Monats-Abo.',
    },
    {
      number: '3️⃣',
      title: 'GROW',
      subtitle: 'Marketing mit System',
      features: [
        'Promo-Kalender (Socials, Playlists, PR)',
        'EPK-Builder (Electronic Press Kit für Medien/Promoter)',
        'Smart Links (Bio-Link, Pre-Save, Release-Link)',
        'Analytics-Integration (Spotify for Artists, Apple Music, TikTok)',
      ],
      conclusion: 'Strategie statt Bauchgefühl.',
    },
  ];

  return (
    <section className="section-spacing bg-bg-secondary" id="features">
      <div className="container-custom">
        <h2 className="text-center mb-4">Wie ReleaseHub funktioniert</h2>
        <p className="text-body-lg text-text-secondary text-center max-w-2xl mx-auto mb-12">
          Drei Säulen. Ein System. Kein Chaos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, index) => (
            <Pillar key={index} {...pillar} />
          ))}
        </div>
        <div className="text-center">
          <Link href="/pricing" className="btn-primary">
            Jetzt Abo wählen →
          </Link>
        </div>
      </div>
    </section>
  );
}
