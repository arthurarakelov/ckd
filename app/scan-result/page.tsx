'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { FoodCard } from '@/components/food/FoodCard';
import { PortionSelector } from '@/components/food/PortionSelector';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { foods } from '@/data/foods';
import { Portion, FoodItem } from '@/types';

export default function ScanResultPage() {
  const router = useRouter();
  const { setScannedFood } = useApp();
  const [food, setFood] = useState<FoodItem | null>(null);
  const [selectedPortion, setSelectedPortion] = useState<Portion | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const foodId = sessionStorage.getItem('scannedFoodId');
      if (foodId && foods[foodId]) {
        setFood(foods[foodId]);
      } else {
        router.replace('/');
      }
    }
  }, []);

  const handleContinue = () => {
    if (!food || !selectedPortion) return;

    const actualNutrition = {
      sodium: Math.round(food.nutrition.sodium * selectedPortion.multiplier),
      potassium: Math.round(food.nutrition.potassium * selectedPortion.multiplier),
      phosphorus: Math.round(food.nutrition.phosphorus * selectedPortion.multiplier),
      protein: Math.round(food.nutrition.protein * selectedPortion.multiplier),
      calories: Math.round(food.nutrition.calories * selectedPortion.multiplier),
    };

    setScannedFood({
      food,
      portion: selectedPortion,
      actualNutrition,
    });

    router.push('/analysis');
  };

  if (!food) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="p-4">
      <div className="space-y-6 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Food Detected!</h1>
          <p className="text-gray-600">Select how much you plan to eat</p>
        </div>

        <FoodCard food={food} portion={selectedPortion || undefined} />

        <PortionSelector
          portions={food.portions}
          selectedPortion={selectedPortion}
          onSelect={setSelectedPortion}
        />

        <div className="flex gap-3">
          <Button onClick={() => router.push('/')} variant="secondary" className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            variant="primary"
            className="flex-1"
            disabled={!selectedPortion}
          >
            Continue
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
