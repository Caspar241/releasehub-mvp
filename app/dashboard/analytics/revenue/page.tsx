'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RevenueAnalyticsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?panel=revenue');
  }, [router]);

  return null;
}
