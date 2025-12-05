'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, ClipboardList, ScanLine } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center h-16 relative">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center w-16 ${isActive('/') && pathname === '/' ? 'text-primary-600' : 'text-gray-500'}`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            href="/daily-log"
            className={`flex flex-col items-center justify-center w-16 ${isActive('/daily-log') ? 'text-primary-600' : 'text-gray-500'}`}
          >
            <ClipboardList size={24} />
            <span className="text-xs mt-1">Log</span>
          </Link>

          {/* Scan button - centered and elevated */}
          <div className="flex flex-col items-center justify-center w-16">
            <Link
              href="/scan"
              className="absolute -top-6 flex items-center justify-center w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg transition-colors"
            >
              <ScanLine size={28} />
            </Link>
          </div>

          <div className="w-16" /> {/* Spacer for scan button */}

          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center w-16 ${isActive('/profile') ? 'text-primary-600' : 'text-gray-500'}`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
