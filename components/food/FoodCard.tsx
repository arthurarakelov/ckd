import React from 'react';
import { Card } from '@/components/ui/Card';
import { FoodItem, Portion } from '@/types';

interface FoodCardProps {
  food: FoodItem;
  portion?: Portion;
}

export function FoodCard({ food, portion }: FoodCardProps) {
  const nutrition = portion
    ? {
        sodium: Math.round(food.nutrition.sodium * portion.multiplier),
        potassium: Math.round(food.nutrition.potassium * portion.multiplier),
        phosphorus: Math.round(food.nutrition.phosphorus * portion.multiplier),
        protein: Math.round(food.nutrition.protein * portion.multiplier),
        calories: Math.round(food.nutrition.calories * portion.multiplier),
      }
    : food.nutrition;

  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-4xl">{food.emoji || '🥫'}</span>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{food.name}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {portion ? portion.label : food.servingSize}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-xs text-gray-600">Sodium</div>
              <div className="text-base font-bold text-gray-900">{nutrition.sodium}mg</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-xs text-gray-600">Potassium</div>
              <div className="text-base font-bold text-gray-900">{nutrition.potassium}mg</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-xs text-gray-600">Phosphorus</div>
              <div className="text-base font-bold text-gray-900">{nutrition.phosphorus}mg</div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="text-xs text-gray-600">Protein</div>
              <div className="text-base font-bold text-gray-900">{nutrition.protein}g</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
