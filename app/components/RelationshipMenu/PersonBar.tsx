'use client';

import React from 'react';
import { MenuData } from '../../types';
import { useTranslations } from '../LanguageProvider';
import { answeredCount, isPersonFinished } from '../../utils/responses';
import { IconCheck } from '../icons';

interface PersonBarProps {
  menuData: MenuData;
  activePerson: number | null;
  onSelectPerson: (personIndex: number | null) => void;
  onToggleFinished: (personIndex: number) => void;
}

/**
 * Shown above the menu in fill mode when individual answers are enabled.
 * Lets the group pick who is currently answering and, in blind mode, lets the
 * active person mark themselves done.
 */
export function PersonBar({ menuData, activePerson, onSelectPerson, onToggleFinished }: PersonBarProps) {
  const t = useTranslations().comparison;
  const blind = !!menuData.blind_mode;
  const activeFinished = activePerson !== null && isPersonFinished(menuData, activePerson);
  const progress = activePerson !== null ? answeredCount(menuData, activePerson) : null;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[rgba(148,188,194,0.35)] dark:border-[rgba(79,139,149,0.35)] p-4 mb-6"
      role="group"
      aria-label={t.whoAnswers}
      data-onboarding="person-bar"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="font-bold text-[var(--main-text-color)]">{t.whoAnswers}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {activePerson === null ? t.selectPersonHint : progress ? t.answeredCount(progress.done, progress.total) : ''}
          </p>
        </div>
        {blind && activePerson !== null && (
          <button
            type="button"
            onClick={() => onToggleFinished(activePerson)}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors border ${
              activeFinished
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                : 'bg-[var(--main-text-color-hover)] hover:bg-[var(--main-text-color)] text-white border-transparent'
            }`}
          >
            {activeFinished ? t.resumeButton : t.finishedButton}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {menuData.people.map((name, index) => {
          const selected = activePerson === index;
          const finished = isPersonFinished(menuData, index);
          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectPerson(selected ? null : index)}
              aria-pressed={selected}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors min-h-[44px] ${
                selected
                  ? 'bg-[var(--main-text-color-hover)] text-white border-transparent'
                  : 'bg-white dark:bg-gray-800 text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)] border-[rgba(148,188,194,0.5)] hover:bg-[rgba(148,188,194,0.15)] dark:hover:bg-[rgba(79,139,149,0.25)]'
              }`}
            >
              {name}
              {blind && finished && (
                <span className="inline-flex items-center gap-0.5 text-xs opacity-90">
                  <IconCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.finishedBadge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {blind && activeFinished && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{t.lockedNotice}</p>
      )}
    </div>
  );
}
