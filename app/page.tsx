'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { WelcomeHeader } from '@/components/home/WelcomeHeader';
import { PriorityCards } from '@/components/home/PriorityCards';
import { ScanFoodButton } from '@/components/home/ScanFoodButton';
import { ShoppingAssistantButton } from '@/components/home/ShoppingAssistantButton';
import { CKDSavingsCard } from '@/components/home/CKDSavingsCard';
import { WaterIntakeCard } from '@/components/home/WaterIntakeCard';
import { CKDSummaryCard } from '@/components/home/CKDSummaryCard';
import { DailyNutrientSummary } from '@/components/home/DailyNutrientSummary';
import { SymptomCheckWidget } from '@/components/home/SymptomCheckWidget';
import { useApp } from '@/context/AppContext';

export default function Home() {
  const { needsSymptomCheck } = useApp();

  return (
    <PageContainer>
      <WelcomeHeader />
      <div className="space-y-4 mt-4">
        <PriorityCards />
        {needsSymptomCheck && (
          <div className="px-4">
            <SymptomCheckWidget />
          </div>
        )}
        <div className="px-4 space-y-3">
          <ScanFoodButton />
          <ShoppingAssistantButton />
        </div>
        <div className="px-4">
          <CKDSavingsCard />
        </div>
        <div className="px-4">
          <DailyNutrientSummary />
        </div>
        <div className="px-4 grid grid-cols-1 gap-4">
          <WaterIntakeCard />
          <CKDSummaryCard />
        </div>
      </div>
    </PageContainer>
  );
}
