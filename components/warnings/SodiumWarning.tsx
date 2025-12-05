import React from 'react';
import { Card } from '@/components/ui/Card';
import { AlertTriangle } from 'lucide-react';

interface SodiumWarningProps {
  projectedSodium: number;
  targetSodium: number;
}

export function SodiumWarning({ projectedSodium, targetSodium }: SodiumWarningProps) {
  const overAmount = projectedSodium - targetSodium;

  return (
    <Card className="p-5 border-2 border-warning bg-warning-light">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-warning-dark">Sodium Warning</h3>
          <p className="text-sm text-gray-700 mt-2">
            Eating this will bring your sodium intake to{' '}
            <span className="font-bold">{projectedSodium.toLocaleString()}mg</span>, which is{' '}
            <span className="font-bold">{overAmount.toLocaleString()}mg over</span> your daily
            target of {targetSodium.toLocaleString()}mg.
          </p>
          <div className="mt-3 p-3 bg-white rounded-lg">
            <p className="text-xs text-gray-600">
              Excess sodium can increase blood pressure and strain your kidneys. Consider choosing
              a lower-sodium alternative.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
