"use client";

import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

export default function AnalyzeOverviewPage() {
  return (
    <div>
      <PageHeader
        title="Überblick & Statistiken"
        description="KPI overview across all your releases"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Analyze" },
          { label: "Überblick" },
        ]}
      />

      <ComingSoon
        icon="ChartPie"
        title="Analytics Overview Coming Soon"
        description="Get a comprehensive overview of your streaming performance, revenue, and audience metrics all in one place."
        cta="Notify me"
        onCtaClick={() => alert("You'll be notified when this feature launches!")}
      />
    </div>
  );
}
