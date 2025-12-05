import React from 'react';
import { Card } from '@/components/ui/Card';
import { AlertCircle } from 'lucide-react';

interface DrugInteractionWarningProps {
  medicationName: string;
  potassiumAmount: number;
}

export function DrugInteractionWarning({
  medicationName,
  potassiumAmount,
}: DrugInteractionWarningProps) {
  return (
    <Card className="p-5 border-2 border-danger bg-danger-light">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-danger rounded-full flex items-center justify-center flex-shrink-0">
          <AlertCircle className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-danger-dark">Medication Alert</h3>
          <p className="text-sm text-gray-700 mt-2">
            This food contains <span className="font-bold">{potassiumAmount.toLocaleString()}mg of potassium</span>.
            You are taking <span className="font-bold">{medicationName}</span>, which can increase
            potassium levels in your blood.
          </p>
          <div className="mt-3 p-3 bg-white rounded-lg">
            <p className="text-xs font-semibold text-danger-dark mb-2">Risk: Hyperkalemia</p>
            <p className="text-xs text-gray-600">
              The combination of {medicationName} and high-potassium foods can lead to dangerously
              high potassium levels (hyperkalemia), which may cause irregular heartbeat, muscle
              weakness, or other serious complications.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
