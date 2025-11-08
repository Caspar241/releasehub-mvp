import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts';
import TopPerformers from '@/components/dashboard/TopPerformers';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-3">Analytics</h1>
          <p className="text-lg text-text-secondary/90">Verfolge die Performance deiner Releases.</p>
        </div>

        <AnalyticsCharts />
        <TopPerformers />
      </div>
    </DashboardLayout>
  );
}
