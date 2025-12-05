'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { useApp } from '@/context/AppContext';
import { Activity } from 'lucide-react';

export function CKDSummaryCard() {
  const { user } = useApp();

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
          <Activity className="text-primary-600" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">CKD Summary</h3>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Stage:</span>
          <span className="font-semibold text-gray-900">Stage {user.ckdStage}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Medications:</span>
          <span className="font-semibold text-gray-900">{user.medications.length} active</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Last Check:</span>
          <span className="font-semibold text-gray-900">2 weeks ago</span>
        </div>
      </div>
    </Card>
  );
}
