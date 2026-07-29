'use client';

import React, { useMemo, useRef, useState } from 'react';
import { MenuData, MenuItem } from '../../types';
import { useTranslations } from '../LanguageProvider';
import { IconPicker, IconButton, renderIcon, getIconLabel } from '../ui/IconPicker';
import { IconCheck } from '../icons';
import {
  getResponse,
  itemCompareStatus,
  answeredCount,
  isPersonFinished,
  everyoneFinished,
  CompareStatus
} from '../../utils/responses';

type CompareFilter = 'all' | 'differ' | 'noConsensus';

interface CompareViewProps {
  menuData: MenuData;
  onConsensusChange: (catIndex: number, itemIndex: number, newIcon: string | null) => void;
}

/** The shared-answer picker for one item (edit-mode options, includes "talk"). */
function ConsensusPicker({ selectedIcon, onSelect, label }: {
  selectedIcon: string | null;
  onSelect: (icon: string | null) => void;
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</span>
      <IconButton selectedIcon={selectedIcon} onClick={() => setIsOpen(open => !open)} />
      <IconPicker
        selectedIcon={selectedIcon}
        onSelectIcon={(icon) => {
          onSelect(icon);
          setIsOpen(false);
        }}
        isOpen={isOpen}
        mode="edit"
        onClose={() => setIsOpen(false)}
        parentRef={wrapperRef}
      />
    </div>
  );
}

/**
 * Compare mode (site fork): everyone's individual answers side by side, with
 * match/divergence badges and a control to set the shared answer per item.
 * In blind mode it stays gated until every person marked themselves done.
 */
