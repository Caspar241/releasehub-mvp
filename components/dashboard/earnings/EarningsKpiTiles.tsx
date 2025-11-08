'use client';

interface KpiTileProps {
  value: string;
  label: string;
  helpText: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  icon: string;
}

function KpiTile({ value, label, helpText, trend, icon }: KpiTileProps) {
  return (
    <div className="glass-card p-6 rounded-2xl transition-all duration-200 hover:border-accent/20 hover:shadow-glow cursor-pointer active:scale-[0.98]"
      title={helpText}
      style={{ transform: 'translateZ(0)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="icon text-3xl transition-transform duration-200 hover:scale-110">{icon}</div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">{label}</p>
        <p className="text-4xl md:text-5xl font-bold text-text-primary mb-2">{value}</p>
        {trend && (
          <p className={`text-sm ${
            trend.direction === 'up' ? 'text-accent' :
            trend.direction === 'down' ? 'text-text-secondary' :
            'text-text-secondary'
          }`}>
            {trend.direction === 'up' && '↗ '}
            {trend.direction === 'down' && '↘ '}
            {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}

export default function EarningsKpiTiles() {
  const kpis = [
    {
      value: '€2,450.00',
      label: 'Verfügbar',
      helpText: 'Betrag, der zur Auszahlung bereit ist',
      trend: { value: '+12% vs. letzter Monat', direction: 'up' as const },
      icon: '💰',
    },
    {
      value: '€1,820.00',
      label: 'Ausstehend',
      helpText: 'In Verarbeitung bei Stores',
      trend: { value: '+8% vs. letzter Monat', direction: 'up' as const },
      icon: '⏳',
    },
    {
      value: '€3,200.00',
      label: 'Prognose (30 Tage)',
      helpText: 'Geschätzte Einnahmen basierend auf aktuellem Trend',
      trend: { value: 'Basierend auf letzten 90 Tagen', direction: 'neutral' as const },
      icon: '📈',
    },
    {
      value: '€18,500.00',
      label: 'Ausgezahlt (YTD)',
      helpText: 'Summe aller Auszahlungen dieses Jahr',
      trend: { value: 'Jan–Nov 2025', direction: 'neutral' as const },
      icon: '✓',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <KpiTile key={index} {...kpi} />
      ))}
    </div>
  );
}
