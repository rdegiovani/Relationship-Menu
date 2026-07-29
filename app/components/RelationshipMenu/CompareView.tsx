'use client';

import React, { useMemo, useRef, useState } from 'react';
import { MenuData, MenuItem, MenuRound } from '../../types';
import { useLanguage } from '../LanguageProvider';
import { IconPicker, IconButton, getIconLabel } from '../ui/IconPicker';
import { IconCheck } from '../icons';
import { Dictionary } from '../../localization/dictionaries';
import {
  getResponse,
  SPECTRUM_ICONS,
  itemPositions,
  itemDivergence,
  compatibilityScore,
  menuItemsMatrix,
  categoryCompatibility,
  roundCompatibility,
  diffSinceRound,
  answeredCount,
  isPersonFinished,
  everyoneFinished,
} from '../../utils/responses';

interface CompareViewProps {
  menuData: MenuData;
  onConsensusChange: (catIndex: number, itemIndex: number, newIcon: string | null) => void;
  onRegisterRound: () => void;
}

type CompareTab = 'compare' | 'evolution';

// Visual identity of each divergence band (0-4 plus incomplete). The hotter the
// band, the more attention it asks for — band 4 is the only warm-background one
// (Von Restorff: the eye goes straight to it).
const BAND_STYLES: Record<string, { dot: string; text: string; connector: string; headerBg: string }> = {
  '4': { dot: 'bg-red-500', text: 'text-red-700 dark:text-red-300', connector: 'bg-red-400/80', headerBg: 'bg-red-50 dark:bg-red-900/20' },
  '3': { dot: 'bg-orange-500', text: 'text-orange-700 dark:text-orange-300', connector: 'bg-orange-400/80', headerBg: 'bg-orange-50/60 dark:bg-orange-900/10' },
  '2': { dot: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300', connector: 'bg-amber-400/80', headerBg: '' },
  '1': { dot: 'bg-[rgba(79,139,149,1)]', text: 'text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)]', connector: 'bg-[rgba(79,139,149,0.6)]', headerBg: '' },
  '0': { dot: 'bg-green-600', text: 'text-green-700 dark:text-green-300', connector: 'bg-green-500/70', headerBg: '' },
  'incomplete': { dot: 'bg-gray-400', text: 'text-gray-600 dark:text-gray-300', connector: 'bg-gray-300', headerBg: '' },
};

// Stable per-person marker colors (white initial stays readable on all of them).
const PERSON_COLORS = ['bg-[rgba(63,115,123,1)]', 'bg-purple-700', 'bg-rose-700', 'bg-indigo-700', 'bg-emerald-700', 'bg-slate-700'];

// Spectrum stop tints reuse the app's level tile variables.
const STOP_TINTS = [
  'bg-[var(--icon-must-tile)]',
  'bg-[var(--icon-like-tile)]',
  'bg-[var(--icon-maybe-tile)]',
  'bg-[var(--icon-prefer-not-tile)]',
  'bg-[var(--icon-off-limit-tile)]',
];

function personInitial(name: string): string {
  return (name.trim()[0] ?? '?').toUpperCase();
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

/** One item's five-stop spectrum with a marker per person and a severity connector. */
function SpectrumTrack({ item, people, divergence, summary }: {
  item: MenuItem;
  people: string[];
  divergence: number | null;
  summary: string;
}) {
  const positions = itemPositions(item, people.length);
  const bandKey = divergence === null ? 'incomplete' : String(divergence);
  const style = BAND_STYLES[bandKey];
  const min = positions.length ? Math.min(...positions.map(p => p.position)) : null;
  const max = positions.length ? Math.max(...positions.map(p => p.position)) : null;

  // Stack markers that share a position so initials stay readable.
  const byPosition = new Map<number, number[]>();
  positions.forEach(({ personIndex, position }) => {
    byPosition.set(position, [...(byPosition.get(position) ?? []), personIndex]);
  });

  return (
    <div className="relative h-12 mx-3" role="img" aria-label={summary}>
      {/* Base line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 dark:bg-gray-600 rounded" aria-hidden="true" />
      {/* Severity connector between the extremes */}
      {min !== null && max !== null && max > min && (
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-1.5 rounded ${style.connector}`}
          style={{ left: `${(min / 4) * 100}%`, width: `${((max - min) / 4) * 100}%` }}
          aria-hidden="true"
        />
      )}
      {/* Five stops */}
      {SPECTRUM_ICONS.map((icon, stop) => (
        <div
          key={icon}
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3 w-3 rounded-full border border-gray-300 dark:border-gray-500 ${STOP_TINTS[stop]}`}
          style={{ left: `${(stop / 4) * 100}%` }}
          aria-hidden="true"
        />
      ))}
      {/* Person markers */}
      {Array.from(byPosition.entries()).map(([position, personIndexes]) =>
        personIndexes.map((personIndex, stackIndex) => (
          <div
            key={personIndex}
            className={`absolute -translate-x-1/2 h-6 w-6 rounded-full ${PERSON_COLORS[personIndex % PERSON_COLORS.length]} text-white text-xs font-bold flex items-center justify-center shadow-sm`}
            style={{
              left: `${(position / 4) * 100}%`,
              top: stackIndex === 0 ? '0' : 'auto',
              bottom: stackIndex === 0 ? 'auto' : '0',
            }}
            title={people[personIndex]}
            aria-hidden="true"
          >
            {personInitial(people[personIndex])}
          </div>
        ))
      )}
    </div>
  );
}