export function CompareView({ menuData, onConsensusChange }: CompareViewProps) {
  const dictionary = useTranslations();
  const t = dictionary.comparison;
  const levels = dictionary.levels;
  const [filter, setFilter] = useState<CompareFilter>('all');

  const peopleCount = menuData.people.length;
  const blocked = !!menuData.blind_mode && !everyoneFinished(menuData);

  const statusOf = useMemo(() => {
    const map = new Map<string, CompareStatus>();
    menuData.menu.forEach((category, catIndex) => {
      category.items.forEach((item, itemIndex) => {
        map.set(`${catIndex}-${itemIndex}`, itemCompareStatus(item, peopleCount));
      });
    });
    return map;
  }, [menuData, peopleCount]);

  const counts = useMemo(() => {
    let differ = 0;
    let noConsensus = 0;
    let consensusDone = 0;
    let total = 0;
    menuData.menu.forEach((category, catIndex) => {
      category.items.forEach((item, itemIndex) => {
        total++;
        if (statusOf.get(`${catIndex}-${itemIndex}`) === 'differ') differ++;
        if (item.icon) consensusDone++; else noConsensus++;
      });
    });
    return { differ, noConsensus, consensusDone, total };
  }, [menuData, statusOf]);

  // Blind gate: show per-person progress instead of anyone's answers.
  if (blocked) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 max-w-xl mx-auto">
        <h3 className="text-xl font-bold text-[var(--main-text-color)] mb-2">{t.waitingTitle}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-5">{t.waitingBody}</p>
        <ul className="space-y-3">
          {menuData.people.map((name, index) => {
            const progress = answeredCount(menuData, index);
            const finished = isPersonFinished(menuData, index);
            return (
              <li key={index} className="flex items-center justify-between bg-[rgba(148,188,194,0.08)] dark:bg-[rgba(79,139,149,0.08)] rounded-lg px-4 py-3">
                <span className="font-medium">{name}</span>
                <span className={`flex items-center gap-1.5 text-sm ${finished ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`}>
                  {finished && <IconCheck className="h-4 w-4" aria-hidden="true" />}
                  {finished ? t.finishedBadge : t.answeredCount(progress.done, progress.total)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const matchesFilter = (item: MenuItem, status: CompareStatus): boolean => {
    if (filter === 'differ') return status === 'differ';
    if (filter === 'noConsensus') return !item.icon;
    return true;
  };

  const statusBadge = (status: CompareStatus) => {
    const styles: Record<CompareStatus, string> = {
      match: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
      differ: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
      incomplete: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
    };
    const labels: Record<CompareStatus, string> = {
      match: t.statusMatch,
      differ: t.statusDiffer,
      incomplete: t.statusIncomplete
    };
    return (
      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const filters: { key: CompareFilter; label: string; count?: number }[] = [
    { key: 'all', label: t.filterAll },
    { key: 'differ', label: t.filterDiffer, count: counts.differ },
    { key: 'noConsensus', label: t.filterNoConsensus, count: counts.noConsensus },
  ];

  const anyVisible = menuData.menu.some((category, catIndex) =>
    category.items.some((item, itemIndex) =>
      matchesFilter(item, statusOf.get(`${catIndex}-${itemIndex}`) ?? 'incomplete')
    )
  );

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[rgba(148,188,194,0.35)] dark:border-[rgba(79,139,149,0.35)] p-4 mb-6">
        <p className="text-gray-700 dark:text-gray-200 mb-1">{t.compareIntro}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {t.consensusProgress(counts.consensusDone, counts.total)}
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.filterAll}>
          {filters.map(({ key, label, count }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors min-h-[40px] ${
                filter === key
                  ? 'bg-[var(--main-text-color-hover)] text-white border-transparent'
                  : 'bg-white dark:bg-gray-800 text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)] border-[rgba(148,188,194,0.5)] hover:bg-[rgba(148,188,194,0.15)] dark:hover:bg-[rgba(79,139,149,0.25)]'
              }`}
            >
              {label}{typeof count === 'number' ? ` (${count})` : ''}
            </button>
          ))}
        </div>
      </div>

      {!anyVisible && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-10">{t.emptyFilter}</p>
      )}

      <div className="space-y-6">
        {menuData.menu.map((category, catIndex) => {
          const visibleItems = category.items
            .map((item, itemIndex) => ({ item, itemIndex }))
            .filter(({ item, itemIndex }) =>
              matchesFilter(item, statusOf.get(`${catIndex}-${itemIndex}`) ?? 'incomplete')
            );
          if (visibleItems.length === 0) return null;

          return (
            <div
              key={catIndex}
              className="category bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-visible border border-gray-200 dark:border-gray-700"
              role="region"
              aria-labelledby={`compare-category-${catIndex}`}
            >
              <div className="title bg-[var(--main-bg-color)] dark:bg-[var(--main-bg-color)] px-[25px] py-3">
                <h3 id={`compare-category-${catIndex}`} className="font-bold text-white text-lg">{category.name}</h3>
              </div>
              <div role="list">
                {visibleItems.map(({ item, itemIndex }) => {
                  const status = statusOf.get(`${catIndex}-${itemIndex}`) ?? 'incomplete';
                  return (
                    <div
                      key={itemIndex}
                      role="listitem"
                      className="py-4 px-[25px] max-sm:px-[15px] border-b border-gray-200/60 dark:border-gray-700/40 last:border-0"
                    >
                      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                        <span className="font-bold">{item.name}</span>
                        {statusBadge(status)}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {menuData.people.map((name, personIndex) => {
                          const answer = getResponse(item, personIndex);
                          return (
                            <span
                              key={personIndex}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-600 ${
                                answer ? '' : 'opacity-60'
                              }`}
                            >
                              <span className="font-medium">{name}:</span>
                              {answer ? (
                                <span className="inline-flex items-center gap-1">
                                  {renderIcon(answer)}
                                  {getIconLabel(answer, levels)}
                                </span>
                              ) : (
                                <span className="italic">{t.noAnswer}</span>
                              )}
                            </span>
                          );
                        })}
                      </div>
                      <ConsensusPicker
                        selectedIcon={item.icon ?? null}
                        onSelect={(icon) => onConsensusChange(catIndex, itemIndex, icon)}
                        label={t.consensusLabel}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
