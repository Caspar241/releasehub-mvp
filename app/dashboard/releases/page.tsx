import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AllReleasesList from '@/components/dashboard/AllReleasesList';

export default function ReleasesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-3">Alle Releases</h1>
          <p className="text-lg text-text-secondary/90">Verwalte all deine veröffentlichten Songs und Alben.</p>
        </div>

        <AllReleasesList />
      </div>
    </DashboardLayout>
  );
}
