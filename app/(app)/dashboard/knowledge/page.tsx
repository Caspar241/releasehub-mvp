"use client";

import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

export default function KnowledgeHubPage() {
  return (
    <div>
      <PageHeader
        title="Knowledge Hub"
        description="Guides, resources, and best practices for independent artists"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Knowledge Hub" },
        ]}
      />

      <ComingSoon
        icon="GraduationCap"
        title="Knowledge Hub Coming Soon"
        description="Access comprehensive guides, templates, best practices, glossary, and platform updates to help you succeed as an independent artist."
        cta="Notify me"
        onCtaClick={() => alert("You'll be notified when this feature launches!")}
      />
    </div>
  );
}
