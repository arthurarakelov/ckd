'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { hyperkalemiaSymptoms } from '@/data/drug-interactions';
import { useApp } from '@/context/AppContext';
import { AlertCircle, X } from 'lucide-react';

export function SymptomCheckWidget() {
  const { dismissSymptomCheck } = useApp();
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

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
    setShowResult(true);
  };

  const handleDismiss = () => {
    dismissSymptomCheck();
  };

  const hasSevereSymptoms = Array.from(selectedSymptoms).some((id) => {
    const symptom = hyperkalemiaSymptoms.find((s) => s.id === id);
    return symptom?.severity === 'severe';
  });

  if (showResult) {
    if (hasSevereSymptoms) {
      return (
        <Card className="p-5 border-2 border-danger bg-danger-light relative">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          >
            <X size={20} />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-danger rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="text-white" size={20} />
            </div>
            <div className="flex-1 pr-6">
              <h3 className="text-lg font-bold text-danger-dark">Seek Medical Attention</h3>
              <p className="text-sm text-gray-700 mt-2">
                Based on your symptoms, you should contact your healthcare provider immediately or
                seek emergency care. These symptoms may indicate dangerously high potassium levels.
              </p>
              <div className="mt-3 p-3 bg-white rounded-lg">
                <p className="text-xs font-semibold text-danger-dark">Emergency Contact</p>
                <p className="text-xs text-gray-600 mt-1">
                  Call 911 or go to the nearest emergency room if symptoms worsen.
                </p>
              </div>
            </div>
          </div>
        </Card>
      );
    } else if (selectedSymptoms.size > 0) {
      return (
        <Card className="p-5 border-2 border-warning bg-warning-light relative">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          >
            <X size={20} />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-warning rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="text-white" size={20} />
            </div>
            <div className="flex-1 pr-6">
              <h3 className="text-lg font-bold text-warning-dark">Monitor Your Symptoms</h3>
              <p className="text-sm text-gray-700 mt-2">
                You reported some symptoms. Please monitor how you feel and contact your healthcare
                provider if symptoms worsen or if you develop any severe symptoms.
              </p>
            </div>
          </div>
        </Card>
      );
    } else {
      setTimeout(() => dismissSymptomCheck(), 3000);
      return (
        <Card className="p-5 border-2 border-success bg-success-light">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-success-dark">No Symptoms Detected</h3>
              <p className="text-sm text-gray-700 mt-2">
                Great! Continue to monitor how you feel throughout the day.
              </p>
            </div>
          </div>
        </Card>
      );
    }
  }

  return (
    <Card className="p-5 border-2 border-warning bg-warning-light relative">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      >
        <X size={20} />
      </button>
      <div className="pr-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          <AlertCircle className="inline mr-2 text-warning" size={20} />
          Hyperkalemia Symptom Check
        </h3>
        <p className="text-sm text-gray-700 mb-3">
          You ate a high-potassium food earlier. Are you experiencing any of these symptoms?
        </p>
        <div className="space-y-2 mb-4">
          {hyperkalemiaSymptoms.map((symptom) => (
            <label
              key={symptom.id}
              className="flex items-start gap-3 p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
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
          <label className="flex items-start gap-3 p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={selectedSymptoms.size === 0 && !showResult}
              onChange={() => setSelectedSymptoms(new Set())}
              className="mt-1"
            />
            <span className="text-sm font-medium text-gray-900">None of these</span>
          </label>
        </div>
        <Button onClick={handleSubmit} variant="warning" className="w-full">
          Submit
        </Button>
      </div>
    </Card>
  );
}
