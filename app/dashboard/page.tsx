import { Suspense } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ReleaseOverview from '@/components/dashboard/ReleaseOverview';
import QuickStats from '@/components/dashboard/QuickStats';
import AlertsSection from '@/components/dashboard/AlertsSection';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Title - Smaller, matches sidebar */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">Dashboard</h1>
        </div>

        {/* Quick Stats KPIs - KEY METRICS AT TOP */}
        <Suspense fallback={<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-5 rounded-xl animate-pulse h-32" />
          ))}
        </div>}>
          <QuickStats />
        </Suspense>

        {/* Alerts & Tasks Section */}
        <Suspense fallback={<div className="glass-card p-6 rounded-2xl animate-pulse h-40" />}>
          <AlertsSection />
        </Suspense>

        {/* Release Overview */}
        <Suspense fallback={<div className="glass-card p-8 rounded-2xl animate-pulse h-96" />}>
          <ReleaseOverview />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
