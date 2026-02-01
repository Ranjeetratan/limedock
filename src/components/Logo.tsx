import React from 'react';
import Image from 'next/image';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <Image 
        src="/limedock-logo.svg" 
        alt="LimeDock Logo" 
        width={141} 
        height={24} 
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
};
