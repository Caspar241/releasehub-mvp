'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RoadmapPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?panel=roadmap');
  }, [router]);

  return null;
}
