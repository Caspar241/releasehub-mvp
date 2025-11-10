'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PlanTasksPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard with tasks panel
    router.replace('/dashboard?panel=tasks');
  }, [router]);

  // Return null or a loading state while redirecting
  return null;
}
