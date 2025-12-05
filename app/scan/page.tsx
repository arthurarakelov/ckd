'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BarcodeScanner } from '@/components/scanner/BarcodeScanner';
import { ScanningOverlay } from '@/components/scanner/ScanningOverlay';
import { useApp } from '@/context/AppContext';
import { X } from 'lucide-react';

export default function ScanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { simulateScan } = useApp();
  const [showOverlay, setShowOverlay] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFreshProduce, setIsFreshProduce] = useState(false);
  const isShoppingMode = searchParams.get('mode') === 'shopping';

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      handleScan();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleScan = () => {
    setShowOverlay(true);
    setCountdown(null);

    const detectedFood = simulateScan(isFreshProduce, isShoppingMode);

    setTimeout(() => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('scannedFoodId', detectedFood.id);
      }
      if (isShoppingMode) {
        router.push('/shopping-assistant');
      } else {
        router.push('/scan-result');
      }
    }, 1500);
  };

  const handleNoBarcodeClick = () => {
    setIsFreshProduce(true);
    setCountdown(10);
  };

  return (
    <div className="fixed inset-0 bg-black">
      <button
        onClick={() => router.back()}
        className="absolute top-6 right-6 z-40 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
      >
        <X size={24} className="text-gray-800" />
      </button>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-white rounded-2xl pointer-events-none">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-500 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-500 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-500 rounded-br-xl" />

        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary-500 animate-scan" />
      </div>

      {countdown !== null && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-white text-xl font-semibold drop-shadow-lg">
              Scanning fresh produce...
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-32 left-0 right-0 px-6 z-40">
        <div className="text-center space-y-4">
          {countdown === null && (
            <>
              <p className="text-white text-lg font-semibold drop-shadow-lg">
                Point camera at barcode
              </p>
              <button
                onClick={handleNoBarcodeClick}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold backdrop-blur-sm transition-colors border border-white/40"
              >
                No Barcode? (Fresh Produce)
              </button>
            </>
          )}
        </div>
      </div>

      <BarcodeScanner onScan={() => {
        setIsFreshProduce(false);
        handleScan();
      }} />

      {showOverlay && <ScanningOverlay isFreshProduce={isFreshProduce} />}

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0;
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
