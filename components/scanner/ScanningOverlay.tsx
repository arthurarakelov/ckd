import React from 'react';
import { Check } from 'lucide-react';

interface ScanningOverlayProps {
  isFreshProduce?: boolean;
}

export function ScanningOverlay({ isFreshProduce = false }: ScanningOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center animate-scale-in">
          <Check size={32} className="text-white" />
        </div>
        <p className="text-xl font-semibold text-gray-800">
          {isFreshProduce ? 'Food Detected!' : 'Barcode Detected!'}
        </p>
        <p className="text-sm text-gray-600">Processing...</p>
      </div>
    </div>
  );
}
