import { MenuData, MenuItem } from '../types';

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
