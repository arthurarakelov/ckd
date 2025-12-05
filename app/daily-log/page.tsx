'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { NutrientGauge } from '@/components/ui/NutrientGauge';
import { useApp } from '@/context/AppContext';
import { ckdStage3Limits } from '@/data/ckd-limits';
import { Coffee, Sun, Moon, Cookie } from 'lucide-react';

export default function DailyLogPage() {
  const { foodLog, dailyTotals } = useApp();

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return <Coffee size={20} className="text-warning" />;
      case 'lunch':
        return <Sun size={20} className="text-warning" />;
      case 'dinner':
        return <Moon size={20} className="text-primary-600" />;
      case 'snack':
        return <Cookie size={20} className="text-accent" />;
      default:
        return <Cookie size={20} className="text-gray-500" />;
    }
  };

  return (
    <PageContainer className="p-4">
      <div className="space-y-4 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Daily Log</h1>
          <p className="text-gray-600">{new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </div>

        <Card className="p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Totals</h2>
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
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Calories</span>
              <span className="text-lg font-bold text-gray-900">{dailyTotals.calories} kcal</span>
            </div>
          </div>
        </Card>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Food Log</h2>
          <div className="space-y-3">
            {foodLog.map((entry) => (
              <Card key={entry.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    {getMealIcon(entry.mealType)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{entry.name}</h3>
                        <p className="text-xs text-gray-500">{entry.time}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Sodium:</span>
                        <span className="ml-1 font-semibold">{entry.nutrition.sodium}mg</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Potassium:</span>
                        <span className="ml-1 font-semibold">{entry.nutrition.potassium}mg</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Phosphorus:</span>
                        <span className="ml-1 font-semibold">{entry.nutrition.phosphorus}mg</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Protein:</span>
                        <span className="ml-1 font-semibold">{entry.nutrition.protein}g</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
