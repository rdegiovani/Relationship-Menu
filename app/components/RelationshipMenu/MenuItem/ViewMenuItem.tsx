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

  // "Conversation" item: everyone who answered said "talk" — the level is the
  // same for all, so it moves next to the item name and the space below is
  // used for each person's written answer instead of redundant pills.
  const givenAnswers = people
    .map((_, personIndex) => item.responses?.[String(personIndex)] ?? null)
    .filter((answer): answer is string => answer !== null);
  const isConversation = showAllResponses && givenAnswers.length > 0 && givenAnswers.every(answer => answer === 'talk');

  // Each person's own written answer (site fork), shown attributed by avatar + name.
  const personNotes = people
    .map((name, personIndex) => ({ name, personIndex, note: item.response_notes?.[String(personIndex)] ?? null }))
    .filter(entry => !isRichTextEmpty(entry.note));

  // Determine if icon is set and not "talk"
  const hasIcon = !!effectiveIcon && effectiveIcon !== "talk";

  const personNote = viewPerson !== null ? (item.response_notes?.[String(viewPerson)] ?? null) : null;

  // In the individual views the pills/avatars carry the information — the
  // "not set" placeholder dot would be pure noise, so the leading icon only
  // appears when there is an actual level to show.
  const individualView = showAllResponses || viewPerson !== null;
  const showLeadingIcon = !individualView || !!effectiveIcon;
  // Inner rows align with the start of the item name: indented under the text
  // when a leading icon exists, flush left when it doesn't (no orphan margin).
  const rowIndent = showLeadingIcon ? 'ml-9 max-sm:ml-8' : '';

  return (
    <>
      <div className="item-name font-bold flex items-center text-gray-900 dark:text-gray-50 max-sm:items-start flex-wrap gap-y-1">
        {showLeadingIcon && renderIcon(effectiveIcon)}
        <span className={getItemSpanClasses(effectiveIcon)}>
          {item.name}
        </span>
        {isConversation && (
          <span className="ml-2">
            <LevelPill icon="talk" levels={t} />
          </span>
        )}
        {showLeadingIcon && <span className="sr-only">, {iconLabel}</span>}
      </div>
      {showAllResponses && !isConversation && people.length > 0 && (
        <div
          className={`mt-2 grid grid-cols-1 sm:grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-x-4 gap-y-2 ${rowIndent}`}
          style={{ '--cols': people.length } as React.CSSProperties}
        >
          {people.map((name, personIndex) => {
            const answer = item.responses?.[String(personIndex)] ?? null;
            const note = item.response_notes?.[String(personIndex)] ?? null;
            return (
              <div
                key={personIndex}
                className="flex flex-col gap-1 items-start"
                aria-label={`${name}: ${answer ? getIconLabel(answer, t) : tc.noAnswer}`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    title={name}
                    className={`h-5 w-5 rounded-full ${personColor(personIndex)} text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0`}
                  >
                    {personInitial(name)}
                  </span>
                  <LevelPill icon={answer} levels={t} />
                </span>
                {!isRichTextEmpty(note) && (
                  <div className="ml-[26px] text-[0.9em] font-normal text-gray-700 dark:text-gray-50 whitespace-pre-line break-words">
                    {renderRichText(note)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {showAllResponses && isConversation && personNotes.length > 0 && (
        <div className={`mt-2 space-y-1.5 ${rowIndent}`}>
          {personNotes.map(({ name, personIndex, note }) => (
            <div key={personIndex} className="flex items-start gap-1.5 text-[0.9em] text-gray-700 dark:text-gray-50">
              <span
                aria-hidden="true"
                title={name}
                className={`mt-0.5 h-5 w-5 rounded-full ${personColor(personIndex)} text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0`}
              >
                {personInitial(name)}
              </span>
              <span className="whitespace-pre-line break-words">
                <span className="font-medium">{name}: </span>
                {renderRichText(note)}
              </span>
            </div>
          ))}
        </div>
      )}
      {viewPerson !== null && !isRichTextEmpty(personNote) && (
        <div className={`mt-1.5 text-gray-700 dark:text-gray-50 text-[0.9em] whitespace-pre-line break-words max-sm:mt-1 ${rowIndent}`}>
          {renderRichText(personNote)}
        </div>
      )}
      {!isRichTextEmpty(item.note) && (
        <div className={`${hasIcon || showAllResponses ? 'mt-1.5' : 'mt-0.5'} text-gray-700 dark:text-gray-50 text-[0.9em] whitespace-pre-line break-words max-sm:mt-1 ${rowIndent}`} aria-label={`Note: ${richTextToPlainText(item.note)}`}>
          {renderRichText(item.note)}
        </div>
      )}
    </>
  );
}
