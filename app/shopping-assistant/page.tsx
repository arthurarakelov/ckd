'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { FoodCard } from '@/components/food/FoodCard';
import { SafetyRating } from '@/components/shopping/SafetyRating';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { foods } from '@/data/foods';
import { ckdStage3Limits } from '@/data/ckd-limits';
import { alternativesForWheatThins } from '@/data/foods';
import { FoodItem } from '@/types';

export default function ShoppingAssistantPage() {
  const router = useRouter();
  const { user } = useApp();
  const [food, setFood] = useState<FoodItem | null>(null);

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

  if (!food) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      </PageContainer>
    );
  }

  // Calculate safety rating
  const servingSodium = food.nutrition.sodium;
  const servingPotassium = food.nutrition.potassium;

  let rating: 'safe' | 'moderate' | 'avoid' = 'safe';
  let reason = '';

  if (servingSodium > 300) {
    rating = 'avoid';
    reason = `High sodium content (${servingSodium}mg per serving). This could significantly impact your daily sodium limit of ${ckdStage3Limits.sodium.target}mg.`;
  } else if (servingSodium > 150) {
    rating = 'moderate';
    reason = `Moderate sodium content (${servingSodium}mg per serving). Watch portion sizes to stay within your daily limit.`;
  } else {
    rating = 'safe';
    reason = `Low sodium content (${servingSodium}mg per serving). This is a kidney-friendly choice within recommended limits.`;
  }

  // Check for drug interactions
  const hasLosartan = user.medications.some((m) => m.name === 'Losartan');
  if (hasLosartan && servingPotassium > 400) {
    rating = 'avoid';
    reason = `This food contains ${servingPotassium}mg of potassium per serving. Combined with your Losartan medication, this could cause dangerous potassium buildup (hyperkalemia).`;
  }

  return (
    <PageContainer className="p-4">
      <div className="space-y-4 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Shopping Assistant</h1>
          <p className="text-gray-600">Comprehensive product analysis for CKD patients</p>
        </div>

        <FoodCard food={food} />

        <SafetyRating rating={rating} reason={reason} />

        <Card className="p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Nutritional Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Sodium per serving</span>
              <span className="font-bold text-gray-900">{servingSodium}mg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Potassium per serving</span>
              <span className="font-bold text-gray-900">{servingPotassium}mg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Phosphorus per serving</span>
              <span className="font-bold text-gray-900">{food.nutrition.phosphorus}mg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Protein per serving</span>
              <span className="font-bold text-gray-900">{food.nutrition.protein}g</span>
            </div>
          </div>
        </Card>

        {rating !== 'safe' && (
          <Card className="p-5 border-2 border-primary-500 bg-primary-50">
            <h3 className="text-lg font-bold text-primary-700 mb-3">Better Alternatives</h3>
            <p className="text-sm text-gray-700 mb-3">
              Consider these kidney-friendly options instead:
            </p>
            <div className="space-y-2">
              {alternativesForWheatThins.map((snack) => (
                <div
                  key={snack.name}
                  className="p-3 bg-white rounded-lg flex justify-between items-center"
                >
                  <span className="font-medium text-gray-900">{snack.name}</span>
                  <div className="text-xs text-gray-600">
                    <span className="ml-2">Sodium: {snack.sodium}mg</span>
                    <span className="ml-2">Potassium: {snack.potassium}mg</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="space-y-3">
          <Button onClick={() => router.push('/')} variant="primary" className="w-full">
            Done Shopping
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
