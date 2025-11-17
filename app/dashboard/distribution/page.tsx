import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DistributionChannels from '@/components/dashboard/DistributionChannels';

export default function DistributionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-3">Vertriebskanäle</h1>
          <p className="text-lg text-text-secondary/90">
            Verwalte deine Verbindungen zu Streaming-Plattformen.
          </p>
        </div>

        <DistributionChannels />
      </div>
    </DashboardLayout>
  );
}
