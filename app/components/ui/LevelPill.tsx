'use client';

import React from 'react';
import { renderIcon, getIconLabel, ICON_OPTIONS } from './IconPicker';
import { Dictionary } from '../../localization/dictionaries';

// One geometry for every pill in the app: fixed height, pill shape, 14px icon,
// even gaps. The app-wide .icon-container margin (12px, meant for item rows)
// is neutralised so it can't distort the pill.
const PILL_BASE = 'inline-flex items-center gap-1.5 h-6 rounded-full text-xs font-medium whitespace-nowrap';

/** A level pill tinted with the scale's own color (same tiles as the picker/legend). */
export function LevelPill({ icon, levels, struck = false }: {
  icon: string | null;
  levels: Dictionary['levels'];
  struck?: boolean;
}) {
  if (icon === null) {
    return (
      <span className={`${PILL_BASE} px-2.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 ${struck ? 'line-through opacity-70' : ''}`}>
        —
      </span>
    );
  }
  const option = ICON_OPTIONS.find(candidate => candidate.value === icon);
  return (
    <span className={`${PILL_BASE} pl-1.5 pr-2.5 text-black dark:text-white ${option?.bgColor ?? ''} ${struck ? 'line-through opacity-70' : ''}`}>
      <span aria-hidden="true" className="inline-flex items-center justify-center [&_.icon-container]:!m-0 [&_svg]:h-3.5 [&_svg]:w-3.5">
        {renderIcon(icon)}
      </span>
      {getIconLabel(icon, levels)}
    </span>
  );
}
