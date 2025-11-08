import { Suspense } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ReleaseOverview from '@/components/dashboard/ReleaseOverview';
import QuickStats from '@/components/dashboard/QuickStats';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-3">Dashboard</h1>
          <p className="text-lg text-text-secondary/90">Willkommen zurück! Hier ist deine Release-Übersicht.</p>
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
