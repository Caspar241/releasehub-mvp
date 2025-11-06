import Link from 'next/link';

interface HeroProps {
  variant?: 'A' | 'B' | 'C';
}

export default function Hero({ variant = 'A' }: HeroProps) {
  const variants = {
    A: {
      title: (
        <>
          Dein Release-System. <br />
          Keine Labels. Keine Prozente. Keine Ausreden.
        </>
      ),
      description:
        'ReleaseHub ist das Operating System für Independent Artists. Struktur statt Chaos. Fairness statt Gatekeeper. 0% Rights Taken. 100% deine Musik.',
    },
    B: {
      title: (
        <>
          Release wie ein Profi. <br />
          Behalte alles.
        </>
      ),
      description:
        'Das erste Release-System, das Artists strukturiert, ohne einen einzigen Prozent ihrer Rechte zu nehmen. Europäisch. Fair. Gemacht für echte Arbeit.',
    },
    C: {
      title: (
        <>
          Schluss mit Spreadsheets, <br />
          Canva-Tabs und DM-Chaos.
        </>
      ),
      description:
        'ReleaseHub ersetzt 12 Tools durch ein System. Releases planen. Marketing strukturieren. Deadlines einhalten. Ohne Label. Ohne % Cuts. Ohne Bullshit.',
    },
  };

  const content = variants[variant];

  return (
    <section className="section-spacing bg-bg-primary">
      <div className="container-custom">
        <div className="max-w-hero mx-auto text-center scroll-reveal">
          <h1 className="mb-6">{content.title}</h1>
          <p className="text-body-lg text-text-secondary mb-8">{content.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-primary">
              Dein Abo wählen →
            </Link>
            <Link href="/resources" className="btn-secondary">
              Release-Checkliste downloaden
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
