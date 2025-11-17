// Template System Types

export type TemplateType = "release" | "artist";

export type TaskCategory =
  | "strategy"
  | "audio"
  | "visuals"
  | "distribution"
  | "marketing"
  | "content"
  | "admin"
  | "analytics"
  | "branding"
  | "networking"
  | "other";

export type TaskStatus = "locked" | "active" | "completed";

export interface TemplateTask {
  id: string;
  title: string;
  description?: string;
  category?: TaskCategory;
  offsetDaysFromRelease?: number | null; // z.B. -56 = 8 Wochen vor Release
  status?: TaskStatus; // Für spätere Verwendung
}

export interface TemplatePhase {
  id: string;
  title: string;
  description?: string;
  order: number;
  tasks: TemplateTask[];
}

export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  description: string;
  durationWeeks?: number | null; // z.B. 8 für 8-Wochen-Plan
  phases: TemplatePhase[];
}

// Helper Type: Category Display Info
export interface CategoryInfo {
  label: string;
  color: string; // Tailwind class for badge
  icon?: string; // Optional Lucide icon name
}

// Category Color Mapping
export const CATEGORY_COLORS: Record<TaskCategory, string> = {
  strategy: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  audio: "bg-green-500/10 text-green-400 border-green-500/20",
  visuals: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  distribution: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  marketing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  content: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  admin: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  analytics: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  branding: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  networking: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  other: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

// Template Type Color Mapping
export const TEMPLATE_TYPE_COLORS: Record<TemplateType, string> = {
  release: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  artist: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

// Helper Functions
export function getCategoryColor(category?: TaskCategory): string {
  return category ? CATEGORY_COLORS[category] : CATEGORY_COLORS.other;
}

export function getTemplateTypeColor(type: TemplateType): string {
  return TEMPLATE_TYPE_COLORS[type];
}

export function formatOffsetDays(offsetDays?: number | null): string {
  if (offsetDays === undefined || offsetDays === null) {
    return "—";
  }

  const weeks = Math.abs(Math.floor(offsetDays / 7));
  const days = Math.abs(offsetDays % 7);

  if (offsetDays === 0) {
    return "Release Day";
  } else if (offsetDays < 0) {
    if (weeks > 0 && days === 0) {
      return `${weeks} Woche${weeks > 1 ? "n" : ""} vorher`;
    } else if (weeks > 0) {
      return `${weeks}W ${days}T vorher`;
    } else {
      return `${Math.abs(offsetDays)} Tag${Math.abs(offsetDays) > 1 ? "e" : ""} vorher`;
    }
  } else {
    if (weeks > 0 && days === 0) {
      return `${weeks} Woche${weeks > 1 ? "n" : ""} danach`;
    } else if (weeks > 0) {
      return `${weeks}W ${days}T danach`;
    } else {
      return `${offsetDays} Tag${offsetDays > 1 ? "e" : ""} danach`;
    }
  }
}
