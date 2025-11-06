import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EarningsKpiTiles from '@/components/dashboard/earnings/EarningsKpiTiles';
import EarningsChart from '@/components/dashboard/earnings/EarningsChart';
import EarningsBreakdown from '@/components/dashboard/earnings/EarningsBreakdown';
import PayoutSection from '@/components/dashboard/earnings/PayoutSection';

export default function EarningsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Einnahmen</h1>
          <p className="text-text-secondary mt-2">
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
