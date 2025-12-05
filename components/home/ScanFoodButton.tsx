'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ScanLine } from 'lucide-react';

export function ScanFoodButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push('/scan')}
      variant="primary"
      className="w-full py-4 text-lg flex items-center justify-center gap-3"
    >
      <ScanLine size={24} />
      Scan Food
    </Button>
  );
}
