// Stable per-person marker colors (white initial stays readable on all of them).
// Shared by the compare view, the view-mode respondent chips and the lens bar.
export const PERSON_COLORS = [
  'bg-[rgba(63,115,123,1)]',
  'bg-purple-700',
  'bg-rose-700',
  'bg-indigo-700',
  'bg-emerald-700',
  'bg-slate-700',
];

export function personColor(personIndex: number): string {
  return PERSON_COLORS[personIndex % PERSON_COLORS.length];
}

export function personInitial(name: string): string {
  return (name.trim()[0] ?? '?').toUpperCase();
}
