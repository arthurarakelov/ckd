'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export function WelcomeHeader() {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-b-3xl shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold text-xl">
          ES
        </div>
        <div>
          <p className="text-sm opacity-90">Hi there,</p>
          <h1 className="text-2xl font-bold">Elza Sato</h1>
        </div>
      </div>
    </div>
  );
}
