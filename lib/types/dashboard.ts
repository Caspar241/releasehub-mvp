// Dashboard Type Definitions
// Centralized types for all dashboard components

// ========================================
// DATE RANGE TYPES
// ========================================

export type DateRangeOption = '7d' | '30d' | '90d' | 'ytd';

export interface DateRange {
  option: DateRangeOption;
  label: string;
  startDate: Date;
  endDate: Date;
}

// ========================================
// KPI TYPES
// ========================================

export interface SparklineDataPoint {
  date: string;
  value: number;
}

export interface KpiDelta {
  value: number; // Percentage change (e.g., 12.5 for +12.5%)
  trend: 'positive' | 'negative' | 'neutral';
}

export interface KpiMetric {
  id: string;
  title: string;
  value: string | number;
  delta?: KpiDelta;
  sparklineData?: SparklineDataPoint[];
  href?: string;
  infoTooltip?: string;
  icon?: string;
  loading?: boolean;
}

// ========================================
// TASK TYPES
// ========================================

export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'snoozed' | 'dismissed';
export type TaskCategory = 'release' | 'marketing' | 'distribution' | 'analytics' | 'general';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory;
  dueDate?: Date | string;
  releaseId?: string;
  releaseName?: string;
  createdAt: Date | string;
  completedAt?: Date | string;
  snoozedUntil?: Date | string;
}

export interface TaskGroup {
  releaseId: string;
  releaseName: string;
  coverArt?: string;
  tasks: Task[];
  progress: {
    completed: number;
    total: number;
  };
}

export type SnoozeOption = 'tonight' | '3days' | '1week' | 'custom';

export interface SnoozeConfig {
  option: SnoozeOption;
  label: string;
  hours: number;
}

// ========================================
// RELEASE TYPES
// ========================================

export type ReleaseStatus = 'draft' | 'scheduled' | 'processing' | 'live' | 'failed';
export type HealthCriterion = 'artwork' | 'master' | 'presave' | 'pitch' | 'budget' | 'campaign';

export interface HealthCriteriaStatus {
  artwork: boolean;
  master: boolean;
  presave: boolean;
  pitch: boolean;
  budget: boolean;
  campaign: boolean;
}

export interface ReleaseHealthScore {
  score: number; // 0-100
  criteria: HealthCriteriaStatus;
  lastUpdated: Date | string;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  url?: string;
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  coverArt?: string;
  releaseDate: Date | string;
  status: ReleaseStatus;
  platforms: Platform[];
  healthScore?: ReleaseHealthScore;
  streams?: number;
  earnings?: number;
}

// ========================================
// COMMAND PALETTE TYPES
// ========================================

export interface CommandAction {
  id: string;
  label: string;
  description?: string;
  icon: string; // Emoji or icon identifier
  href?: string;
  action?: () => void;
  keywords?: string[]; // For search
  section: string; // Group name
  shortcut?: string; // e.g., "⌘N"
}

// ========================================
// HELPER TYPES
// ========================================

export interface LoadingState {
  isLoading: boolean;
  error?: Error | null;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// ========================================
// MOCK DATA HELPERS
// ========================================

export const HEALTH_CRITERIA_LABELS: Record<HealthCriterion, string> = {
  artwork: 'Cover Artwork',
  master: 'Master Upload',
  presave: 'Pre-Save Campaign',
  pitch: 'Playlist Pitch',
  budget: 'Marketing Budget',
  campaign: 'Campaign Setup',
};

export const SNOOZE_OPTIONS: SnoozeConfig[] = [
  { option: 'tonight', label: 'Heute Abend (18:00)', hours: 6 },
  { option: '3days', label: '+3 Tage', hours: 72 },
  { option: '1week', label: '+1 Woche', hours: 168 },
];

export const DATE_RANGE_OPTIONS: Record<DateRangeOption, string> = {
  '7d': '7 Tage',
  '30d': '30 Tage',
  '90d': '90 Tage',
  'ytd': 'YTD',
};
