'use client';

import React from 'react';
import { IconLightning } from '../icons';
import { useTranslations } from '../LanguageProvider';

export function GettingStartedSection() {
  const t = useTranslations().landing;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[rgba(158,198,204,0.3)] to-[rgba(99,159,169,0.2)] dark:from-[rgba(158,198,204,0.15)] dark:to-[rgba(99,159,169,0.1)] px-6 py-4 flex items-center">
        <IconLightning className="h-6 w-6 text-[var(--main-text-color)] mr-2" />
        <h3 className="text-xl font-bold text-[var(--main-text-color)]">{t.gettingStartedTitle}</h3>
      </div>

      <div className="p-6">
        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
          <li>{t.gettingStartedStep1}</li>
          <li>{t.gettingStartedStep2}</li>
          <li>{t.gettingStartedStep3}</li>
          <li>{t.gettingStartedStep4}</li>
        </ol>
      </div>
    </div>
  );
}
