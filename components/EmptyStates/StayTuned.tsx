// components/EmptyStates/StayTuned.tsx
"use client";
import * as React from "react";
import { motion } from "framer-motion";

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
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduced(mq.matches);
      const cb = (e: MediaQueryListEvent) => setReduced(e.matches);
      mq.addEventListener?.("change", cb);
      return () => mq.removeEventListener?.("change", cb);
    }
  }, []);

  const container = (
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

      {/* Breathing Dot */}
      <motion.span
        aria-hidden
        className="mx-auto mb-6 block h-2 w-2 rounded-full bg-cyan-400/80"
        animate={reduced ? undefined : { opacity: [0.6, 1, 0.6], scale: [0.98, 1.04, 0.98] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
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
          className="rounded-full px-4 py-2 bg-cyan-500 text-neutral-950 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          {primaryCtaLabel}
        </button>
        <a
          href={secondaryHref}
          className="rounded-full px-4 py-2 bg-neutral-800/60 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/10"
        >
          {secondaryLabel}
        </a>
      </div>

      <div className="mt-4 text-center text-xs text-neutral-400 hover:text-neutral-300">
        <a href={tertiaryHref} className="underline decoration-transparent hover:decoration-inherit">
          {tertiaryLabel}
        </a>
      </div>

      {/* Optional: sehr dezenter Grain, falls /public/textures/grain.png existiert */}
      {/* <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('/textures/grain.png')" }} /> */}
    </div>
  );

  if (reduced) {
    return <div className="flex items-center justify-center h-full">{container}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex items-center justify-center h-full"
    >
      <motion.div
        animate={{ y: [0, -2, 0, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {container}
      </motion.div>
    </motion.div>
  );
}
