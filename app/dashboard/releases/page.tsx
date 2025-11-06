import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AllReleasesList from '@/components/dashboard/AllReleasesList';

export default function ReleasesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alle Releases</h1>
          <p className="text-gray-600 mt-2">Verwalte all deine veröffentlichten Songs und Alben.</p>
        </div>

        <AllReleasesList />
      </div>
    </DashboardLayout>
  );
}
