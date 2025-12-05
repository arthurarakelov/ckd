'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { NutrientGauge } from '@/components/ui/NutrientGauge';
import { useApp } from '@/context/AppContext';
import { ckdStage3Limits } from '@/data/ckd-limits';

export function DailyNutrientSummary() {
  const { dailyTotals } = useApp();

  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Nutrients</h3>
      <div className="space-y-4">
        <NutrientGauge
          label="Sodium"
          current={dailyTotals.sodium}
          limit={ckdStage3Limits.sodium}
          compact
        />
        <NutrientGauge
          label="Potassium"
          current={dailyTotals.potassium}
          limit={ckdStage3Limits.potassium}
          compact
        />
        <NutrientGauge
          label="Phosphorus"
          current={dailyTotals.phosphorus}
          limit={ckdStage3Limits.phosphorus}
          compact
        />
        <NutrientGauge
          label="Protein"
          current={dailyTotals.protein}
          limit={ckdStage3Limits.protein}
          compact
        />
      </div>
    </Card>
  );
}
