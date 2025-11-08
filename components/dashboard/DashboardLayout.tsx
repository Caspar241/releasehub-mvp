'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { navigationSections } from '@/config/dashboard-navigation';
import QuickActions from './QuickActions';
import CommandPalette from './CommandPalette';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
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

  const isSectionCollapsed = (sectionId: string, defaultExpanded = true) => {
    return collapsedSections.has(sectionId) ? true : !defaultExpanded;
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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-bg-primary border-r border-border-light transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border-light">
            <Link href="/dashboard" className="text-xl font-bold text-primary">
              ReleaseHub
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-text-secondary hover:text-primary"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {navigationSections.map((section) => {
              const collapsed = isSectionCollapsed(section.id, section.defaultExpanded);
              return (
                <div key={section.id} className="mb-6">
                  {/* Section Header */}
                  <button
                    onClick={() => section.collapsible && toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-text-secondary transition-colors"
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
                    <div className="mt-2 space-y-1">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-accent-subtle text-accent border-l-2 border-accent'
                                : 'text-text-primary hover:bg-surface-overlay hover:text-accent'
                            }`}
                            title={item.description}
                          >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            <div className="flex-1">
                              <div>{item.name}</div>
                              {item.description && (
                                <div className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            {item.badge && (
                              <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-accent text-text-inverse">
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

          {/* User Profile */}
          <div className="p-4 border-t border-border-light">
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{user?.name || 'Artist'}</p>
                <p className="text-xs text-text-secondary truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full text-sm text-left px-4 py-2 rounded-button text-text-secondary hover:bg-bg-secondary hover:text-accent transition-colors"
            >
              Ausloggen
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-border-light">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-text-secondary hover:text-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Quick Actions - Desktop */}
            <div className="hidden lg:flex flex-1 justify-center">
              <QuickActions />
            </div>

            <div className="ml-auto flex items-center space-x-4">
              {/* Command Palette Button */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-accent bg-surface-overlay rounded-lg transition-colors"
                title="Open command palette"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-xs font-mono">⌘K</span>
              </button>

              {/* Notifications */}
              <button className="text-text-secondary hover:text-accent transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Actions - Mobile */}
          <div className="lg:hidden px-4 pb-3 overflow-x-auto">
            <QuickActions />
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8 bg-bg-secondary min-h-screen relative overflow-hidden">
          {/* Background Lighting Effects */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] gradient-orb-cyan opacity-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] gradient-orb-purple opacity-15 pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] gradient-orb-blue opacity-12 pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] gradient-orb-pink opacity-10 pointer-events-none" />

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
