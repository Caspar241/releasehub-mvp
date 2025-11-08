import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SettingsForm from '@/components/dashboard/SettingsForm';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-3">Einstellungen</h1>
          <p className="text-lg text-text-secondary/90">Verwalte dein Profil und deine Präferenzen.</p>
        </div>

        <SettingsForm />
      </div>
    </DashboardLayout>
  );
}
