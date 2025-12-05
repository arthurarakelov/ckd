import React from 'react';
import { Card } from '@/components/ui/Card';
import { alternativesForPringles, alternativesForSweetPotato } from '@/data/foods';
import { Lightbulb } from 'lucide-react';

interface AlternativesSuggestionProps {
  foodId: string;
}

export function AlternativesSuggestion({ foodId }: AlternativesSuggestionProps) {
  const alternatives = foodId === 'sweetPotato' ? alternativesForSweetPotato : alternativesForPringles;

  return (
    <Card className="p-5 border-2 border-primary-500 bg-primary-50">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Lightbulb className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary-700">Better Alternatives</h3>
          <p className="text-sm text-gray-700 mt-2 mb-3">
            Consider these kidney-friendly options instead:
          </p>
          <div className="space-y-2">
            {alternatives.map((snack) => (
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
        </div>
      </div>
    </Card>
  );
}
