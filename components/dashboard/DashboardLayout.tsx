'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Übersicht', href: '/dashboard', icon: '📊' },
  { name: 'Meine Releases', href: '/dashboard/releases', icon: '🎵' },
  { name: 'Neuer Release', href: '/dashboard/upload', icon: '⬆️' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  { name: 'Einnahmen', href: '/dashboard/earnings', icon: '💰' },
  { name: 'Vertriebskanäle', href: '/dashboard/distribution', icon: '🌐' },
  { name: 'Einstellungen', href: '/dashboard/settings', icon: '⚙️' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

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
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-button transition-colors ${
                    isActive
                      ? 'bg-bg-secondary text-accent'
                      : 'text-text-primary hover:bg-bg-secondary'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
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
        <div className="sticky top-0 z-10 flex items-center h-16 bg-bg-primary border-b border-border-light px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-text-secondary hover:text-primary"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-auto flex items-center space-x-4">
            <button className="text-text-secondary hover:text-accent">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
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
    </div>
    </ProtectedRoute>
  );
}
