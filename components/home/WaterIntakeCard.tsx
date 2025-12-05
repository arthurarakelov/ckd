import React from 'react';
import { Card } from '@/components/ui/Card';
import { Droplets } from 'lucide-react';

export function WaterIntakeCard() {
  const glasses = 6;
  const goal = 8;

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center">
          <Droplets className="text-accent" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Water Intake</h3>
      </div>
      <div className="space-y-2">
        <div className="flex gap-1">
          {Array.from({ length: goal }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-8 rounded ${
                i < glasses ? 'bg-accent' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">
          {glasses} / {goal} glasses today
        </p>
      </div>
    </Card>
  );
}
