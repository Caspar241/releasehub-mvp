"use client";

import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

export default function SmartLinksPage() {
  return (
    <div>
      <PageHeader
        title="Smart Links & Presaves"
        description="Create beautiful landing pages and presave campaigns"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Scale" },
          { label: "Links" },
        ]}
      />

      <ComingSoon
        icon="Link2"
        title="Smart Links Builder Coming Soon"
        description="Build customizable landing pages with platform links, presave campaigns with countdown timers, and track every click with detailed analytics."
        cta="Notify me"
        onCtaClick={() => alert("You'll be notified when this feature launches!")}
      />
    </div>
  );
}
