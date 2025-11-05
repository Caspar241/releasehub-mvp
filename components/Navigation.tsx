'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface NavigationProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export default function Navigation({ onLoginClick, onSignupClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-Animation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg border-b border-border-light'
          : 'bg-bg-primary/95 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
            ReleaseHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-text-primary hover:text-accent transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-text-primary hover:text-accent transition-colors">
              Pricing
            </Link>
            <Link href="/resources" className="text-text-primary hover:text-accent transition-colors">
              Resources
            </Link>

            {/* Auth Buttons */}
            <button
              onClick={onLoginClick}
              className="px-6 py-2.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-200"
            >
              Log in
            </button>
            <button
              onClick={onSignupClick}
              className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary-hover transition-all duration-200"
            >
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-light">
            <div className="flex flex-col gap-4">
              <Link
                href="/#features"
                className="text-text-primary hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-text-primary hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/resources"
                className="text-text-primary hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <button
                onClick={() => {
                  onLoginClick?.();
                  setMobileMenuOpen(false);
                }}
                className="px-6 py-2.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-200 text-center"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  onSignupClick?.();
                  setMobileMenuOpen(false);
                }}
                className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary-hover transition-all duration-200"
              >
                Sign up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
