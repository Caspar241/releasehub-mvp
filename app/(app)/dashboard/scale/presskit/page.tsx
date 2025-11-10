"use client";

import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

export default function PressKitPage() {
  return (
    <div>
      <PageHeader
        title="Press Kit Builder"
        description="Create professional electronic press kits (EPK)"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Scale" },
          { label: "Press Kit" },
        ]}
      />

      <ComingSoon
        icon="FileBadge"
        title="Press Kit Builder Coming Soon"
        description="Build stunning EPKs with your bio, photos, releases, media assets, and press quotes. Export as hosted web page or PDF."
        cta="Notify me"
        onCtaClick={() => alert("You'll be notified when this feature launches!")}
      />
    </div>
  );
}
