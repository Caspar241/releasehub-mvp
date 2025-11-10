"use client";

import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

export default function SupportPage() {
  return (
    <div>
      <PageHeader
        title="Support & Hilfe"
        description="Get help, submit tickets, and check system status"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Support" },
        ]}
      />

      <ComingSoon
        icon="LifeBuoy"
        title="Support Center Coming Soon"
        description="Browse FAQs, submit support tickets, check system status, and provide feedback to help us improve ReleaseHub."
        cta="Notify me"
        onCtaClick={() => alert("You'll be notified when this feature launches!")}
      />
    </div>
  );
}
