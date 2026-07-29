'use client';

import React from 'react';
import { MenuItem } from '../../../types';
import { renderIcon, getIconLabel } from '../../ui/IconPicker';
import { useTranslations } from '../../LanguageProvider';
import { getItemSpanClasses } from './utils';
import { renderRichText, isRichTextEmpty, richTextToPlainText } from '../../../utils/richTextUtils';

interface ViewMenuItemProps {
  item: MenuItem;
}

export function ViewMenuItem({ item }: ViewMenuItemProps) {
  // Get the icon label using the utility function
  const t = useTranslations().levels;
  const iconLabel = getIconLabel(item.icon, t);
  
  // Determine if icon is set and not "talk"
  const hasIcon = !!item.icon && item.icon !== "talk";
  
  return (
    <>
      <div className="item-name font-bold flex items-center text-gray-900 dark:text-gray-50 max-sm:items-start">
        {renderIcon(item.icon)}
        <span className={getItemSpanClasses(item.icon)}>
          {item.name}
        </span>
        <span className="sr-only">, {iconLabel}</span>
      </div>
      {!isRichTextEmpty(item.note) && (
        <div className={`${hasIcon ? 'mt-1.5' : 'mt-0.5'} ml-9 text-gray-700 dark:text-gray-50 text-[0.9em] whitespace-pre-line break-words max-sm:mt-1 max-sm:ml-8`} aria-label={`Note: ${richTextToPlainText(item.note)}`}>
          {renderRichText(item.note)}
        </div>
      )}
    </>
  );
} 