'use client';

import React from 'react';
import { MenuData } from '../../types';
import { useLanguage } from '../LanguageProvider';
import { personColor, personInitial } from '../../utils/personColors';

// What the view mode is looking at: everyone's current answers, one person's
// current answers, or everyone's answers as saved in a specific round.
export type ViewLens =
  | { type: 'current'; person: number | null }
  | { type: 'round'; index: number };

interface ViewLensBarProps {
  menuData: MenuData;
  lens: ViewLens;
  onSelectLens: (lens: ViewLens) => void;
}

/** View-mode selector: everyone (current) · each person · each saved round (with date). */
export function ViewLensBar({ menuData, lens, onSelectLens }: ViewLensBarProps) {
  const { language, t: dictionary } = useLanguage();
  const t = dictionary.comparison;
  const rounds = menuData.rounds ?? [];

  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(language, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  const chipClass = (selected: boolean) =>
    `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors min-h-[40px] ${
      selected
        ? 'bg-[var(--main-text-color-hover)] text-white border-transparent'
        : 'bg-white dark:bg-gray-800 text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)] border-[rgba(148,188,194,0.5)] hover:bg-[rgba(148,188,194,0.15)] dark:hover:bg-[rgba(79,139,149,0.25)]'
    }`;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[rgba(148,188,194,0.35)] dark:border-[rgba(79,139,149,0.35)] p-4 mb-6"
      role="group"
      aria-label={t.viewingTitle}
    >
      <h3 className="font-bold text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)] mb-3">{t.viewingTitle}</h3>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelectLens({ type: 'current', person: null })}
          aria-pressed={lens.type === 'current' && lens.person === null}
          className={chipClass(lens.type === 'current' && lens.person === null)}
        >
          {t.viewAll}
        </button>
        {menuData.people.map((name, index) => {
          const selected = lens.type === 'current' && lens.person === index;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectLens({ type: 'current', person: index })}
              aria-pressed={selected}
              className={chipClass(selected)}
            >
              <span
                aria-hidden="true"
                className={`h-5 w-5 rounded-full ${personColor(index)} text-white text-[10px] font-bold flex items-center justify-center`}
              >
                {personInitial(name)}
              </span>
              {name}
            </button>
          );
        })}
        {rounds.map((round, index) => {
          const selected = lens.type === 'round' && lens.index === index;
          return (
            <button
              key={`round-${index}`}
              type="button"
              onClick={() => onSelectLens({ type: 'round', index })}
              aria-pressed={selected}
              className={chipClass(selected)}
            >
              {t.viewRound(index + 1, formatDate(round.date))}
            </button>
          );
        })}
      </div>
    </div>
  );
}
