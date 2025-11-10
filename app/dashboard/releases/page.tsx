import Link from 'next/link';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AllReleasesList from '@/components/dashboard/AllReleasesList';
import PageHeader from '@/components/common/PageHeader';
import * as LucideIcons from 'lucide-react';

export default function ReleasesPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Meine Releases"
        description="Verwalte all deine veröffentlichten Songs und Alben"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Releases' },
        ]}
        actions={
          <Link
            href="/dashboard/releases/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all duration-200 shadow-soft hover:shadow-card"
          >
            <LucideIcons.PlusCircle size={18} strokeWidth={2} />
            + Neues Release
          </Link>
        }
      />

      <AllReleasesList />
    </DashboardLayout>
  );
}
