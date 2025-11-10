"use client";

import PageHeader from "@/components/common/PageHeader";
import ComingSoon from "@/components/common/ComingSoon";

export default function AnalyzeForecastPage() {
  return (
    <div>
      <PageHeader
        title="Trends & Forecasts"
        description="AI-powered predictions for 30/60/90 days"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Analyze" },
          { label: "Forecast" },
        ]}
      />

      <ComingSoon
        icon="TrendingUp"
        title="AI Forecasting Coming Soon"
        description="Get intelligent predictions about your release performance, growth trends, and revenue forecasts powered by machine learning."
        cta="Notify me"
        onCtaClick={() => alert("You'll be notified when this feature launches!")}
      />
    </div>
  );
}
