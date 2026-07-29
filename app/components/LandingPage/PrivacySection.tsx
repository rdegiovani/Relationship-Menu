'use client';

import React from 'react';
import Link from 'next/link';
import { IconLock, IconCheck } from '../icons';
import { useTranslations } from '../LanguageProvider';

export function PrivacySection() {
  const t = useTranslations().landing;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[rgba(158,198,204,0.3)] to-[rgba(99,159,169,0.2)] dark:from-[rgba(158,198,204,0.15)] dark:to-[rgba(99,159,169,0.1)] px-6 py-4 flex items-center">
        <IconLock className="h-6 w-6 text-[var(--main-text-color)] mr-2" />
        <h3 className="text-xl font-bold text-[var(--main-text-color)]">{t.privacyTitle}</h3>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-3 mt-0.5">
              <IconCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <strong className="text-[var(--main-text-color)]">{t.privacyPrivateTerm}</strong>
              <span className="ml-2 text-gray-600 dark:text-gray-300">{t.privacyPrivateText}</span>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full mr-3 mt-0.5">
              <IconCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <strong className="text-[var(--main-text-color)]">{t.privacyStorageTerm}</strong>
              <span className="ml-2 text-gray-600 dark:text-gray-300">{t.privacyStorageText}</span>
            </div>
          </div>

          <div className="text-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400">
            <Link href="/privacy-policy" className="text-[var(--main-text-color)] hover:underline font-medium">{t.privacyMoreDetails}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
