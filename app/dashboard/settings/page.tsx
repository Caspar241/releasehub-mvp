import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SettingsForm from '@/components/dashboard/SettingsForm';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Einstellungen</h1>
          <p className="text-text-secondary mt-2">Verwalte dein Profil und deine Präferenzen.</p>
        </div>

        <SettingsForm />
      </div>
    </DashboardLayout>
  );
}
