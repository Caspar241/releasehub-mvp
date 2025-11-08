'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import SideNavigation from './SideNavigation';

interface NavigationProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

export default function Navigation({ onLoginClick, onSignupClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const [sideNavOpen, setSideNavOpen] = useState(false);

  // Scroll-Animation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    {
      label: 'Produkt',
      dropdown: [
        { label: 'Features', href: '/features', description: 'Alle Features im Überblick' },
        { label: 'Integrations', href: '/integrations', description: 'Spotify, Apple Music & mehr' },
        { label: 'Roadmap', href: '/roadmap', description: 'Was als Nächstes kommt' },
        { label: 'Changelog', href: '/changelog', description: 'Neue Updates & Features' },
      ],
    },
    {
      label: 'Für wen?',
      dropdown: [
        { label: 'Für Independent Artists', href: '/artists', description: '0% Rechte, volle Kontrolle' },
        { label: 'Für Labels & Distributoren', href: '/labels', description: 'Multi-Artist Management' },
        { label: 'Für Managers & Teams', href: '/managers', description: 'Team-Kollaboration' },
      ],
    },
    {
      label: 'Ressourcen',
      dropdown: [
        { label: 'Templates & Downloads', href: '/resources', description: 'Gratis Tools & Vorlagen' },
        { label: 'Blog & Guides', href: '/blog', description: 'Tutorials & Best Practices' },
        { label: 'Help Center', href: '/help', description: 'FAQ & Support' },
      ],
    },
    {
      label: 'Pricing',
      href: '/pricing',
    },
  ];

  const handleMobileDropdownClick = (label: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === label ? null : label);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-navigation transition-all duration-300 ${
        scrolled
          ? 'bg-surface-primary/95 backdrop-blur-glass-lg border-b border-border shadow-e3'
          : 'bg-transparent border-b border-border-muted'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-text-primary hover:text-accent transition-colors">
            ReleaseHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button
                      className="flex items-center gap-1 text-text-secondary hover:text-accent transition-colors font-medium"
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
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
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2 w-72 z-dropdown">
                        <div className="glass-card rounded-xl shadow-e3 border border-border py-2">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="block px-4 py-3 hover:bg-accent/10 transition-colors duration-150 rounded-lg mx-1 group"
                            >
                              <div className="font-semibold text-text-primary group-hover:text-accent transition-colors duration-150">{dropdownItem.label}</div>
                              {dropdownItem.description && (
                                <div className="text-body-sm text-text-muted mt-1">{dropdownItem.description}</div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href!} className="text-text-secondary hover:text-accent transition-colors font-medium">
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Auth Buttons */}
            <button
              onClick={onLoginClick}
              className="px-6 py-2.5 rounded-full border-2 border-border text-text-primary font-semibold hover:bg-surface-raised hover:border-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            >
              Log in
            </button>
            <button
              onClick={onSignupClick}
              className="px-6 py-2.5 rounded-full bg-accent text-text-inverse font-semibold hover:bg-accent-hover hover:shadow-glow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            >
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setSideNavOpen(true)}
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
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>

      {/* Side Navigation */}
      <SideNavigation
        isOpen={sideNavOpen}
        onClose={() => setSideNavOpen(false)}
        onLoginClick={onLoginClick}
        onSignupClick={onSignupClick}
      />
    </nav>
  );
}
