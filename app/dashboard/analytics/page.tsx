import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts';
import TopPerformers from '@/components/dashboard/TopPerformers';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Verfolge die Performance deiner Releases.</p>
        </div>

        <AnalyticsCharts />
        <TopPerformers />
      </div>
    </DashboardLayout>
  );
}
