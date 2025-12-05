'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { FoodCard } from '@/components/food/FoodCard';
import { NutritionBreakdown } from '@/components/food/NutritionBreakdown';
import { SodiumWarning } from '@/components/warnings/SodiumWarning';
import { DrugInteractionWarning } from '@/components/warnings/DrugInteractionWarning';
import { HyperkalemiaCheck } from '@/components/warnings/HyperkalemiaCheck';
import { AlternativesSuggestion } from '@/components/warnings/AlternativesSuggestion';
import { RecoveryPlan } from '@/components/warnings/RecoveryPlan';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { ckdStage3Limits } from '@/data/ckd-limits';

export default function AnalysisPage() {
  const router = useRouter();
  const { scannedFood, user, dailyTotals, addFoodToLog } = useApp();
  const [showHyperkalemiaCheck, setShowHyperkalemiaCheck] = useState(false);
  const [showRecoveryPlan, setShowRecoveryPlan] = useState(false);
  const [decidedToHaveIt, setDecidedToHaveIt] = useState(false);

  useEffect(() => {
    if (!scannedFood) {
      router.replace('/');
    }
  }, []);

  if (!scannedFood) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      </PageContainer>
    );
  }

  const { food, portion, actualNutrition } = scannedFood;
  const projectedSodium = dailyTotals.sodium + actualNutrition.sodium;
  const hasSodiumWarning = projectedSodium > ckdStage3Limits.sodium.target;
  const hasLosartan = user.medications.some((m) => m.name === 'Losartan');
  const hasPotassiumWarning = hasLosartan && actualNutrition.potassium >= 400;

  const handleHaveItAnyway = () => {
    setDecidedToHaveIt(true);
    if (hasPotassiumWarning) {
      setShowHyperkalemiaCheck(true);
    } else if (hasSodiumWarning) {
      setShowRecoveryPlan(true);
    }
  };

  const handleHyperkalemiaComplete = (hasSevere: boolean) => {
    if (!hasSevere) {
      if (hasSodiumWarning) {
        setShowRecoveryPlan(true);
      }
    }
  };

  const handleAcceptAndAdd = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    addFoodToLog({
      id: Date.now().toString(),
      time: timeString,
      mealType: 'snack',
      name: `${food.name} (${portion.label})`,
      nutrition: actualNutrition,
    }, food.id);

    router.push('/');
  };

  const handleChooseAlternative = () => {
    router.push('/');
  };

  return (
    <PageContainer className="p-4">
      <div className="space-y-4 mt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Analysis</h1>
          <p className="text-gray-600">Here's how this food affects your health</p>
        </div>

        <FoodCard food={food} portion={portion} />

        {hasSodiumWarning && !decidedToHaveIt && (
          <SodiumWarning
            projectedSodium={projectedSodium}
            targetSodium={ckdStage3Limits.sodium.target}
          />
        )}

        {hasPotassiumWarning && !decidedToHaveIt && (
          <DrugInteractionWarning
            medicationName="Losartan"
            potassiumAmount={actualNutrition.potassium}
          />
        )}

        {showHyperkalemiaCheck && <HyperkalemiaCheck onComplete={handleHyperkalemiaComplete} />}

        <NutritionBreakdown nutrition={actualNutrition} dailyTotals={dailyTotals} />

        {(hasSodiumWarning || hasPotassiumWarning) && !decidedToHaveIt && (
          <AlternativesSuggestion foodId={food.id} />
        )}

        {showRecoveryPlan && (
          <RecoveryPlan
            overAmount={projectedSodium - ckdStage3Limits.sodium.target}
            targetSodium={ckdStage3Limits.sodium.target}
          />
        )}

        <div className="space-y-3">
          {!decidedToHaveIt && (hasSodiumWarning || hasPotassiumWarning) && (
            <>
              <Button onClick={handleChooseAlternative} variant="success" className="w-full">
                Choose Alternative
              </Button>
              <Button onClick={handleHaveItAnyway} variant="warning" className="w-full">
                I'll Have It Anyway
              </Button>
            </>
          )}

          {(decidedToHaveIt || (!hasSodiumWarning && !hasPotassiumWarning)) && (
            <Button onClick={handleAcceptAndAdd} variant="primary" className="w-full">
              Add to Food Log
            </Button>
          )}

          <Button onClick={() => router.push('/')} variant="secondary" className="w-full">
            Cancel
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
