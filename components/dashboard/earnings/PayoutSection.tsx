'use client';

export default function PayoutSection() {
  const available = 2450;
  const threshold = 100;
  const reachedThreshold = available >= threshold;

  // Mock payout history
  const payoutHistory = [
    { id: 1, status: 'paid', date: '01.11.2025', amount: 1200, method: 'PayPal' },
    { id: 2, status: 'paid', date: '01.10.2025', amount: 1450, method: 'PayPal' },
    { id: 3, status: 'processing', date: '25.10.2025', amount: 980, method: 'PayPal' },
    { id: 4, status: 'failed', date: '15.09.2025', amount: 550, method: 'Bank' },
  ];

  // Mock statements
  const statements = [
    { period: 'Oktober 2025', gross: 3500, net: 3150, url: '/statements/2025-10.pdf' },
    { period: 'September 2025', gross: 2980, net: 2682, url: '/statements/2025-09.pdf' },
    { period: 'August 2025', gross: 4200, net: 3780, url: '/statements/2025-08.pdf' },
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      paid: { label: '✓ Ausgezahlt', className: 'bg-accent text-white' },
      processing: { label: '⏳ In Bearbeitung', className: 'bg-bg-secondary text-accent' },
      failed: { label: '❌ Fehlgeschlagen', className: 'bg-bg-secondary text-text-secondary' },
    };
    const { label, className } = config[status as keyof typeof config] || config.paid;
    return <span className={`badge ${className}`}>{label}</span>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Payout Request Card */}
      <div className="feature-card">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Nächste Auszahlung</h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary">Verfügbar:</span>
            <span className="text-lg font-bold text-text-primary">€{available.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-text-secondary">Schwelle:</span>
            <span className="text-sm text-text-secondary">€{threshold.toLocaleString()}.00</span>
          </div>
        </div>

        {reachedThreshold ? (
          <>
            <div className="flex items-center gap-2 mb-6 p-3 bg-accent bg-opacity-10 rounded-button">
              <span className="text-accent text-lg">✓</span>
              <span className="text-sm font-medium text-accent">Schwelle erreicht</span>
            </div>
            <button className="btn-primary w-full mb-4">
              Auszahlung anfordern →
            </button>
          </>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-accent text-lg">⏳</span>
                <span className="text-sm font-medium text-text-secondary">
                  Noch €{(threshold - available).toLocaleString()}.00 bis zur Auszahlung
                </span>
              </div>
              <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${(available / threshold) * 100}%` }}
                />
              </div>
            </div>
            <button className="btn-primary w-full mb-4 disabled:bg-text-secondary disabled:cursor-not-allowed" disabled>
              Auszahlung anfordern
            </button>
          </>
        )}

        <div className="text-sm text-text-secondary space-y-1">
          <p>Auszahlungsmethode: <span className="text-text-primary">PayPal (***@email.com)</span></p>
          <p>Geschätzte Bearbeitungszeit: <span className="text-text-primary">5-7 Werktage</span></p>
        </div>
      </div>

      {/* Payout History */}
      <div className="feature-card">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Auszahlungs-Historie</h2>

        <div className="space-y-3">
          {payoutHistory.map((payout) => (
            <div key={payout.id} className="flex items-center justify-between p-3 border border-border-light rounded-button hover:bg-bg-secondary transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(payout.status)}
                </div>
                <p className="text-sm text-text-secondary">{payout.date} · {payout.method}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-text-primary">€{payout.amount.toLocaleString()}.00</p>
                <button className="text-xs text-accent hover:underline">
                  {payout.status === 'paid' ? 'Details' : payout.status === 'processing' ? 'Tracking' : 'Neu versuchen'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-secondary w-full mt-4 text-sm">
          Alle Auszahlungen anzeigen →
        </button>
      </div>

      {/* Statements */}
      <div className="feature-card lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Statements</h2>
          <button className="btn-secondary text-sm">
            Alle Statements (CSV) ↓
          </button>
        </div>

        <div className="space-y-3">
          {statements.map((statement, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-border-light rounded-button hover:shadow-card-hover transition-all">
              <div className="flex-1">
                <p className="font-medium text-text-primary">{statement.period}</p>
                <p className="text-sm text-text-secondary mt-1">
                  €{statement.gross.toLocaleString()} brutto · €{statement.net.toLocaleString()} netto
                </p>
              </div>
              <button className="btn-accent text-sm">
                ↓ PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
