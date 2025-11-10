"use client";

import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

export default function AnalyzeExportsPage() {
  return (
    <div>
      <PageHeader
        title="Datenexporte"
        description="Export your analytics data in CSV, XLS, or PDF"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Analyze" },
          { label: "Exports" },
        ]}
      />

      <ComingSoon
        icon="FileDown"
        title="Data Exports Coming Soon"
        description="Download your complete analytics data in multiple formats, set up automated weekly digests, and integrate with your own tools."
        cta="Notify me"
        onCtaClick={() => alert("You'll be notified when this feature launches!")}
      />
    </div>
  );
}
