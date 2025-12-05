import React from 'react';
import { Card } from '@/components/ui/Card';
import { Portion } from '@/types';
import { Check } from 'lucide-react';

interface PortionSelectorProps {
  portions: Portion[];
  selectedPortion: Portion | null;
  onSelect: (portion: Portion) => void;
}

export function PortionSelector({
  portions,
  selectedPortion,
  onSelect,
}: PortionSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">Select Portion</h3>
      <div className="space-y-2">
        {portions.map((portion) => (
          <Card
            key={portion.label}
            className={`p-4 cursor-pointer transition-all ${
              selectedPortion?.label === portion.label
                ? 'border-2 border-primary-500 bg-primary-50'
                : 'hover:border-primary-300'
            }`}
            onClick={() => onSelect(portion)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{portion.label}</span>
              {selectedPortion?.label === portion.label && (
                <Check size={20} className="text-primary-500" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