/** GitHub-style change chip: old answer struck through in red, new one in green. */
function DiffChip({ from, to, levels }: {
  from: string | null;
  to: string | null;
  levels: Dictionary['levels'];
}) {
  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap">
      {from !== null && (
        <span className="px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 line-through text-xs font-medium">
          {getIconLabel(from, levels)}
        </span>
      )}
      <span aria-hidden="true" className="text-gray-400 text-xs">→</span>
      <span className="px-1.5 py-0.5 rounded bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium">
        {to !== null ? getIconLabel(to, levels) : '—'}
      </span>
    </span>
  );
}

/**
 * Compare mode (site fork, v2): items grouped by divergence on the five-level
 * spectrum (widest gaps first), round snapshots with a GitHub-style diff, and
 * an evolution dashboard tracking compatibility over time.
 */
export function CompareView({ menuData, onConsensusChange, onRegisterRound }: CompareViewProps) {
  const { language, t: dictionary } = useLanguage();
  const t = dictionary.comparison;
  const levels = dictionary.levels;
  const [tab, setTab] = useState<CompareTab>('compare');

  const peopleCount = menuData.people.length;
  const blocked = !!menuData.blind_mode && !everyoneFinished(menuData);
  const rounds = useMemo(() => menuData.rounds ?? [], [menuData.rounds]);
  const lastRound: MenuRound | null = rounds.length > 0 ? rounds[rounds.length - 1] : null;

  const score = useMemo(
    () => compatibilityScore(menuItemsMatrix(menuData), peopleCount),
    [menuData, peopleCount]
  );
  const lastRoundScore = lastRound ? roundCompatibility(lastRound) : null;
  const delta = score !== null && lastRoundScore !== null ? score - lastRoundScore : null;

  const changes = useMemo(
    () => (lastRound ? diffSinceRound(menuData, lastRound) : []),
    [menuData, lastRound]
  );

  // Items grouped into divergence bands, widest gap first (the primary view).
  const bands = useMemo(() => {
    const grouped: Record<string, { catIndex: number; itemIndex: number; item: MenuItem; divergence: number | null }[]> = {
      '4': [], '3': [], '2': [], '1': [], '0': [], 'incomplete': []
    };
    menuData.menu.forEach((category, catIndex) => {
      category.items.forEach((item, itemIndex) => {
        const divergence = itemDivergence(item, peopleCount);
        const key = divergence === null ? 'incomplete' : String(divergence);
        grouped[key].push({ catIndex, itemIndex, item, divergence });
      });
    });
    return grouped;
  }, [menuData, peopleCount]);

  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(language, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  // Blind gate: per-person progress instead of anyone's answers.
  if (blocked) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 max-w-xl mx-auto">
        <h3 className="text-xl font-bold text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)] mb-2">{t.waitingTitle}</h3>
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

  const bandOrder: { key: string; label: string }[] = [
    { key: '4', label: t.band4 },
    { key: '3', label: t.band3 },
    { key: '2', label: t.band2 },
    { key: '1', label: t.band1 },
    { key: '0', label: t.band0 },
    { key: 'incomplete', label: t.bandIncomplete },
  ];

  const tabButton = (key: CompareTab, label: string) => (
    <button
      key={key}
      type="button"
      onClick={() => setTab(key)}
      aria-pressed={tab === key}
      className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors min-h-[44px] ${
        tab === key
          ? 'bg-[var(--main-text-color-hover)] text-white border-transparent'
          : 'bg-white dark:bg-gray-800 text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)] border-[rgba(148,188,194,0.5)] hover:bg-[rgba(148,188,194,0.15)] dark:hover:bg-[rgba(79,139,149,0.25)]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      {/* Score + rounds header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[rgba(148,188,194,0.35)] dark:border-[rgba(79,139,149,0.35)] p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.compatibility}</p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)]">
                {score !== null ? `${score}%` : '—'}
              </span>
              {delta !== null && delta !== 0 && (
                <span className={`text-sm font-semibold mb-1.5 ${delta > 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                  {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {score === null ? t.noScore : t.compatibilityHint}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <button
              type="button"
              onClick={onRegisterRound}
              className="px-4 py-2.5 rounded-lg font-medium text-sm bg-[var(--main-text-color-hover)] hover:bg-[var(--main-text-color)] text-white transition-colors"
            >
              {t.registerRound}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {lastRound ? t.lastRound(formatDate(lastRound.date)) : t.noRoundsHint}
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          {tabButton('compare', t.tabCompare)}
          {tabButton('evolution', t.tabEvolution)}
        </div>
      </div>

      {tab === 'compare' ? (
        <>
          {/* GitHub-style diff since the last round */}
          {lastRound && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 mb-6">
              <h3 className="font-bold text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)] mb-3">{t.changesTitle}</h3>
              {changes.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.noChanges}</p>
              ) : (
                <ul className="space-y-2">
                  {changes.slice(0, 12).map((change, index) => (
                    <li key={index} className="flex items-center gap-2 flex-wrap text-sm">
                      <span className="font-medium">{change.person ?? t.sharedAnswerChange}</span>
                      <span className="text-gray-500 dark:text-gray-400">· {change.itemName}:</span>
                      <DiffChip from={change.from} to={change.to} levels={levels} />
                    </li>
                  ))}
                  {changes.length > 12 && (
                    <li className="text-xs text-gray-500 dark:text-gray-400">{t.moreChanges(changes.length - 12)}</li>
                  )}
                </ul>
              )}
            </div>
          )}

          {/* Divergence bands, widest gaps first */}
          <div className="space-y-8">
            {bandOrder.map(({ key, label }) => {
              const entries = bands[key];
              if (entries.length === 0) return null;
              const style = BAND_STYLES[key];
              return (
                <section key={key} aria-label={label}>
                  <div className={`flex items-center gap-2.5 rounded-lg px-3 py-2 mb-3 ${style.headerBg}`}>
                    <span className={`h-3 w-3 rounded-full ${style.dot}`} aria-hidden="true" />
                    <h3 className={`font-bold ${style.text}`}>{label}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{t.bandCount(entries.length)}</span>
                  </div>
                  <div className="space-y-3">
                    {entries.map(({ catIndex, itemIndex, item, divergence }) => {
                      const summaryParts = menuData.people.map((name, personIndex) => {
                        const answer = getResponse(item, personIndex);
                        return `${name}: ${answer ? getIconLabel(answer, levels) : t.noAnswer}`;
                      });
                      return (
                        <div
                          key={`${catIndex}-${itemIndex}`}
                          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm px-4 py-4 sm:px-5"
                        >
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="min-w-[200px] flex-1">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{menuData.menu[catIndex].name}</p>
                              <p className="font-bold">{item.name}</p>
                            </div>
                            <ConsensusPicker
                              selectedIcon={item.icon ?? null}
                              onSelect={(icon) => onConsensusChange(catIndex, itemIndex, icon)}
                              label={t.consensusLabel}
                            />
                          </div>
                          <div className="mt-3">
                            <SpectrumTrack
                              item={item}
                              people={menuData.people}
                              divergence={divergence}
                              summary={t.spectrumSummary(summaryParts.join('; '))}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      ) : (
        <EvolutionDashboard
          menuData={menuData}
          rounds={rounds}
          currentScore={score}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}

/** Evolution tab: compatibility over time, per-section bars, biggest moves. */
function EvolutionDashboard({ menuData, rounds, currentScore, formatDate }: {
  menuData: MenuData;
  rounds: MenuRound[];
  currentScore: number | null;
  formatDate: (iso: string) => string;
}) {
  const { t: dictionary } = useLanguage();
  const t = dictionary.comparison;
  const peopleCount = menuData.people.length;

  // Score series: every saved round plus the live state.
  const series: { label: string; score: number | null }[] = [
    ...rounds.map((round, index) => ({
      label: t.roundLabel(index + 1),
      score: roundCompatibility(round),
    })),
    { label: t.nowLabel, score: currentScore },
  ];
  const plotted = series.filter((point): point is { label: string; score: number } => point.score !== null);

  const categories = categoryCompatibility(menuData);
  const lastRound = rounds.length > 0 ? rounds[rounds.length - 1] : null;

  // Biggest divergence moves per item since the last round.
  const moves = useMemo(() => {
    if (!lastRound) return [];
    const result: { itemName: string; before: number; after: number }[] = [];
    menuData.menu.forEach((category, catIndex) => {
      category.items.forEach((item, itemIndex) => {
        const snapshot = lastRound.items[catIndex]?.[itemIndex];
        if (!snapshot) return;
        const before = itemDivergence({ name: item.name, responses: snapshot.responses }, lastRound.people.length);
        const after = itemDivergence(item, peopleCount);
        if (before !== null && after !== null && before !== after) {
          result.push({ itemName: item.name, before, after });
        }
      });
    });
    return result
      .sort((a, b) => Math.abs(b.after - b.before) - Math.abs(a.after - a.before))
      .slice(0, 5);
  }, [menuData, lastRound, peopleCount]);

  // Hand-drawn SVG line chart — no dependencies, data-ink only.
  const chart = (() => {
    if (plotted.length < 2) return null;
    const width = 600;
    const height = 200;
    const padX = 40;
    const padY = 24;
    const stepX = (width - padX * 2) / (plotted.length - 1);
    const x = (index: number) => padX + index * stepX;
    const y = (value: number) => height - padY - ((height - padY * 2) * value) / 100;
    const points = plotted.map((point, index) => `${x(index)},${y(point.score)}`).join(' ');
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img"
        aria-label={`${t.evolutionTitle}: ${plotted.map(p => `${p.label} ${p.score}%`).join(', ')}`}>
        {[0, 50, 100].map(gridValue => (
          <g key={gridValue}>
            <line x1={padX} x2={width - padX} y1={y(gridValue)} y2={y(gridValue)}
              className="stroke-gray-200 dark:stroke-gray-600" strokeWidth="1" strokeDasharray={gridValue === 0 ? undefined : '4 4'} />
            <text x={padX - 8} y={y(gridValue) + 4} textAnchor="end" className="fill-gray-500 dark:fill-gray-400" fontSize="11">{gridValue}</text>
          </g>
        ))}
        <polyline points={points} fill="none" className="stroke-[rgba(79,139,149,1)]" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {plotted.map((point, index) => (
          <g key={index}>
            <circle cx={x(index)} cy={y(point.score)} r="4.5"
              className={index === plotted.length - 1 ? 'fill-[rgba(63,115,123,1)]' : 'fill-white dark:fill-gray-800 stroke-[rgba(79,139,149,1)]'}
              strokeWidth="2" />
            <text x={x(index)} y={y(point.score) - 10} textAnchor="middle" fontSize="11" fontWeight="600"
              className="fill-gray-700 dark:fill-gray-200">{point.score}%</text>
            <text x={x(index)} y={height - 6} textAnchor="middle" fontSize="11"
              className="fill-gray-500 dark:fill-gray-400">{point.label}</text>
          </g>
        ))}
      </svg>
    );
  })();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-bold text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)] mb-3">{t.evolutionTitle}</h3>
        {chart ?? <p className="text-sm text-gray-500 dark:text-gray-400">{t.noRoundsHint}</p>}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-bold text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)] mb-4">{t.byCategory}</h3>
        <ul className="space-y-3">
          {categories.map((category, index) => (
            <li key={index}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium">{category.name}</span>
                <span className="text-gray-500 dark:text-gray-400">{category.score !== null ? `${category.score}%` : '—'}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden" aria-hidden="true">
                {category.score !== null && (
                  <div className="h-full rounded-full bg-[rgba(79,139,149,1)]" style={{ width: `${category.score}%` }} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="font-bold text-[var(--main-text-color-hover)] dark:text-[rgba(148,188,194,1)] mb-3">{t.biggestMoves}</h3>
        {moves.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">{lastRound ? t.noMoves : t.noRoundsHint}</p>
        ) : (
          <ul className="space-y-2">
            {moves.map((move, index) => {
              const improved = move.after < move.before;
              return (
                <li key={index} className="flex items-center gap-2 flex-wrap text-sm">
                  <span aria-hidden="true" className={`font-semibold ${improved ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                    {improved ? '▼' : '▲'}
                  </span>
                  <span className="font-medium">{move.itemName}</span>
                  <span className="text-gray-500 dark:text-gray-400">{t.divergenceChange(move.before, move.after)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
