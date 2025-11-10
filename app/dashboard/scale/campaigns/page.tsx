'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CampaignsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard?panel=campaigns');
  }, [router]);

  return null;
}
