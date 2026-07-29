'use client';

import React from 'react';
import { IconInfo, IconEye } from '../icons';
import Link from 'next/link';
import { useTranslations } from '../LanguageProvider';

export function AboutSection() {
  const t = useTranslations().landing;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[rgba(158,198,204,0.3)] to-[rgba(99,159,169,0.2)] dark:from-[rgba(158,198,204,0.15)] dark:to-[rgba(99,159,169,0.1)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <IconInfo className="h-6 w-6 text-[var(--main-text-color)] mr-2" />
          <h3 className="text-xl font-bold text-[var(--main-text-color)]">{t.aboutTitle}</h3>
        </div>
        <Link
          href="/editor/?id=example"
          className="inline-flex items-center px-3 py-1.5 bg-[rgba(148,188,194,0.3)] hover:bg-[rgba(148,188,194,0.4)] text-[var(--main-text-color)] dark:text-white font-semibold rounded-md transition-colors text-sm shadow"
        >
          <IconEye className="h-4 w-4 mr-1.5" />
          {t.aboutExample}
        </Link>
      </div>

      <div className="p-6">
        <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300">
          <p className="leading-relaxed">
            {t.aboutIntro}
          </p>

          <div className="my-4 pl-4 border-l-4 border-[var(--main-bg-color)] italic">
            <p>{t.aboutMetaphor}</p>
          </div>

          <h4 className="text-lg font-semibold my-4 text-[var(--main-text-color)]">{t.aboutPrinciplesTitle}</h4>

          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>{t.aboutPrinciple1Term}</strong> — {t.aboutPrinciple1Text}
            </li>
            <li>
              <strong>{t.aboutPrinciple2Term}</strong> — {t.aboutPrinciple2Text}
            </li>
            <li>
              <strong>{t.aboutPrinciple3Term}</strong> — {t.aboutPrinciple3Text}
            </li>
          </ul>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-center">
            <p><strong>{t.aboutSupportQuestion}</strong>{t.aboutSupportBeforeLink}<a href="mailto:paul-vincent@relationshipmenu.org" className="text-[var(--main-text-color)] hover:underline">{t.aboutSupportLink}</a>{t.aboutSupportAfterLink}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
