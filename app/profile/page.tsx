'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { useApp } from '@/context/AppContext';
import { QrCode } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useApp();

  return (
    <PageContainer>
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold text-3xl">
            ES
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
            <QrCode className="text-primary-600" size={40} />
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <Card className="p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">User Health ID</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Date of Birth:</span>
              <span className="font-semibold">{user.demographics.dateOfBirth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Age:</span>
              <span className="font-semibold">{user.demographics.age} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gender:</span>
              <span className="font-semibold">{user.demographics.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Height:</span>
              <span className="font-semibold">{user.demographics.height}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weight:</span>
              <span className="font-semibold">{user.demographics.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Blood Type:</span>
              <span className="font-semibold">{user.demographics.bloodType}</span>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Allergies</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Medications:</h3>
              <div className="flex flex-wrap gap-2">
                {user.allergies.medications.map((med) => (
                  <span
                    key={med}
                    className="px-3 py-1 bg-danger-light text-danger-dark rounded-full text-xs font-medium"
                  >
                    {med}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Foods:</h3>
              <div className="flex flex-wrap gap-2">
                {user.allergies.foods.map((food) => (
                  <span
                    key={food}
                    className="px-3 py-1 bg-warning-light text-warning-dark rounded-full text-xs font-medium"
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Current Medications</h2>
          <div className="space-y-2">
            {user.medications.map((med) => (
              <div key={med.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-900">{med.name}</span>
                <span className="text-sm text-gray-600">{med.dosage}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Health Conditions</h2>
          <div className="p-3 bg-primary-50 rounded-lg">
            <span className="font-semibold text-primary-700">
              Chronic Kidney Disease - Stage {user.ckdStage}
            </span>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
