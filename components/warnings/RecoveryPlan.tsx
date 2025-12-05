import React from 'react';
import { Card } from '@/components/ui/Card';
import { Calendar } from 'lucide-react';

interface RecoveryPlanProps {
  overAmount: number;
  targetSodium: number;
}

export function RecoveryPlan({ overAmount, targetSodium }: RecoveryPlanProps) {
  const dailyReduction = Math.round(overAmount / 3);
  const newDailyLimit = targetSodium - dailyReduction;

  return (
    <Card className="p-5 border-2 border-primary-500 bg-primary-50">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Calendar className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary-700">Recovery Plan</h3>
          <p className="text-sm text-gray-700 mt-2">
            You'll be over your sodium limit by{' '}
            <span className="font-bold">{overAmount.toLocaleString()}mg</span>. Here's how to get
            back on track:
          </p>
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-white rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-gray-900">Next 3 Days</span>
                <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                  Recovery Period
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Reduce your daily sodium limit to{' '}
                <span className="font-bold">{newDailyLimit.toLocaleString()}mg</span> (usually{' '}
                {targetSodium.toLocaleString()}mg)
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <p className="text-xs font-semibold text-gray-900 mb-1">Tips to stay on track:</p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                <li>Choose fresh fruits and vegetables</li>
                <li>Avoid processed and packaged foods</li>
                <li>Use herbs and spices instead of salt</li>
                <li>Drink plenty of water</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
