'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

interface BarcodeScannerProps {
  onScan: () => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isScanningRef = useRef(false);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    const startScanning = async () => {
      if (!videoRef.current) return;

      try {
        const codeReader = new BrowserMultiFormatReader();
        readerRef.current = codeReader;

        const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();

        if (videoInputDevices.length === 0) {
          console.error('No video input devices found');
          return;
        }

        // Try to find the back-facing (environment) camera
        const backCamera = videoInputDevices.find((device) =>
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('environment') ||
          device.label.toLowerCase().includes('rear')
        );

        // Use back camera if found, otherwise use the last camera (usually back on mobile)
        const selectedDeviceId = backCamera
          ? backCamera.deviceId
          : videoInputDevices[videoInputDevices.length - 1].deviceId;

        codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result) => {
            if (result && !isScanningRef.current) {
              isScanningRef.current = true;
              onScan();
            }
          }
        );
      } catch (error) {
        console.error('Error starting scanner:', error);
      }
    };

    startScanning();

    return () => {
      // Cleanup will be handled by page navigation
      readerRef.current = null;
    };
  }, [onScan]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
      />
    </div>
  );
}
