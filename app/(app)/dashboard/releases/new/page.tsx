"use client";

import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

export default function NewReleasePage() {
  return (
    <div>
      <PageHeader
        title="+ Neues Release"
        description="Upload and distribute your music in 7 simple steps"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Releases", href: "/dashboard/releases" },
          { label: "New" },
        ]}
      />

      <ComingSoon
        icon="PlusCircle"
        title="Release Upload Wizard Coming Soon"
        description="A streamlined 7-step wizard to upload your music, artwork, metadata, and schedule distribution across all platforms with validation and auto-save."
        cta="Notify me"
        onCtaClick={() => alert("You'll be notified when this feature launches!")}
      />
    </div>
  );
}
