'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SmartLinksPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?panel=smart-links');
  }, [router]);

  return null;
}
