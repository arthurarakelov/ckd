'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { hyperkalemiaSymptoms } from '@/data/drug-interactions';
import { AlertCircle, Check } from 'lucide-react';

interface HyperkalemiaCheckProps {
  onComplete: (hasSevereSymptoms: boolean) => void;
}

export function HyperkalemiaCheck({ onComplete }: HyperkalemiaCheckProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    const newSet = new Set(selectedSymptoms);
    if (newSet.has(symptomId)) {
      newSet.delete(symptomId);
    } else {
      newSet.add(symptomId);
    }
    setSelectedSymptoms(newSet);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const hasSevere = Array.from(selectedSymptoms).some((id) => {
      const symptom = hyperkalemiaSymptoms.find((s) => s.id === id);
      return symptom?.severity === 'severe';
    });

    setTimeout(() => {
      onComplete(hasSevere);
    }, hasSevere ? 0 : 2000);
  };

  const hasSevereSymptoms = Array.from(selectedSymptoms).some((id) => {
    const symptom = hyperkalemiaSymptoms.find((s) => s.id === id);
    return symptom?.severity === 'severe';
  });

  if (submitted && hasSevereSymptoms) {
    return (
      <Card className="p-5 border-2 border-danger bg-danger-light">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-danger rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-danger-dark">Seek Medical Attention</h3>
            <p className="text-sm text-gray-700 mt-2">
              Based on your symptoms, you should contact your healthcare provider immediately or
              seek emergency care. These symptoms may indicate dangerously high potassium levels.
            </p>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-xs font-semibold text-danger-dark">Emergency Contact</p>
              <p className="text-xs text-gray-600 mt-1">
                Call 911 or go to the nearest emergency room if symptoms worsen.
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (submitted && !hasSevereSymptoms && selectedSymptoms.size > 0) {
    return (
      <Card className="p-5 border-2 border-warning bg-warning-light">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-warning-dark">Monitor Your Symptoms</h3>
            <p className="text-sm text-gray-700 mt-2">
              You reported some symptoms. Please monitor how you feel and contact your healthcare
              provider if symptoms worsen or if you develop any severe symptoms.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (submitted && selectedSymptoms.size === 0) {
    return (
      <Card className="p-5 border-2 border-success bg-success-light">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-success-dark">No Symptoms Detected</h3>
            <p className="text-sm text-gray-700 mt-2">
              You're not experiencing any hyperkalemia symptoms. Continue to monitor how you feel
              after eating this food.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 border-2 border-warning bg-warning-light">
      <h3 className="text-lg font-bold text-gray-800 mb-3">Symptom Check</h3>
      <p className="text-sm text-gray-700 mb-4">
        Are you currently experiencing any of these symptoms?
      </p>
      <div className="space-y-2 mb-4">
        {hyperkalemiaSymptoms.map((symptom) => (
          <label
            key={symptom.id}
            className="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedSymptoms.has(symptom.id)}
              onChange={() => toggleSymptom(symptom.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">{symptom.label}</span>
              {symptom.severity === 'severe' && (
                <span className="ml-2 text-xs px-2 py-0.5 bg-danger text-white rounded-full">
                  Severe
                </span>
              )}
            </div>
          </label>
        ))}
        <label className="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="checkbox"
            checked={selectedSymptoms.size === 0 && submitted === false}
            onChange={() => setSelectedSymptoms(new Set())}
            className="mt-1"
          />
          <span className="text-sm font-medium text-gray-900">None of these</span>
        </label>
      </div>
      <Button onClick={handleSubmit} variant="primary" className="w-full">
        Continue
      </Button>
    </Card>
  );
}
