"use client";

import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

export default function WorkflowsPage() {
  return (
    <div>
      <PageHeader
        title="Vorlagen & Workflows"
        description="Reusable process templates that generate tasks automatically"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Planung" },
          { label: "Workflows" },
        ]}
      />

      <ComingSoon
        icon="Workflow"
        title="Workflow Templates Coming Soon"
        description="Create reusable templates for releases, campaigns, and content workflows. Apply them to automatically generate task checklists with smart scheduling."
        cta="Notify me"
        onCtaClick={() => alert("You'll be notified when this feature launches!")}
      />
    </div>
  );
}
