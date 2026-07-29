'use client';

import React from 'react';
import { useTranslations } from '../LanguageProvider';

interface LoadingIndicatorProps {
  message?: string;
}

export function LoadingIndicator({ message }: LoadingIndicatorProps) {
  const t = useTranslations().common;

  return (
    <div className="flex items-center justify-center h-32">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#25697f] dark:border-[#9ec6cc] border-r-[#e5e7eb] dark:border-r-[#232946] align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-[#1a202c] dark:text-[#f5f6fa] font-semibold">{message ?? t.loading}</p>
      </div>
    </div>
  );
} 