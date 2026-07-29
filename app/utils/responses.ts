import { MenuData, MenuItem, MenuRound } from '../types';

// Helpers for the individual-answers feature (site fork). Responses live on each
// item keyed by person index; these utilities centralise the invariants so UI
// components never manipulate the raw records directly.

export type CompareStatus = 'match' | 'differ' | 'incomplete';

/** The answer a person gave to an item, or null when they have not answered. */
export function getResponse(item: MenuItem, personIndex: number): string | null {
  return item.responses?.[String(personIndex)] ?? null;
}

/** Returns a copy of the item with the person's answer set (or cleared with null). */
export function withResponse(item: MenuItem, personIndex: number, icon: string | null): MenuItem {
  const responses = { ...(item.responses ?? {}) };
  if (icon === null) {
    delete responses[String(personIndex)];
  } else {
    responses[String(personIndex)] = icon;
  }
  return { ...item, responses: Object.keys(responses).length > 0 ? responses : undefined };
}

/**
 * Removes a person from all response records and the finished list, shifting the
 * indexes of everyone after them. Must be called whenever a person is deleted.
 */
export function removePersonData(data: MenuData, personIndex: number): MenuData {
  const shiftKey = (key: string): string | null => {
    const index = Number(key);
    if (index === personIndex) return null;
    return index > personIndex ? String(index - 1) : key;
  };

  const menu = data.menu.map(category => ({
    ...category,
    items: category.items.map(item => {
      if (!item.responses) return item;
      const responses: { [personIndex: string]: string } = {};
      for (const [key, value] of Object.entries(item.responses)) {
        const newKey = shiftKey(key);
        if (newKey !== null) responses[newKey] = value;
      }
      return { ...item, responses: Object.keys(responses).length > 0 ? responses : undefined };
    })
  }));

  const finished = (data.finished_people ?? [])
    .filter(index => index !== personIndex)
    .map(index => (index > personIndex ? index - 1 : index));

  return {
    ...data,
    menu,
    finished_people: finished.length > 0 ? finished : undefined
  };
}

/** How many items a person has answered, out of the total item count. */
export function answeredCount(data: MenuData, personIndex: number): { done: number; total: number } {
  let done = 0;
  let total = 0;
  for (const category of data.menu) {
    for (const item of category.items) {
      total++;
      if (getResponse(item, personIndex) !== null) done++;
    }
  }
  return { done, total };
}

/** Compare state of one item across all people. */
export function itemCompareStatus(item: MenuItem, peopleCount: number): CompareStatus {
  const answers: string[] = [];
  for (let i = 0; i < peopleCount; i++) {
    const answer = getResponse(item, i);
    if (answer !== null) answers.push(answer);
  }
  if (answers.length < peopleCount) return 'incomplete';
  return answers.every(answer => answer === answers[0]) ? 'match' : 'differ';
}

export function isPersonFinished(data: MenuData, personIndex: number): boolean {
  return (data.finished_people ?? []).includes(personIndex);
}

export function everyoneFinished(data: MenuData): boolean {
  const finished = data.finished_people ?? [];
  return data.people.length > 0 && data.people.every((_, index) => finished.includes(index));
}

// ---------------------------------------------------------------------------
// Divergence spectrum (v2): the five levels form an ordinal scale. The wider
// the gap between two people's answers, the more attention the item needs.
// "talk" and unanswered items live outside the spectrum.
// ---------------------------------------------------------------------------

export const SPECTRUM_POSITIONS: Record<string, number> = {
  'must': 0,
  'like': 1,
  'maybe': 2,
  'prefer-not': 3,
  'off-limit': 4,
};

export const SPECTRUM_ICONS = ['must', 'like', 'maybe', 'prefer-not', 'off-limit'];

export function spectrumPosition(icon: string | null | undefined): number | null {
  if (!icon) return null;
  const position = SPECTRUM_POSITIONS[icon];
  return position === undefined ? null : position;
}

/** Spectrum positions of everyone's answers to an item (unanswered people skipped). */
export function itemPositions(item: MenuItem, peopleCount: number): { personIndex: number; position: number }[] {
  const positions: { personIndex: number; position: number }[] = [];
  for (let i = 0; i < peopleCount; i++) {
    const position = spectrumPosition(getResponse(item, i));
    if (position !== null) positions.push({ personIndex: i, position });
  }
  return positions;
}

