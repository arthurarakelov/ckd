'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ShoppingCart } from 'lucide-react';

export function ShoppingAssistantButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push('/scan?mode=shopping')}
      variant="secondary"
      className="w-full py-4 text-lg flex items-center justify-center gap-3"
    >
      <ShoppingCart size={24} />
      Shopping Assistant
    </Button>
  );
}
