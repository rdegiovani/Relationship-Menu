'use client';

import React from 'react';
import Link from 'next/link';
import { IconInfo } from '../icons';
import { useTranslations } from '../LanguageProvider';

export function AppPromoSection() {
  const t = useTranslations().landing;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[rgba(158,198,204,0.3)] to-[rgba(99,159,169,0.2)] dark:from-[rgba(158,198,204,0.15)] dark:to-[rgba(99,159,169,0.1)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <IconInfo className="h-6 w-6 text-[var(--main-text-color)] mr-2" />
          <h3 className="text-xl font-bold text-[var(--main-text-color)]">{t.appPromoTitle}</h3>
        </div>
        <Link
          href="/app"
          className="inline-flex items-center px-3 py-1.5 bg-[rgba(148,188,194,0.3)] hover:bg-[rgba(148,188,194,0.4)] text-[var(--main-text-color)] dark:text-white font-semibold rounded-md transition-colors text-sm shadow"
        >
          {t.appPromoLearnMore}
        </Link>
      </div>
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {t.appPromoText}
        </p>
      </div>
    </div>
  );
}
