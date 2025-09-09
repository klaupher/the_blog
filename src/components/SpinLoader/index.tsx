import clsx from 'clsx';
import React from 'react';

type SpinLoaderProps = {
  className?: string;
};

export function SpinLoader({ className }: SpinLoaderProps) {
  return (
    <div className={clsx('flex', 'justify-center', 'items-center', className)}>
      <div
        className={clsx(
          'w-10 h-10',
          'border-5 border-t-transparent border-slate-900',
          'rounded-full',
          'animate-spin',
        )}
      ></div>
    </div>
  );
}
