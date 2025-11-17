// components/EmptyStates/StayTuned.tsx
"use client";
import * as React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  onPrimaryCtaClick?: () => void;
  secondaryHref?: string;
  secondaryLabel?: string;
  tertiaryHref?: string;
  tertiaryLabel?: string;
  className?: string;
};

export default function StayTuned({
  title = "Tasks werden bald freigeschaltet",
  subtitle = "Stay tuned – wir schalten die ersten Automations in Kürze frei.",
  primaryCtaLabel = "Benachrichtigen, wenn live",
  onPrimaryCtaClick,
  secondaryHref = "/dashboard",
  secondaryLabel = "Zurück zum Dashboard",
  tertiaryHref = "/features",
  tertiaryLabel = "Andere Funktionen ansehen",
  className,
}: Props) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className={`relative mx-auto w-full max-w-xl rounded-2xl bg-neutral-900/60 ring-1 ring-white/5 p-10 ${className ?? ""}`}>
        {/* Aurora Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "radial-gradient(120px 80px at 50% 18%, rgba(0,180,255,0.12), transparent 60%)",
          }}
        />

        {/* Static Dot (no animation) */}
        <span
          aria-hidden
          className="mx-auto mb-6 block h-2 w-2 rounded-full bg-cyan-400/80"
        />

        <h1 className="text-center text-2xl font-semibold tracking-wide text-white">
          {title}
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-300">
          {subtitle}
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onPrimaryCtaClick}
            className="rounded-full px-4 py-2 bg-cyan-500 text-neutral-950 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-colors"
          >
            {primaryCtaLabel}
          </button>
          <a
            href={secondaryHref}
            className="rounded-full px-4 py-2 bg-neutral-800/60 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/10 transition-colors"
          >
            {secondaryLabel}
          </a>
        </div>

        <div className="mt-4 text-center text-xs text-neutral-400 hover:text-neutral-300 transition-colors">
          <a href={tertiaryHref} className="underline decoration-transparent hover:decoration-inherit">
            {tertiaryLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
