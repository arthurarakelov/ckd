'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useApp } from '@/context/AppContext';
import { DollarSign } from 'lucide-react';

export function CKDSavingsCard() {
  const { user } = useApp();

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-success-light rounded-full flex items-center justify-center">
          <DollarSign className="text-success" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">CKD Savings Goal</h3>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-bold text-gray-900">
            ${user.savings.current.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">
            / ${user.savings.goal.toLocaleString()}
          </span>
        </div>
        <ProgressBar
          current={user.savings.current}
          max={user.savings.goal}
          color="bg-success"
        />
        <p className="text-xs text-gray-600 mt-2">
          Keep up the great work! You're {((user.savings.current / user.savings.goal) * 100).toFixed(1)}% toward your goal.
        </p>
      </div>
    </Card>
  );
}
