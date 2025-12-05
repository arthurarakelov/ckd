import React from 'react';
import { Card } from '@/components/ui/Card';
import { NutritionInfo } from '@/types';

interface NutritionBreakdownProps {
  nutrition: NutritionInfo;
  dailyTotals: NutritionInfo;
}

export function NutritionBreakdown({ nutrition, dailyTotals }: NutritionBreakdownProps) {
  const newTotals = {
    sodium: dailyTotals.sodium + nutrition.sodium,
    potassium: dailyTotals.potassium + nutrition.potassium,
    phosphorus: dailyTotals.phosphorus + nutrition.phosphorus,
    protein: dailyTotals.protein + nutrition.protein,
    calories: dailyTotals.calories + nutrition.calories,
  };

  const NutrientRow = ({ label, current, added, unit }: { label: string; current: number; added: number; unit: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="text-right">
        <div className="text-sm">
          <span className="text-gray-600">{current.toLocaleString()}</span>
          <span className="text-primary-600 font-semibold mx-1">+{added.toLocaleString()}</span>
          <span className="text-gray-600">{unit}</span>
        </div>
        <div className="text-xs text-gray-500">
          New total: {(current + added).toLocaleString()} {unit}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Nutrition Impact</h3>
      <div className="space-y-1">
        <NutrientRow
          label="Sodium"
          current={dailyTotals.sodium}
          added={nutrition.sodium}
          unit="mg"
        />
        <NutrientRow
          label="Potassium"
          current={dailyTotals.potassium}
          added={nutrition.potassium}
          unit="mg"
        />
        <NutrientRow
          label="Phosphorus"
          current={dailyTotals.phosphorus}
          added={nutrition.phosphorus}
          unit="mg"
        />
        <NutrientRow
          label="Protein"
          current={dailyTotals.protein}
          added={nutrition.protein}
          unit="g"
        />
        <NutrientRow
          label="Calories"
          current={dailyTotals.calories}
          added={nutrition.calories}
          unit="kcal"
        />
      </div>
    </Card>
  );
}
