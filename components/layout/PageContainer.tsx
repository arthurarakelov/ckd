import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className={`max-w-md mx-auto ${className}`}>{children}</div>
    </div>
  );
}
