import { Suspense } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ReleaseOverview from '@/components/dashboard/ReleaseOverview';
import QuickStats from '@/components/dashboard/QuickStats';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-2">Willkommen zurück! Hier ist deine Release-Übersicht.</p>
        </div>

        {/* Quick Stats */}
        <Suspense fallback={<div>Loading stats...</div>}>
          <QuickStats />
        </Suspense>

        {/* Release Overview */}
        <Suspense fallback={<div>Loading releases...</div>}>
          <ReleaseOverview />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
