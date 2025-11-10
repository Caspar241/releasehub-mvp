'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AudienceInsightsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?panel=insights');
  }, [router]);

  return null;
}
