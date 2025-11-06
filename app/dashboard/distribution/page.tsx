import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributionChannels from '@/components/dashboard/DistributionChannels';

export default function DistributionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Vertriebskanäle</h1>
          <p className="text-text-secondary mt-2">
            Verwalte deine Verbindungen zu Streaming-Plattformen.
          </p>
        </div>

        <DistributionChannels />
      </div>
    </DashboardLayout>
  );
}
