import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EarningsKpiTiles from '@/components/dashboard/earnings/EarningsKpiTiles';
import EarningsChart from '@/components/dashboard/earnings/EarningsChart';
import EarningsBreakdown from '@/components/dashboard/earnings/EarningsBreakdown';
import PayoutSection from '@/components/dashboard/earnings/PayoutSection';

export default function EarningsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-3">Einnahmen</h1>
          <p className="text-lg text-text-secondary/90">
            Überblick über deine Einnahmen, Auszahlungen und Statements.
          </p>
        </div>

        {/* KPI Tiles */}
        <EarningsKpiTiles />

        {/* Chart */}
        <EarningsChart />

        {/* Breakdown Tabs */}
        <EarningsBreakdown />

        {/* Payout Section */}
        <PayoutSection />
      </div>
    </DashboardLayout>
  );
}
