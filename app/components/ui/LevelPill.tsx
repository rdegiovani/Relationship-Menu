'use client';

import React from 'react';
import { renderIcon, getIconLabel, ICON_OPTIONS } from './IconPicker';
import { Dictionary } from '../../localization/dictionaries';

/** A level pill tinted with the scale's own color (same tiles as the picker/legend). */
export function LevelPill({ icon, levels, struck = false }: {
  icon: string | null;
  levels: Dictionary['levels'];
  struck?: boolean;
}) {
  if (icon === null) {
    return (
      <span className={`px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium ${struck ? 'line-through opacity-70' : ''}`}>
        —
      </span>
    );
  }
  const option = ICON_OPTIONS.find(candidate => candidate.value === icon);
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium text-black dark:text-white ${option?.bgColor ?? ''} ${struck ? 'line-through opacity-70' : ''}`}>
      {renderIcon(icon)}
      {getIconLabel(icon, levels)}
    </span>
  );
}
