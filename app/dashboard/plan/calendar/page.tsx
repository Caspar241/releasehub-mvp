'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PlanCalendarPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?panel=calendar');
  }, [router]);

  return null;
}
