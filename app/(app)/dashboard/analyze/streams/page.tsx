"use client";

import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

export default function AnalyzeStreamsPage() {
  return (
    <div>
      <PageHeader
        title="Streams & Performance"
        description="Platform breakdown, daily charts, and top tracks"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Analyze" },
          { label: "Streams" },
        ]}
      />

      <ComingSoon
        icon="Waves"
        title="Streaming Analytics Coming Soon"
        description="Dive deep into your streaming performance across Spotify, Apple Music, and all platforms with detailed charts and insights."
        cta="Notify me"
        onCtaClick={() => alert("You'll be notified when this feature launches!")}
      />
    </div>
  );
}
