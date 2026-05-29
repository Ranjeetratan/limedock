import React from 'react';
import Image from 'next/image';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Image
      src="/limedock-logo.svg"
      alt="LimeDock"
      width={141}
      height={24}
      className={`brightness-0 invert object-contain ${className}`}
      priority
    />
  );
};
