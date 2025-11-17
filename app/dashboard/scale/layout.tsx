'use client';

import { usePathname } from 'next/navigation';

export default function ScaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
      <div key={pathname}>
        {children}
      </div>
  );
}