/**
 * Divergence of one item: the widest gap between any two answers (0-4),
 * or null when fewer than two people answered on the spectrum.
 */
export function itemDivergence(item: MenuItem, peopleCount: number): number | null {
  const positions = itemPositions(item, peopleCount).map(p => p.position);
  if (positions.length < 2) return null;
  return Math.max(...positions) - Math.min(...positions);
}

/** Compatibility of one item as 0..1 (1 = fully aligned), or null when incomparable. */
export function itemCompatibility(item: MenuItem, peopleCount: number): number | null {
  const divergence = itemDivergence(item, peopleCount);
  return divergence === null ? null : 1 - divergence / 4;
}

/**
 * Menu-wide compatibility score in percent (0-100): the average item
 * compatibility over every item at least two people answered. Null when
 * nothing is comparable yet.
 */
export function compatibilityScore(items: MenuItem[][], peopleCount: number): number | null {
  let sum = 0;
  let count = 0;
  for (const categoryItems of items) {
    for (const item of categoryItems) {
      const compatibility = itemCompatibility(item, peopleCount);
      if (compatibility !== null) {
        sum += compatibility;
        count++;
      }
    }
  }
  return count === 0 ? null : Math.round((sum / count) * 100);
}

export function menuItemsMatrix(data: MenuData): MenuItem[][] {
  return data.menu.map(category => category.items);
}

/** Per-category compatibility in percent, null for categories with nothing comparable. */
export function categoryCompatibility(data: MenuData): { name: string; score: number | null }[] {
  return data.menu.map(category => ({
    name: category.name,
    score: compatibilityScore([category.items], data.people.length),
  }));
}

// ---------------------------------------------------------------------------
// Rounds (v2): saved snapshots of answers, GitHub-diff style history.
// ---------------------------------------------------------------------------

/** Freezes the current answers + shared answers as a round snapshot. */
export function captureRound(data: MenuData): MenuRound {
  return {
    date: new Date().toISOString(),
    people: [...data.people],
    items: data.menu.map(category => category.items.map(item => ({
      responses: item.responses ? { ...item.responses } : undefined,
      response_notes: item.response_notes ? { ...item.response_notes } : undefined,
      icon: item.icon ?? null,
    }))),
  };
}

/** Compatibility score of a saved round (people count taken from the snapshot). */
export function roundCompatibility(round: MenuRound): number | null {
  const items: MenuItem[][] = round.items.map(categoryItems =>
    categoryItems.map(item => ({ name: '', responses: item.responses }))
  );
  return compatibilityScore(items, round.people.length);
}

export type ResponseChange = {
  catIndex: number;
  itemIndex: number;
  itemName: string;
  /** Person name, or null when the change is on the shared answer. */
  person: string | null;
  from: string | null;
  to: string | null;
};

/**
 * GitHub-style diff of the current answers against a saved round: every answer
 * (or shared answer) that changed, was added, or was removed since then.
 */
export function diffSinceRound(data: MenuData, round: MenuRound): ResponseChange[] {
  const changes: ResponseChange[] = [];
  data.menu.forEach((category, catIndex) => {
    category.items.forEach((item, itemIndex) => {
      const snapshot = round.items[catIndex]?.[itemIndex];
      if (!snapshot) return; // Item added after the round — nothing to diff against
      for (let personIndex = 0; personIndex < data.people.length; personIndex++) {
        const before = snapshot.responses?.[String(personIndex)] ?? null;
        const after = getResponse(item, personIndex);
        if (before !== after) {
          changes.push({
            catIndex,
            itemIndex,
            itemName: item.name,
            person: data.people[personIndex],
            from: before,
            to: after,
          });
        }
      }
      const consensusBefore = snapshot.icon ?? null;
      const consensusAfter = item.icon ?? null;
      if (consensusBefore !== consensusAfter) {
        changes.push({
          catIndex,
          itemIndex,
          itemName: item.name,
          person: null,
          from: consensusBefore,
          to: consensusAfter,
        });
      }
    });
  });
  return changes;
}
