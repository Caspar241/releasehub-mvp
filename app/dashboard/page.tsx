'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ReleaseOverview from '@/components/dashboard/ReleaseOverview';
import QuickStats from '@/components/dashboard/QuickStats';
import AlertsSection from '@/components/dashboard/AlertsSection';
import TasksPlaceholder from '@/components/dashboard/TasksPlaceholder';
import DashboardQuickActions from '@/components/dashboard/DashboardQuickActions';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activePanel = searchParams?.get('panel');

  const handleClosePanel = () => {
    router.replace('/dashboard', { scroll: false });
  };

  // Panel configurations
  const panelConfig: Record<string, { featureName: string }> = {
    tasks: { featureName: 'Tasks' },
    calendar: { featureName: 'Calendar' },
    roadmap: { featureName: 'Roadmap' },
    'smart-links': { featureName: 'Smart Links' },
    campaigns: { featureName: 'Campaign Builder' },
    playlists: { featureName: 'Playlist Outreach' },
    forecasting: { featureName: 'Release Forecasting' },
    insights: { featureName: 'Audience Insights' },
    revenue: { featureName: 'Revenue Analytics' },
  };

  const currentPanelConfig = activePanel ? panelConfig[activePanel] : null;

  return (
    <DashboardLayout>
        {currentPanelConfig ? (
          <TasksPlaceholder
            key={`${activePanel}-panel`}
            featureName={currentPanelConfig.featureName}
            isPanel={true}
            onClose={handleClosePanel}
          />
        ) : (
          <div key="dashboard-content" className="space-y-6">
            {/* Page Title & Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary">Dashboard</h1>
              <DashboardQuickActions />
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
        )}
    </DashboardLayout>
  );
}
