import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ReleaseUploadForm from '@/components/dashboard/ReleaseUploadForm';

export default function UploadPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Neuer Release</h1>
          <p className="text-gray-600 mt-2">
            Lade deine Musik hoch und verteile sie auf allen wichtigen Plattformen.
          </p>
        </div>

        <ReleaseUploadForm />
      </div>
    </DashboardLayout>
  );
}
