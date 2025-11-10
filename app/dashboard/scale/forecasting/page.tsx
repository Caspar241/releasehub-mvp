'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForecastingPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?panel=forecasting');
  }, [router]);

  return null;
}
