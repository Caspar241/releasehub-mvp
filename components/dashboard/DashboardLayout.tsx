'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { navigationSections } from '@/config/dashboard-navigation';
import CommandPalette from './CommandPalette';
import FloatingActionButton from './FloatingActionButton';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Initialize collapsed sections based on defaultExpanded property
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    navigationSections.forEach(section => {
      if (!section.defaultExpanded) {
        initial.add(section.id);
      }
    });
    return initial;
  });
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  // Hover intent delays
  let notificationHoverTimeout: NodeJS.Timeout;
  let userHoverTimeout: NodeJS.Timeout;

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const toggleSection = (sectionId: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(sectionId)) {
      newCollapsed.delete(sectionId);
    } else {
      newCollapsed.add(sectionId);
    }
    setCollapsedSections(newCollapsed);
  };

  const isSectionCollapsed = (sectionId: string) => {
    return collapsedSections.has(sectionId);
  };

  // Keyboard shortcuts (⌘K for command palette, ESC to close dropdowns)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setNotificationMenuOpen(false);
        setUserMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-bg-secondary">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-primary bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-surface-primary/98 backdrop-blur-glass-lg border-r border-border shadow-e2 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-8 border-b border-border">
            <Link href="/dashboard" className="text-2xl font-bold text-text-primary hover:text-accent transition-colors">
              ReleaseHub
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-8 py-8 overflow-y-auto">
            {navigationSections.map((section) => {
              const collapsed = isSectionCollapsed(section.id);
              return (
                <div key={section.id} className="mb-10">
                  {/* Section Header - SMALL CAPS Overline */}
                  <button
                    onClick={() => section.collapsible && toggleSection(section.id)}
                    className="w-full flex items-center justify-between mb-4 px-2 py-2 -mx-2 rounded-lg text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted/70 hover:text-accent hover:bg-accent/5 transition-all duration-200 hover:translate-x-2 active:scale-[0.98]"
                    style={{ letterSpacing: '0.15em', transform: 'translateZ(0)' }}
                  >
                    <span>{section.label}</span>
                    {section.collapsible && (
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          collapsed ? '' : 'rotate-180'
                        }`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Section Items */}
                  {!collapsed && (
                    <div className="space-y-0.5 pl-3">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`group relative flex items-center gap-3 py-3 px-4 text-[15px] font-medium rounded-xl transition-all duration-200 ${
                              isActive
                                ? 'text-accent bg-accent/8'
                                : 'text-text-primary/90 hover:bg-accent/5 hover:text-accent hover:translate-x-2 hover:shadow-sm active:scale-[0.98]'
                            }`}
                            style={{ transform: 'translateZ(0)' }}
                          >
                            {/* Active Indicator */}
                            {isActive && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-accent rounded-r-full" />
                            )}

                            <span className="text-[22px] flex-shrink-0 leading-none">{item.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className={isActive ? 'font-semibold' : 'font-medium'}>{item.name}</div>
                            </div>
                            {item.badge && (
                              <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-accent/20 text-accent flex-shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-surface-primary/95 backdrop-blur-glass-lg border-b border-border shadow-e1">
          <div className="flex items-center justify-between h-20 px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Command Palette Button */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-accent bg-surface-overlay rounded-lg transition-all hover:shadow-sm"
                title="Open command palette"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-xs font-mono">⌘K</span>
              </button>

              {/* Notifications */}
              <div
                className="relative"
                onMouseEnter={() => {
                  notificationHoverTimeout = setTimeout(() => setNotificationMenuOpen(true), 150);
                }}
                onMouseLeave={() => {
                  clearTimeout(notificationHoverTimeout);
                  setNotificationMenuOpen(false);
                }}
              >
                <button className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
                </button>

                {/* Notification Dropdown */}
                {notificationMenuOpen && (
                  <div className="absolute right-0 mt-2 w-80 glass-card rounded-2xl p-4 shadow-e3 z-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-text-primary">Benachrichtigungen</h3>
                      <button className="text-xs text-accent hover:text-accent-hover">Alle als gelesen markieren</button>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-surface-overlay/40 rounded-lg hover:bg-surface-overlay/60 transition-all cursor-pointer">
                        <p className="text-sm text-text-primary font-medium">Neuer Release erfolgreich</p>
                        <p className="text-xs text-text-secondary mt-1">Summer Vibes ist jetzt live</p>
                        <p className="text-xs text-text-muted mt-1">vor 2 Stunden</p>
                      </div>
                      <div className="p-3 bg-surface-overlay/20 rounded-lg hover:bg-surface-overlay/40 transition-all cursor-pointer opacity-70">
                        <p className="text-sm text-text-primary font-medium">Auszahlung verfügbar</p>
                        <p className="text-xs text-text-secondary mt-1">€2,450.00 bereit zur Auszahlung</p>
                        <p className="text-xs text-text-muted mt-1">vor 1 Tag</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard/notifications"
                      className="block text-center text-sm text-accent hover:text-accent-hover mt-4 pt-3 border-t border-border"
                    >
                      Alle anzeigen
                    </Link>
                  </div>
                )}
              </div>

              {/* Settings */}
              <Link
                href="/dashboard/settings"
                className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>

              {/* User Profile Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  userHoverTimeout = setTimeout(() => setUserMenuOpen(true), 150);
                }}
                onMouseLeave={() => {
                  clearTimeout(userHoverTimeout);
                  setUserMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-overlay transition-all cursor-pointer group">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-text-primary">{user?.name || 'Artist'}</p>
                    <p className="text-xs text-text-muted">{user?.email}</p>
                  </div>
                  <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
                  </div>
                </div>

                {/* User Menu Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-card rounded-2xl p-2 shadow-e3 z-50">
                    <div className="px-3 py-2 border-b border-border mb-2">
                      <p className="text-sm font-semibold text-text-primary">{user?.name || 'Artist'}</p>
                      <p className="text-xs text-text-muted">{user?.email}</p>
                    </div>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary hover:bg-surface-overlay rounded-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profil
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary hover:bg-surface-overlay rounded-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Einstellungen
                    </Link>
                    <div className="border-t border-border my-2"></div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Abmelden
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 lg:p-10 min-h-screen relative overflow-hidden bg-bg-secondary">
          {/* Grid Background Pattern (same as Main Site) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: 'center center',
            }}
          />

          {/* Vignette Effect (same as Main Site) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 300px rgba(0, 0, 0, 0.8)',
            }}
          />

          {/* Background Gradient Orbs (same as Main Site) */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] gradient-orb-cyan opacity-70 pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] gradient-orb-accent opacity-60 pointer-events-none" />
          <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] gradient-orb-blue opacity-35 pointer-events-none" />
          <div className="absolute bottom-1/3 left-1/2 w-[450px] h-[450px] gradient-orb-purple opacity-25 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
    </ProtectedRoute>
  );
}
