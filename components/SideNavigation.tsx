'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { slideInFromRight, backdropVariants, navItemVariant, staggerContainer } from '@/lib/animations';

interface NavigationLink {
  label: string;
  href: string;
  description?: string;
}

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export default function SideNavigation({
  isOpen,
  onClose,
  onLoginClick,
  onSignupClick,
}: SideNavigationProps) {
  const navLinks: NavigationLink[] = [
    { label: 'Home', href: '/', description: 'Back to homepage' },
    { label: 'Features', href: '/features', description: 'Explore our features' },
    { label: 'Pricing', href: '/pricing', description: 'View pricing plans' },
    { label: 'Blog', href: '/blog', description: 'Read our latest posts' },
    { label: 'About', href: '/about', description: 'Learn about us' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Side Panel */}
          <motion.aside
            variants={slideInFromRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-surface-raised/98 backdrop-blur-glass border-l border-border z-[70] overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <Link href="/" onClick={onClose} className="text-2xl font-bold text-text-primary hover:text-accent transition-colors">
                  ReleaseHub
                </Link>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surface-overlay rounded-lg transition-colors"
                  aria-label="Close navigation"
                >
                  <svg
                    className="w-6 h-6 text-text-secondary"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <motion.nav
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-2 mb-12"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={navItemVariant}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block p-4 rounded-xl hover:bg-accent-subtle transition-all duration-200 group"
                    >
                      <div className="text-body font-semibold text-text-primary group-hover:text-accent transition-colors">
                        {link.label}
                      </div>
                      {link.description && (
                        <div className="text-body-sm text-text-muted mt-1">
                          {link.description}
                        </div>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Auth Buttons */}
              <motion.div
                variants={navItemVariant}
                initial="hidden"
                animate="visible"
                className="space-y-3 pt-6 border-t border-border"
              >
                <button
                  onClick={() => {
                    onLoginClick?.();
                    onClose();
                  }}
                  className="w-full px-6 py-3 rounded-lg border-2 border-border-strong text-text-primary font-semibold hover:bg-surface-overlay hover:border-accent transition-all duration-200"
                >
                  Log in
                </button>

                <button
                  onClick={() => {
                    onSignupClick?.();
                    onClose();
                  }}
                  className="w-full px-6 py-3 rounded-lg bg-accent text-text-inverse font-semibold hover:bg-accent-hover hover:shadow-glow transition-all duration-200"
                >
                  Sign up
                </button>
              </motion.div>

              {/* Footer Info */}
              <motion.div
                variants={navItemVariant}
                initial="hidden"
                animate="visible"
                className="mt-12 pt-6 border-t border-border"
              >
                <p className="text-body-sm text-text-muted text-center">
                  © 2025 ReleaseHub
                </p>
                <p className="text-body-sm text-text-muted text-center mt-1">
                  Artist Operating System
                </p>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
