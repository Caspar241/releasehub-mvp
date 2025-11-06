import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AllReleasesList from '@/components/dashboard/AllReleasesList';

export default function ReleasesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Alle Releases</h1>
          <p className="text-text-secondary mt-2">Verwalte all deine veröffentlichten Songs und Alben.</p>
        </div>

        <AllReleasesList />
      </div>
    </DashboardLayout>
  );
}
