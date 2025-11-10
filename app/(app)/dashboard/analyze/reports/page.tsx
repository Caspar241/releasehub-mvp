"use client";

import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

export default function AnalyzeReportsPage() {
  return (
    <div>
      <PageHeader
        title="Einnahmen & Reports"
        description="Revenue analytics and royalty breakdowns"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Analyze" },
          { label: "Reports" },
        ]}
      />

      <ComingSoon
        icon="FileBarChart"
        title="Revenue Reports Coming Soon"
        description="Access detailed earnings reports, royalty breakdowns by platform and release, and comprehensive financial analytics."
        cta="Notify me"
        onCtaClick={() => alert("You'll be notified when this feature launches!")}
      />
    </div>
  );
}
