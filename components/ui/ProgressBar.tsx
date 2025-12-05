import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  className?: string;
  showPercentage?: boolean;
  color?: string;
}

export function ProgressBar({
  current,
  max,
  className = '',
  showPercentage = false,
  color = 'bg-primary-500',
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-gray-600 mt-1 text-right">
          {percentage.toFixed(0)}%
        </div>
      )}
    </div>
  );
}
