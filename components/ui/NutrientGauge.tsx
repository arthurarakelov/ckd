import React from 'react';
import { NutrientLimit } from '@/types';

interface NutrientGaugeProps {
  label: string;
  current: number;
  limit: NutrientLimit;
  compact?: boolean;
}

export function NutrientGauge({ label, current, limit, compact = false }: NutrientGaugeProps) {
  const percentage = (current / limit.max) * 100;
  const isOverLimit = current > limit.target;
  const isCritical = current > limit.max;

  let barColor = 'bg-success';
  if (isCritical) {
    barColor = 'bg-danger';
  } else if (isOverLimit) {
    barColor = 'bg-warning';
  }

  if (compact) {
    return (
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className={`text-sm font-semibold ${isCritical ? 'text-danger' : isOverLimit ? 'text-warning' : 'text-gray-900'}`}>
            {current.toLocaleString()} / {limit.target.toLocaleString()} {limit.unit}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden relative">
          {/* Target marker */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10"
            style={{ left: `${(limit.target / limit.max) * 100}%` }}
          />
          {/* Progress bar */}
          <div
            className={`h-full rounded-full transition-all duration-300 ${barColor}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-xs text-gray-500">
          Target: {limit.target.toLocaleString()} {limit.unit}
        </span>
      </div>
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden relative">
          {/* Min marker */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gray-300 z-10"
            style={{ left: `${(limit.min / limit.max) * 100}%` }}
          />
          {/* Target marker */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gray-500 z-10"
            style={{ left: `${(limit.target / limit.max) * 100}%` }}
          />
          {/* Progress bar */}
          <div
            className={`h-full rounded-full transition-all duration-300 ${barColor}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className={`text-lg font-bold ${isCritical ? 'text-danger' : isOverLimit ? 'text-warning' : 'text-gray-900'}`}>
          {current.toLocaleString()} {limit.unit}
        </span>
        <span className="text-xs text-gray-500">
          Max: {limit.max.toLocaleString()} {limit.unit}
        </span>
      </div>
    </div>
  );
}
