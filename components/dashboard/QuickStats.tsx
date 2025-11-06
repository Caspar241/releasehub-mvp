'use client';

const stats = [
  { label: 'Aktive Releases', value: '12', change: '+2 dieser Monat', icon: '🎵', color: 'bg-blue-50 text-blue-600' },
  { label: 'Gesamte Streams', value: '2.4M', change: '+12% vs. letzter Monat', icon: '▶️', color: 'bg-green-50 text-green-600' },
  { label: 'Plattformen', value: '8', change: 'Alle verbunden', icon: '🌐', color: 'bg-purple-50 text-purple-600' },
  { label: 'Einnahmen (Monat)', value: '€4,523', change: '+8% vs. letzter Monat', icon: '💰', color: 'bg-yellow-50 text-yellow-600' },
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
