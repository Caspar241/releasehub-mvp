'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingActionButton() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // Don't show FAB on upload page (since user is already there)
  if (pathname === '/dashboard/upload') {
    return null;
  }

  return (
    <Link
      href="/dashboard/upload"
      className="fixed bottom-8 right-8 z-40 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <div
        className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 rounded-lg bg-surface-primary border border-border shadow-e3 transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <span className="text-sm font-semibold text-text-primary">New Release</span>
        <span className="text-xs text-text-muted ml-2">⌘N</span>
      </div>

      {/* FAB Button */}
      <div
        className="w-16 h-16 rounded-full bg-accent hover:bg-accent-hover shadow-e4 hover:shadow-glow-strong transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 group-hover:scale-110"
        style={{
          boxShadow: '0 8px 32px rgba(79, 209, 255, 0.3)',
        }}
      >
        {/* Plus Icon with Rotation Animation */}
        <svg
          className="w-7 h-7 text-white transition-transform duration-300 group-hover:rotate-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>

      {/* Ripple Effect on Hover */}
      <div
        className={`absolute inset-0 rounded-full bg-accent/20 transition-all duration-500 ${
          isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-0'
        }`}
        style={{
          pointerEvents: 'none',
        }}
      />
    </Link>
  );
}
