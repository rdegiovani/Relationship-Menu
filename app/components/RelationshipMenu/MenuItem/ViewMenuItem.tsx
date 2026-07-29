'use client';

import React from 'react';
import { MenuItem } from '../../../types';
import { renderIcon, getIconLabel } from '../../ui/IconPicker';
import { LevelPill } from '../../ui/LevelPill';
import { useTranslations } from '../../LanguageProvider';
import { getItemSpanClasses } from './utils';
import { renderRichText, isRichTextEmpty, richTextToPlainText } from '../../../utils/richTextUtils';
import { personColor, personInitial } from '../../../utils/personColors';

interface ViewMenuItemProps {
  item: MenuItem;
  /** Individual answers (site fork): people names, for the respondent chips. */
  people?: string[];
  /** Show every person's answer under the item (view lens "everyone" / round). */
  showAllResponses?: boolean;
  /** Show the item as answered by this person (view lens on one person). */
  viewPerson?: number | null;
}

export function ViewMenuItem({ item, people = [], showAllResponses = false, viewPerson = null }: ViewMenuItemProps) {
  const dictionary = useTranslations();
  const t = dictionary.levels;
  const tc = dictionary.comparison;

  // With a person lens, the icon shown is that person's answer instead of the shared one.
  const effectiveIcon = viewPerson !== null
    ? (item.responses?.[String(viewPerson)] ?? null)
    : (item.icon ?? null);
  const iconLabel = getIconLabel(effectiveIcon, t);

  // Determine if icon is set and not "talk"
  const hasIcon = !!effectiveIcon && effectiveIcon !== "talk";

  return (
    <>
      <div className="item-name font-bold flex items-center text-gray-900 dark:text-gray-50 max-sm:items-start">
        {renderIcon(effectiveIcon)}
        <span className={getItemSpanClasses(effectiveIcon)}>
          {item.name}
        </span>
        <span className="sr-only">, {iconLabel}</span>
      </div>
      {showAllResponses && people.length > 0 && (
        <div className="mt-2 ml-9 flex flex-wrap gap-x-4 gap-y-1.5 max-sm:ml-8">
          {people.map((name, personIndex) => {
            const answer = item.responses?.[String(personIndex)] ?? null;
            return (
              <span
                key={personIndex}
                className="inline-flex items-center gap-1.5"
                aria-label={`${name}: ${answer ? getIconLabel(answer, t) : tc.noAnswer}`}
              >
                <span
                  aria-hidden="true"
                  title={name}
                  className={`h-5 w-5 rounded-full ${personColor(personIndex)} text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0`}
                >
                  {personInitial(name)}
                </span>
                <LevelPill icon={answer} levels={t} />
              </span>
            );
          })}
        </div>
      )}
      {!isRichTextEmpty(item.note) && (
        <div className={`${hasIcon || showAllResponses ? 'mt-1.5' : 'mt-0.5'} ml-9 text-gray-700 dark:text-gray-50 text-[0.9em] whitespace-pre-line break-words max-sm:mt-1 max-sm:ml-8`} aria-label={`Note: ${richTextToPlainText(item.note)}`}>
          {renderRichText(item.note)}
        </div>
      )}
    </>
  );
}
