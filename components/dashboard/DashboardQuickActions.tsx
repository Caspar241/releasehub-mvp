"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: keyof typeof LucideIcons;
  href: string;
  variant: "primary" | "secondary" | "ghost";
}

const quickActions: QuickAction[] = [
  {
    id: "new-release",
    label: "+ New Release",
    icon: "PlusCircle",
    href: "/dashboard/releases/new",
    variant: "primary",
  },
  {
    id: "new-campaign",
    label: "+ Campaign",
    icon: "Megaphone",
    href: "/dashboard/scale/campaigns",
    variant: "secondary",
  },
  {
    id: "new-smart-link",
    label: "+ Smart Link",
    icon: "Link2",
    href: "/dashboard/scale/links",
    variant: "secondary",
  },
  {
    id: "new-task",
    label: "+ Task",
    icon: "CheckSquare",
    href: "/dashboard/plan/tasks",
    variant: "ghost",
  },
];

export default function DashboardQuickActions() {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {quickActions.map((action) => {
        const Icon = LucideIcons[action.icon] as React.ComponentType<{
          size?: number;
          strokeWidth?: number;
          className?: string;
        }>;

        const variantStyles = {
          primary:
            "bg-accent hover:bg-accent-hover text-white shadow-soft hover:shadow-card",
          secondary:
            "bg-surface-overlay hover:bg-surface-overlay/80 text-text-primary border border-border hover:border-accent/50",
          ghost:
            "bg-transparent hover:bg-surface-overlay/40 text-text-secondary hover:text-accent border border-border/50 hover:border-accent/30",
        };

        return (
          <Link
            key={action.id}
            href={action.href}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${variantStyles[action.variant]}`}
          >
            {Icon && <Icon size={18} strokeWidth={2} />}
            {action.label}
          </Link>
        );
      })}
    </div>
  );
}
