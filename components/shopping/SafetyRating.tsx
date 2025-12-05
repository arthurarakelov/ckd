import React from 'react';
import { Card } from '@/components/ui/Card';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface SafetyRatingProps {
  rating: 'safe' | 'moderate' | 'avoid';
  reason: string;
}

export function SafetyRating({ rating, reason }: SafetyRatingProps) {
  const config = {
    safe: {
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success-light',
      borderColor: 'border-success',
      label: 'Safe for CKD',
    },
    moderate: {
      icon: AlertTriangle,
      color: 'text-warning',
      bgColor: 'bg-warning-light',
      borderColor: 'border-warning',
      label: 'Use with Caution',
    },
    avoid: {
      icon: XCircle,
      color: 'text-danger',
      bgColor: 'bg-danger-light',
      borderColor: 'border-danger',
      label: 'Not Recommended',
    },
  };

  const { icon: Icon, color, bgColor, borderColor, label } = config[rating];

  return (
    <Card className={`p-6 border-2 ${borderColor} ${bgColor}`}>
      <div className="flex items-start gap-4">
        <div className={`${color}`}>
          <Icon size={48} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{label}</h2>
          <p className="text-gray-700">{reason}</p>
        </div>
      </div>
    </Card>
  );
}
