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
 * Organized into 7 main categories with accordion-style submenus
 * Structure: Dashboard, Planung, Releases, Scale, Analyze, Knowledge Hub, Support
 */
export const navigationSections: NavSection[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    collapsible: false,
    defaultExpanded: false,
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: 'LayoutDashboard',
        description: 'Overview & insights',
      },
    ],
  },
  {
    id: 'plan',
    label: 'Planung',
    collapsible: true,
    defaultExpanded: false,
    items: [
      {
        name: 'Vorlagen & Workflows',
        href: '/dashboard/plan/workflows',
        icon: 'Workflow',
        description: 'Reusable templates',
      },
      {
        name: 'Aufgaben',
        href: '/dashboard/plan/tasks',
        icon: 'CheckSquare',
        description: 'Manage your tasks',
      },
    ],
  },
  {
    id: 'releases',
    label: 'Releases',
    collapsible: true,
    defaultExpanded: false,
    items: [
      {
        name: 'Meine Releases',
        href: '/dashboard/releases',
        icon: 'ListMusic',
        description: 'Manage your releases',
      },
      {
        name: '+ Neues Release',
        href: '/dashboard/releases/new',
        icon: 'PlusCircle',
        description: 'Upload new music',
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
        name: 'Smart Links & Presaves',
        href: '/dashboard/scale/links',
        icon: 'Link2',
        description: 'Link management & presaves',
      },
      {
        name: 'Kampagnen & Ads',
        href: '/dashboard/scale/campaigns',
        icon: 'Megaphone',
        description: 'Marketing campaigns',
      },
      {
        name: 'Press Kit Builder',
        href: '/dashboard/scale/presskit',
        icon: 'FileBadge',
        description: 'Create press kits',
      },
    ],
  },
  {
    id: 'analyze',
    label: 'Analyze',
    collapsible: true,
    defaultExpanded: false,
    items: [
      {
        name: 'Überblick & Statistiken',
        href: '/dashboard/analyze/overview',
        icon: 'ChartPie',
        description: 'KPI overview',
      },
      {
        name: 'Streams & Performance',
        href: '/dashboard/analyze/streams',
        icon: 'Waves',
        description: 'Streaming performance',
      },
      {
        name: 'Trends & Forecasts',
        href: '/dashboard/analyze/forecast',
        icon: 'TrendingUp',
        description: 'Trends & predictions',
      },
      {
        name: 'Einnahmen & Reports',
        href: '/dashboard/analyze/reports',
        icon: 'FileBarChart',
        description: 'Revenue analytics',
      },
      {
        name: 'Datenexporte',
        href: '/dashboard/analyze/exports',
        icon: 'FileDown',
        description: 'Export your data',
      },
    ],
  },
  {
    id: 'knowledge',
    label: 'Knowledge Hub',
    collapsible: false,
    defaultExpanded: false,
    items: [
      {
        name: 'Knowledge Hub',
        href: '/dashboard/knowledge',
        icon: 'GraduationCap',
        description: 'Guides & resources',
      },
    ],
  },
  {
    id: 'support',
    label: 'Support & Hilfe',
    collapsible: false,
    defaultExpanded: false,
    items: [
      {
        name: 'Support & Hilfe',
        href: '/dashboard/support',
        icon: 'LifeBuoy',
        description: 'Get help',
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
    label: '+ New Release',
    icon: 'PlusCircle',
    href: '/dashboard/releases/new',
    variant: 'primary',
    shortcut: 'N',
  },
  {
    id: 'new-campaign',
    label: '+ Campaign',
    icon: 'Megaphone',
    href: '/dashboard/scale/campaigns',
    variant: 'secondary',
  },
  {
    id: 'new-smart-link',
    label: '+ Smart Link',
    icon: 'Link2',
    href: '/dashboard/scale/links',
    variant: 'secondary',
  },
  {
    id: 'new-task',
    label: '+ Task',
    icon: 'CheckSquare',
    href: '/dashboard/plan/tasks',
    variant: 'ghost',
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
    id: 'nav-dashboard',
    label: 'Go to Dashboard',
    description: 'Your strategic overview',
    icon: 'LayoutDashboard',
    section: 'Navigation',
    keywords: ['dashboard', 'home', 'overview', 'main'],
    action: '/dashboard',
  },
  {
    id: 'nav-releases',
    label: 'Go to My Releases',
    description: 'View all your releases',
    icon: 'ListMusic',
    section: 'Navigation',
    keywords: ['releases', 'tracks', 'music', 'songs'],
    action: '/dashboard/releases',
  },
  {
    id: 'nav-workflows',
    label: 'Go to Workflows',
    description: 'Manage templates & workflows',
    icon: 'Workflow',
    section: 'Navigation',
    keywords: ['workflows', 'templates', 'checklists', 'automation'],
    action: '/dashboard/plan/workflows',
  },
  {
    id: 'nav-tasks',
    label: 'Go to Tasks',
    description: 'View your task list',
    icon: 'CheckSquare',
    section: 'Navigation',
    keywords: ['tasks', 'todo', 'checklist', 'aufgaben'],
    action: '/dashboard/plan/tasks',
  },
  {
    id: 'nav-analyze',
    label: 'Go to Analytics Overview',
    description: 'View performance data',
    icon: 'ChartPie',
    section: 'Navigation',
    keywords: ['analytics', 'stats', 'data', 'performance', 'streams', 'analyze'],
    action: '/dashboard/analyze/overview',
  },
  {
    id: 'nav-reports',
    label: 'Go to Reports',
    description: 'Check revenue & earnings',
    icon: 'FileBarChart',
    section: 'Navigation',
    keywords: ['earnings', 'revenue', 'money', 'payouts', 'income', 'reports'],
    action: '/dashboard/analyze/reports',
  },
  {
    id: 'nav-knowledge',
    label: 'Go to Knowledge Hub',
    description: 'Browse guides & resources',
    icon: 'GraduationCap',
    section: 'Navigation',
    keywords: ['knowledge', 'guides', 'help', 'learn', 'resources'],
    action: '/dashboard/knowledge',
  },
  {
    id: 'nav-support',
    label: 'Go to Support',
    description: 'Get help & contact support',
    icon: 'LifeBuoy',
    section: 'Navigation',
    keywords: ['support', 'help', 'contact', 'faq', 'hilfe'],
    action: '/dashboard/support',
  },
  {
    id: 'nav-settings',
    label: 'Go to Settings',
    description: 'Manage your account',
    icon: 'Settings',
    section: 'Navigation',
    keywords: ['settings', 'preferences', 'account', 'profile'],
    action: '/dashboard/settings',
  },

  // Quick Actions - Create
  {
    id: 'action-new-release',
    label: 'New Release',
    description: 'Upload and distribute new music',
    icon: 'PlusCircle',
    section: 'Create',
    keywords: ['upload', 'new', 'release', 'distribute', 'create'],
    action: '/dashboard/releases/new',
    shortcut: 'N',
  },
  {
    id: 'action-new-campaign',
    label: 'New Campaign',
    description: 'Create marketing campaign',
    icon: 'Megaphone',
    section: 'Create',
    keywords: ['campaign', 'marketing', 'ads', 'promotion'],
    action: '/dashboard/scale/campaigns',
  },
  {
    id: 'action-new-smart-link',
    label: 'New Smart Link',
    description: 'Create smart link or presave',
    icon: 'Link2',
    section: 'Create',
    keywords: ['smart link', 'presave', 'link', 'landing page'],
    action: '/dashboard/scale/links',
  },
  {
    id: 'action-new-task',
    label: 'New Task',
    description: 'Add a new task',
    icon: 'CheckSquare',
    section: 'Create',
    keywords: ['task', 'todo', 'aufgabe', 'create'],
    action: '/dashboard/plan/tasks',
  },
  {
    id: 'action-create-presskit',
    label: 'Create Press Kit',
    description: 'Build electronic press kit',
    icon: 'FileBadge',
    section: 'Create',
    keywords: ['press kit', 'epk', 'press', 'media'],
    action: '/dashboard/scale/presskit',
  },

  // Quick Actions - Data
  {
    id: 'action-export-data',
    label: 'Export Analytics Data',
    description: 'Download your analytics',
    icon: 'FileDown',
    section: 'Data',
    keywords: ['export', 'download', 'csv', 'data', 'analytics'],
    action: '/dashboard/analyze/exports',
  },
  {
    id: 'action-view-streams',
    label: 'View Streaming Data',
    description: 'See platform breakdowns',
    icon: 'Waves',
    section: 'Data',
    keywords: ['streams', 'spotify', 'apple music', 'platforms'],
    action: '/dashboard/analyze/streams',
  },
  {
    id: 'action-view-forecast',
    label: 'View Forecasts',
    description: 'See trends & predictions',
    icon: 'TrendingUp',
    section: 'Data',
    keywords: ['forecast', 'trends', 'predictions', 'future'],
    action: '/dashboard/analyze/forecast',
  },
];

/**
 * Mobile Navigation Configuration
 * Simplified structure for mobile devices
 */
export const mobileNavigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    name: 'Releases',
    href: '/dashboard/releases',
    icon: 'ListMusic',
  },
  {
    name: 'Tasks',
    href: '/dashboard/plan/tasks',
    icon: 'CheckSquare',
  },
  {
    name: 'Analytics',
    href: '/dashboard/analyze/overview',
    icon: 'ChartPie',
  },
  {
    name: 'More',
    href: '/dashboard/knowledge',
    icon: 'MoreHorizontal',
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
