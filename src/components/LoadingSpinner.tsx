import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <div className="absolute inset-0 rounded-full h-12 w-12 border-2 border-gray-700"></div>
      </div>
    </div>
  );
};