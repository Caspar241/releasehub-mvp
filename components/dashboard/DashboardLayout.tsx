"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { DateRangeProvider } from "@/contexts/DateRangeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { navigationSections } from "@/config/dashboard-navigation";
import CommandPalette from "./CommandPalette";
import FloatingActionButton from "./FloatingActionButton";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Icon renderer helper
const getIcon = (iconName: string) => {
  const Icon = (LucideIcons as any)[iconName];
  return Icon ? <Icon size={18} strokeWidth={2} /> : null;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]); // Array for multiple open sections
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, signOut } = useAuth();

  // Panel navigation mapping
  const panelNavigationMap: Record<string, string> = {
    '/dashboard/plan/tasks': 'tasks',
    '/dashboard/plan/calendar': 'calendar',
    '/dashboard/roadmap': 'roadmap',
    '/dashboard/scale/smart-links': 'smart-links',
    '/dashboard/scale/campaigns': 'campaigns',
    '/dashboard/scale/playlists': 'playlists',
    '/dashboard/scale/forecasting': 'forecasting',
    '/dashboard/analytics/audience': 'insights',
    '/dashboard/analytics/revenue': 'revenue',
  };

  // Handle panel navigation
  const handlePanelClick = (panelName: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/dashboard?panel=${panelName}`, { scroll: false });
  };

  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLDivElement>(null);

  // Hover intent delays
  let notificationHoverTimeout: NodeJS.Timeout;
  let userMenuHoverTimeout: NodeJS.Timeout;

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  // Toggle section - allows multiple sections to be open
  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      if (prev.includes(sectionId)) {
        // Close this section
        return prev.filter((id) => id !== sectionId);
      } else {
        // Open this section (keep others open)
        return [...prev, sectionId];
      }
    });
  };

  // Check if a section contains the active page or active panel
  const isSectionActive = (section: any) => {
    return section.items.some((item: any) => {
      const panelName = panelNavigationMap[item.href];
      const isPanelActive = panelName && searchParams?.get('panel') === panelName;
      return pathname === item.href || isPanelActive;
    });
  };

  // Check if section is currently open (user toggled it)
  const isSectionOpen = (sectionId: string) => {
    return openSections.includes(sectionId);
  };

  // Auto-open section when navigating to an item in it
  // Close all other sections (only one open at a time)
  useEffect(() => {
    // Find which section contains the active item
    const activeSection = navigationSections.find((section) => isSectionActive(section));

    if (activeSection) {
      // Set only the active section as open (closes all others)
      setOpenSections([activeSection.id]);
    }
  }, [pathname, searchParams]); // Run when route changes

  // Client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcuts (ESC to close dropdowns)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNotificationMenuOpen(false);
        setUserMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside handler for user menu
  useEffect(() => {
    if (!userMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  return (
    <ProtectedRoute>
      <DateRangeProvider>
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
            className={`fixed inset-y-0 left-0 z-50 w-60 bg-bg-primary border-r border-border shadow-card transform transition-transform duration-300 ease-apple lg:translate-x-0 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{
              transform: "translate3d(0, 0, 0)",
              WebkitTransform: "translate3d(0, 0, 0)",
            }}
          >
            <div className="flex flex-col h-full">
              {/* Logo - More spacious */}
              <div className="flex items-center justify-between h-24 px-6 border-b border-border/30">
                <Link
                  href="/dashboard"
                  className="text-xl font-bold text-text-primary hover:text-accent transition-colors duration-200 tracking-tight"
                >
                  ReleaseHub
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                {navigationSections.map((section) => {
                  const isOpen = isSectionOpen(section.id);
                  const isActive = isSectionActive(section);
                  const hasSubmenu =
                    section.collapsible && section.items.length > 1;

                  return (
                    <div key={section.id} className="mb-2">
                      {/* Main Category Button */}
                      {hasSubmenu ? (
                        <button
                          onClick={() => toggleSection(section.id)}
                          className={`relative group w-full flex items-center gap-3 py-3 px-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-apple cursor-pointer ${
                            isActive
                              ? "text-accent"
                              : "text-text-primary hover:text-accent"
                          }`}
                          style={
                            isActive
                              ? {
                                  background:
                                    "linear-gradient(90deg, rgba(46, 182, 232, 0.1), rgba(46, 182, 232, 0.05))",
                                }
                              : undefined
                          }
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background =
                                "rgba(46, 182, 232, 0.05)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background = "";
                            }
                          }}
                        >
                          {/* Soft Cyan Indicator Bar for Active Parent */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-8 bg-accent rounded-r-full pointer-events-none" />
                          )}

                          {/* Category Label */}
                          <span className="relative z-10 flex-1 text-left">
                            {section.label}
                          </span>

                          {/* Chevron Icon */}
                          <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{
                              duration: 0.2,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative z-10 flex-shrink-0"
                          >
                            <LucideIcons.ChevronRight
                              size={16}
                              strokeWidth={2.5}
                              className={
                                isActive || isOpen
                                  ? "text-accent"
                                  : "text-text-tertiary group-hover:text-accent"
                              }
                            />
                          </motion.div>
                        </button>
                      ) : (
                        // Dashboard (no submenu)
                        <Link
                          href={section.items[0].href}
                          className={`relative group block w-full py-3 px-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-apple cursor-pointer ${
                            pathname === section.items[0].href
                              ? "text-accent"
                              : "text-text-primary hover:text-accent"
                          }`}
                          style={
                            pathname === section.items[0].href
                              ? {
                                  background:
                                    "linear-gradient(90deg, rgba(46, 182, 232, 0.1), rgba(46, 182, 232, 0.05))",
                                }
                              : undefined
                          }
                          onMouseEnter={(e) => {
                            if (pathname !== section.items[0].href) {
                              e.currentTarget.style.background =
                                "rgba(46, 182, 232, 0.05)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (pathname !== section.items[0].href) {
                              e.currentTarget.style.background = "";
                            }
                          }}
                        >
                          {/* Active Indicator Bar */}
                          {pathname === section.items[0].href && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-8 bg-accent rounded-r-full" />
                          )}

                          <span className="relative z-10">{section.label}</span>
                        </Link>
                      )}

                      {/* Submenu Items */}
                      <AnimatePresence initial={false}>
                        {hasSubmenu && isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              transition: {
                                height: {
                                  duration: 0.3,
                                  ease: [0.22, 1, 0.36, 1],
                                },
                                opacity: {
                                  duration: 0.25,
                                  ease: "easeOut",
                                  delay: 0.05,
                                }
                              }
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              transition: {
                                height: {
                                  duration: 0.25,
                                  ease: [0.22, 1, 0.36, 1],
                                },
                                opacity: {
                                  duration: 0.15,
                                  ease: "easeIn",
                                }
                              }
                            }}
                            className="overflow-hidden"
                          >
                            <div className="mt-1 ml-3 pl-3 border-l border-border space-y-0.5">
                              {section.items.map((item) => {
                                const panelName = panelNavigationMap[item.href];
                                const isPanelItem = !!panelName;
                                const isItemActive = pathname === item.href ||
                                  (isPanelItem && searchParams?.get('panel') === panelName);

                                if (isPanelItem) {
                                  return (
                                    <button
                                      key={item.href}
                                      onClick={handlePanelClick(panelName)}
                                      className={`relative group block w-full py-2.5 px-3 text-sm font-medium rounded-lg transition-all duration-200 ease-apple cursor-pointer text-left ${
                                        isItemActive
                                          ? "text-accent"
                                          : "text-text-secondary hover:text-accent hover:translate-x-1"
                                      }`}
                                      style={
                                        isItemActive
                                          ? {
                                              background:
                                                "rgba(46, 182, 232, 0.05)",
                                            }
                                          : undefined
                                      }
                                      onMouseEnter={(e) => {
                                        if (!isItemActive) {
                                          e.currentTarget.style.background =
                                            "rgba(46, 182, 232, 0.05)";
                                        }
                                      }}
                                      onMouseLeave={(e) => {
                                        if (!isItemActive) {
                                          e.currentTarget.style.background = "";
                                        }
                                      }}
                                    >
                                      <div className="relative z-10 flex items-center gap-3">
                                        <span
                                          className={`flex-shrink-0 transition-colors duration-200 ${
                                            isItemActive
                                              ? "text-accent"
                                              : "text-text-muted group-hover:text-accent"
                                          }`}
                                        >
                                          {getIcon(item.icon)}
                                        </span>
                                        <span
                                          className={`flex-1 truncate transition-colors duration-200 ${
                                            isItemActive
                                              ? "font-semibold"
                                              : "font-medium"
                                          }`}
                                        >
                                          {item.name}
                                        </span>
                                        {item.badge && (
                                          <span className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full bg-accent/20 text-accent border border-accent/30 flex-shrink-0">
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                    </button>
                                  );
                                }

                                return (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative group block w-full py-2.5 px-3 text-sm font-medium rounded-lg transition-all duration-200 ease-apple cursor-pointer ${
                                      isItemActive
                                        ? "text-accent"
                                        : "text-text-secondary hover:text-accent hover:translate-x-1"
                                    }`}
                                    style={
                                      isItemActive
                                        ? {
                                            background:
                                              "rgba(46, 182, 232, 0.05)",
                                          }
                                        : undefined
                                    }
                                    onMouseEnter={(e) => {
                                      if (!isItemActive) {
                                        e.currentTarget.style.background =
                                          "rgba(46, 182, 232, 0.05)";
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (!isItemActive) {
                                        e.currentTarget.style.background = "";
                                      }
                                    }}
                                  >
                                    <div className="relative z-10 flex items-center gap-3">
                                      {/* Icon */}
                                      <span
                                        className={`flex-shrink-0 transition-colors duration-200 ${
                                          isItemActive
                                            ? "text-accent"
                                            : "text-text-muted group-hover:text-accent"
                                        }`}
                                      >
                                        {getIcon(item.icon)}
                                      </span>

                                      {/* Label */}
                                      <span
                                        className={`flex-1 truncate transition-colors duration-200 ${
                                          isItemActive
                                            ? "font-semibold"
                                            : "font-medium"
                                        }`}
                                      >
                                        {item.name}
                                      </span>

                                      {/* Badge */}
                                      {item.badge && (
                                        <span className="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full bg-accent/20 text-accent border border-accent/30 flex-shrink-0">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:pl-60">
            {/* Top bar */}
            <div className="sticky top-0 z-50 bg-surface-primary/95 backdrop-blur-glass-lg border-b border-border shadow-e1">
              <div className="flex items-center justify-between h-20 px-6 lg:px-8">
                {/* Mobile menu button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Right side actions */}
                <div className="flex items-center gap-3">
                  {/* Command Palette Button */}
                  <button
                    onClick={() => setCommandPaletteOpen(true)}
                    className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-gray-100 bg-[#111214]/80 border border-[#1F1F1F] rounded-xl transition-all duration-150 hover:border-accent hover:shadow-[0_0_14px_rgba(79,209,255,0.18)] focus-within:ring-1 focus-within:ring-accent"
                    title="Search"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="text-sm">Search</span>
                  </button>

                  {/* Notifications */}
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      notificationHoverTimeout = setTimeout(
                        () => setNotificationMenuOpen(true),
                        150,
                      );
                    }}
                    onMouseLeave={() => {
                      clearTimeout(notificationHoverTimeout);
                      setNotificationMenuOpen(false);
                    }}
                  >
                    <button className="p-2 text-text-secondary hover:text-accent hover:bg-surface-overlay rounded-lg transition-all relative">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
                    </button>

                    {/* Notification Dropdown */}
                    {notificationMenuOpen && (
                      <div className="absolute right-0 mt-2 w-80 glass-card rounded-2xl p-4 shadow-e3 z-[60]">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-text-primary">
                            Benachrichtigungen
                          </h3>
                          <button className="text-xs text-accent hover:text-accent-hover">
                            Alle als gelesen markieren
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 bg-surface-overlay/40 rounded-lg hover:bg-surface-overlay/60 transition-all cursor-pointer">
                            <p className="text-sm text-text-primary font-medium">
                              Neuer Release erfolgreich
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                              Summer Vibes ist jetzt live
                            </p>
                            <p className="text-xs text-text-muted mt-1">
                              vor 2 Stunden
                            </p>
                          </div>
                          <div className="p-3 bg-surface-overlay/20 rounded-lg hover:bg-surface-overlay/40 transition-all cursor-pointer opacity-70">
                            <p className="text-sm text-text-primary font-medium">
                              Auszahlung verfügbar
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                              €2,450.00 bereit zur Auszahlung
                            </p>
                            <p className="text-xs text-text-muted mt-1">
                              vor 1 Tag
                            </p>
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
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </Link>

                  {/* User Profile Button */}
                  <div
                    ref={userButtonRef}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    onMouseEnter={() => {
                      // Only use hover on desktop (not touch devices)
                      if (window.matchMedia("(pointer: fine)").matches) {
                        userMenuHoverTimeout = setTimeout(
                          () => setUserMenuOpen(true),
                          150,
                        );
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.matchMedia("(pointer: fine)").matches) {
                        clearTimeout(userMenuHoverTimeout);
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-overlay transition-all cursor-pointer group"
                  >
                    <div className="hidden md:block text-right">
                      <p className="text-sm font-medium text-text-primary">
                        {user?.name || "Artist"}
                      </p>
                      <p className="text-xs text-text-muted">{user?.email}</p>
                    </div>
                    <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name?.charAt(0).toUpperCase() ||
                        user?.email?.charAt(0).toUpperCase() ||
                        "A"}
                    </div>
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
                  backgroundSize: "60px 60px",
                  backgroundPosition: "center center",
                }}
              />

              {/* Vignette Effect (same as Main Site) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 300px rgba(0, 0, 0, 0.8)",
                }}
              />

              {/* Background Gradient Orbs (same as Main Site) */}
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] gradient-orb-cyan opacity-70 pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] gradient-orb-accent opacity-60 pointer-events-none" />
              <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] gradient-orb-blue opacity-35 pointer-events-none" />
              <div className="absolute bottom-1/3 left-1/2 w-[450px] h-[450px] gradient-orb-purple opacity-25 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10">{children}</div>
            </main>
          </div>

          {/* Command Palette */}
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
          />

          {/* Floating Action Button */}
          <FloatingActionButton />

          {/* User Menu Portal */}
          {mounted &&
            userButtonRef.current &&
            createPortal(
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    ref={userMenuRef}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{
                      duration: 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="fixed w-64 rounded-xl backdrop-blur-glass-lg z-50"
                    style={{
                      top: `${userButtonRef.current.getBoundingClientRect().bottom + 8}px`,
                      right: `${window.innerWidth - userButtonRef.current.getBoundingClientRect().right}px`,
                      background:
                        "linear-gradient(180deg, #141519 0%, #101114 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
                    }}
                    onMouseEnter={() => {
                      if (window.matchMedia("(pointer: fine)").matches) {
                        clearTimeout(userMenuHoverTimeout);
                      }
                    }}
                    onMouseLeave={() => {
                      if (window.matchMedia("(pointer: fine)").matches) {
                        setUserMenuOpen(false);
                      }
                    }}
                    role="menu"
                    aria-label="User menu"
                  >
                    <div className="p-2">
                      {/* User Info Header */}
                      <div className="px-3 py-2 border-b border-border mb-2">
                        <p className="text-sm font-semibold text-text-primary">
                          {user?.name || "Artist"}
                        </p>
                        <p className="text-xs text-text-muted">{user?.email}</p>
                      </div>

                      {/* Menu Items */}
                      <Link
                        href="/dashboard/settings"
                        className="group relative flex items-center gap-2 px-3 py-2.5 rounded-lg text-text-secondary hover:text-accent transition-all duration-200 ease-apple"
                        style={{
                          transition:
                            "background 0.2s ease-in-out, color 0.2s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(46, 182, 232, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "";
                        }}
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <svg
                          className="w-4 h-4 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="font-medium">Profil</span>
                      </Link>

                      <Link
                        href="/dashboard/settings"
                        className="group relative flex items-center gap-2 px-3 py-2.5 rounded-lg text-text-secondary hover:text-accent transition-all duration-200 ease-apple"
                        style={{
                          transition:
                            "background 0.2s ease-in-out, color 0.2s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(46, 182, 232, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "";
                        }}
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <svg
                          className="w-4 h-4 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="font-medium">Einstellungen</span>
                      </Link>

                      <div className="border-t border-border my-2"></div>

                      <button
                        onClick={() => {
                          handleSignOut();
                          setUserMenuOpen(false);
                        }}
                        className="group relative flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-text-muted hover:text-accent transition-all duration-200 ease-apple"
                        style={{
                          transition:
                            "background 0.2s ease-in-out, color 0.2s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(46, 182, 232, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "";
                        }}
                        role="menuitem"
                      >
                        <svg
                          className="w-4 h-4 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="font-medium">Abmelden</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>,
              document.body,
            )}
        </div>
      </DateRangeProvider>
    </ProtectedRoute>
  );
}
