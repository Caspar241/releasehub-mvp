import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ReleaseUploadForm from '@/components/dashboard/ReleaseUploadForm';

export default function UploadPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-3">Neuer Release</h1>
          <p className="text-lg text-text-secondary/90">
            Lade deine Musik hoch und verteile sie auf allen wichtigen Plattformen.
          </p>
        </div>

        <ReleaseUploadForm />
      </div>
    </DashboardLayout>
  );
}
