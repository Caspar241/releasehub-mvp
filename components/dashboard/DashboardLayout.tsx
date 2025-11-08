'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { navigationSections } from '@/config/dashboard-navigation';
import CommandPalette from './CommandPalette';

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
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

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

  // Command Palette keyboard shortcut (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
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
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-border">
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
          <nav className="flex-1 px-6 py-8 overflow-y-auto">
            {navigationSections.map((section) => {
              const collapsed = isSectionCollapsed(section.id);
              return (
                <div key={section.id} className="mb-8">
                  {/* Section Header */}
                  <button
                    onClick={() => section.collapsible && toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-surface-overlay/50"
                  >
                    <span>{section.label}</span>
                    {section.collapsible && (
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          collapsed ? '' : 'rotate-180'
                        }`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Section Items */}
                  {!collapsed && (
                    <div className="mt-3 space-y-1.5">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center gap-3 px-3 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                              isActive
                                ? 'bg-accent/10 text-accent shadow-sm'
                                : 'text-text-primary hover:bg-surface-overlay hover:text-accent'
                            }`}
                          >
                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className={isActive ? 'font-semibold' : ''}>{item.name}</div>
                            </div>
                            {item.badge && (
                              <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-accent text-text-inverse flex-shrink-0">
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
              <button className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

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
              <div className="relative">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-overlay transition-all cursor-pointer group">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-text-primary">{user?.name || 'Artist'}</p>
                    <p className="text-xs text-text-muted">{user?.email}</p>
                  </div>
                  <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all border border-border"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 lg:p-10 bg-bg-secondary min-h-screen relative overflow-hidden">
          {/* Background Lighting Effects - More subtle */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] gradient-orb-cyan opacity-[0.06] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] gradient-orb-purple opacity-[0.04] pointer-events-none" />

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
    </div>
    </ProtectedRoute>
  );
}
