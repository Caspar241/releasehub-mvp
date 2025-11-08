/**
 * Dashboard Navigation Configuration
 *
 * Structured navigation for ReleaseHub Dashboard
 * Organized into 4 main sections: Plan, Release, Scale, Analyze
 */

export interface NavItem {
  name: string;
  href: string;
  icon: string;
  description?: string;
  badge?: string | number;
}

export interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href?: string;
  onClick?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  shortcut?: string;
}

/**
 * Main Navigation Sections
 */
export const navigationSections: NavSection[] = [
  {
    id: 'plan',
    label: 'Plan',
    collapsible: true,
    defaultExpanded: true,
    items: [
      {
        name: 'Overview',
        href: '/dashboard',
        icon: '📊',
        description: 'Strategic dashboard & insights',
      },
      {
        name: 'My Releases',
        href: '/dashboard/releases',
        icon: '🎵',
        description: 'Manage your release pipeline',
      },
    ],
  },
  {
    id: 'release',
    label: 'Release',
    collapsible: true,
    defaultExpanded: true,
    items: [
      {
        name: 'New Release',
        href: '/dashboard/upload',
        icon: '⬆️',
        description: 'Upload & distribute new music',
      },
      {
        name: 'Distribution',
        href: '/dashboard/distribution',
        icon: '🌐',
        description: 'Manage streaming platforms',
      },
    ],
  },
  {
    id: 'scale',
    label: 'Scale',
    collapsible: true,
    defaultExpanded: false,
    items: [
      {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: '⚙️',
        description: 'Account & preferences',
      },
    ],
  },
  {
    id: 'analyze',
    label: 'Analyze',
    collapsible: true,
    defaultExpanded: true,
    items: [
      {
        name: 'Analytics',
        href: '/dashboard/analytics',
        icon: '📈',
        description: 'Performance & streaming data',
      },
      {
        name: 'Earnings',
        href: '/dashboard/earnings',
        icon: '💰',
        description: 'Revenue & payouts',
      },
    ],
  },
];

/**
 * Quick Action Buttons (Top of Dashboard)
 */
export const quickActions: QuickAction[] = [
  {
    id: 'new-release',
    label: 'New Release',
    icon: '⬆️',
    href: '/dashboard/upload',
    variant: 'primary',
    shortcut: '⌘N',
  },
  {
    id: 'view-analytics',
    label: 'Analytics',
    icon: '📈',
    href: '/dashboard/analytics',
    variant: 'secondary',
    shortcut: '⌘A',
  },
  {
    id: 'check-earnings',
    label: 'Earnings',
    icon: '💰',
    href: '/dashboard/earnings',
    variant: 'ghost',
    shortcut: '⌘E',
  },
];

/**
 * Command Palette Actions (⌘K)
 */
export interface CommandAction {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  section: string;
  keywords: string[];
  action: string | (() => void);
  shortcut?: string;
}

export const commandPaletteActions: CommandAction[] = [
  // Navigation
  {
    id: 'nav-overview',
    label: 'Go to Overview',
    description: 'Your strategic dashboard',
    icon: '📊',
    section: 'Navigation',
    keywords: ['dashboard', 'home', 'overview', 'main'],
    action: '/dashboard',
  },
  {
    id: 'nav-releases',
    label: 'Go to My Releases',
    description: 'View all your releases',
    icon: '🎵',
    section: 'Navigation',
    keywords: ['releases', 'tracks', 'music', 'songs'],
    action: '/dashboard/releases',
  },
  {
    id: 'nav-analytics',
    label: 'Go to Analytics',
    description: 'View performance data',
    icon: '📈',
    section: 'Navigation',
    keywords: ['analytics', 'stats', 'data', 'performance', 'streams'],
    action: '/dashboard/analytics',
    shortcut: '⌘A',
  },
  {
    id: 'nav-earnings',
    label: 'Go to Earnings',
    description: 'Check your revenue',
    icon: '💰',
    section: 'Navigation',
    keywords: ['earnings', 'revenue', 'money', 'payouts', 'income'],
    action: '/dashboard/earnings',
    shortcut: '⌘E',
  },
  {
    id: 'nav-distribution',
    label: 'Go to Distribution',
    description: 'Manage streaming platforms',
    icon: '🌐',
    section: 'Navigation',
    keywords: ['distribution', 'platforms', 'spotify', 'apple music', 'channels'],
    action: '/dashboard/distribution',
  },
  {
    id: 'nav-settings',
    label: 'Go to Settings',
    description: 'Manage your account',
    icon: '⚙️',
    section: 'Navigation',
    keywords: ['settings', 'preferences', 'account', 'profile'],
    action: '/dashboard/settings',
  },

  // Quick Actions
  {
    id: 'action-new-release',
    label: 'Upload New Release',
    description: 'Start distributing new music',
    icon: '⬆️',
    section: 'Quick Actions',
    keywords: ['upload', 'new', 'release', 'distribute', 'create'],
    action: '/dashboard/upload',
    shortcut: '⌘N',
  },
  {
    id: 'action-export-data',
    label: 'Export Analytics Data',
    description: 'Download your analytics',
    icon: '📥',
    section: 'Quick Actions',
    keywords: ['export', 'download', 'csv', 'data', 'analytics'],
    action: 'exportAnalytics',
  },
  {
    id: 'action-request-payout',
    label: 'Request Payout',
    description: 'Withdraw your earnings',
    icon: '💸',
    section: 'Quick Actions',
    keywords: ['payout', 'withdraw', 'money', 'transfer'],
    action: 'requestPayout',
  },

  // Help
  {
    id: 'help-docs',
    label: 'Open Documentation',
    description: 'View help & guides',
    icon: '📚',
    section: 'Help',
    keywords: ['help', 'docs', 'documentation', 'guide', 'support'],
    action: '/help',
  },
  {
    id: 'help-support',
    label: 'Contact Support',
    description: 'Get help from our team',
    icon: '💬',
    section: 'Help',
    keywords: ['support', 'contact', 'help', 'chat'],
    action: 'openSupport',
  },
];

/**
 * Mobile Navigation Configuration
 * Simplified structure for mobile devices
 */
export const mobileNavigation: NavItem[] = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: '📊',
  },
  {
    name: 'Releases',
    href: '/dashboard/releases',
    icon: '🎵',
  },
  {
    name: 'Upload',
    href: '/dashboard/upload',
    icon: '⬆️',
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: '📈',
  },
  {
    name: 'Earnings',
    href: '/dashboard/earnings',
    icon: '💰',
  },
];

/**
 * Navigation State Rules
 */
export const navigationRules = {
  // Hover states
  hover: {
    backgroundColor: 'hover:bg-surface-overlay',
    textColor: 'hover:text-accent',
    transition: 'transition-all duration-200',
  },

  // Active states
  active: {
    backgroundColor: 'bg-accent-subtle',
    textColor: 'text-accent',
    borderLeft: 'border-l-2 border-accent',
  },

  // Section headers
  sectionHeader: {
    fontSize: 'text-xs',
    fontWeight: 'font-semibold',
    textTransform: 'uppercase',
    letterSpacing: 'tracking-wider',
    textColor: 'text-text-muted',
    marginTop: 'mt-6',
    marginBottom: 'mb-2',
    paddingX: 'px-4',
  },

  // Collapsible sections
  collapsible: {
    animationDuration: 'duration-200',
    animationEasing: 'ease-in-out',
    iconRotation: 'rotate-180',
  },

  // Spacing
  spacing: {
    sectionGap: 'space-y-1',
    itemPadding: 'px-4 py-3',
    iconMargin: 'mr-3',
  },
};
