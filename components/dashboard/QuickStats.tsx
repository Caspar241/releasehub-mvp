'use client';

const stats = [
  { label: 'Aktive Releases', value: '12', change: '+2 dieser Monat', icon: '🎵' },
  { label: 'Gesamte Streams', value: '2.4M', change: '+12% vs. letzter Monat', icon: '▶️' },
  { label: 'Plattformen', value: '8', change: 'Alle verbunden', icon: '🌐' },
  { label: 'Einnahmen (Monat)', value: '€4,523', change: '+8% vs. letzter Monat', icon: '💰' },
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-card p-6 rounded-2xl transition-all duration-200 hover:border-accent/20 hover:shadow-glow cursor-pointer active:scale-[0.98]"
          style={{ transform: 'translateZ(0)', willChange: 'transform, border-color, box-shadow' }}
        >
          <div className="flex items-center justify-between">
            <div className="text-2xl transition-transform duration-200 hover:scale-110">
              {stat.icon}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
            <p className="text-sm text-text-secondary mt-1">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
