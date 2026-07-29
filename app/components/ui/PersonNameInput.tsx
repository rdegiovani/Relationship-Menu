'use client';

import React from 'react';
import { IconTrash } from '../icons';
import { useTranslations } from '../LanguageProvider';

interface PersonNameInputProps {
  name: string;
  index: number;
  onChange: (value: string) => void;
  onDelete?: () => void;
  showDelete?: boolean;
  className?: string;
}

export function PersonNameInput({
  name,
  index,
  onChange,
  onDelete,
  showDelete = true,
  className = ''
}: PersonNameInputProps) {
  const t = useTranslations().common;

  return (
    <div className={`flex items-center group bg-[rgba(158,198,204,0.05)] dark:bg-[rgba(158,198,204,0.03)] rounded-lg p-1 pl-2 border border-[rgba(158,198,204,0.1)] hover:border-[rgba(158,198,204,0.3)] transition-colors ${className}`}>
      <div className="w-7 h-7 flex items-center justify-center mr-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-[rgba(158,198,204,0.2)] dark:bg-[rgba(158,198,204,0.15)] rounded-full shadow-sm flex-shrink-0">
        {index + 1}
      </div>
      <div className="flex-grow flex items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.personNamePlaceholder(index + 1)}
          className="w-full p-3 bg-transparent border-none rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-bg-color)] focus:bg-white dark:focus:bg-gray-700 transition-colors text-base"
        />
      </div>
      {showDelete && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 flex-shrink-0"
          title={t.removePerson}
        >
          <IconTrash className="h-5 w-5" />
        </button>
      )}
    </div>
  );
} 