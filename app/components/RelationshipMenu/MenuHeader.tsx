'use client';

import React from 'react';
import { MenuMode } from '../../types';
import { IconPlus } from '../icons';
import { useLanguage } from '../LanguageProvider';
import { PersonNameInput } from '../ui/PersonNameInput';
import { formatPeopleNames } from '../../utils/formatUtils';

interface MenuHeaderProps {
  mode: MenuMode;
  people: string[];
  lastUpdate: string;
  onPersonNameChange: (personIndex: number, newName: string) => void;
  onAddPerson: () => void;
  onDeletePerson: (personIndex: number) => void;
}

export function MenuHeader({
  mode,
  people,
  lastUpdate,
  onPersonNameChange,
  onAddPerson,
  onDeletePerson
}: MenuHeaderProps) {
  const { language, t: dictionary } = useLanguage();
  const t = dictionary.editor;
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full md:w-auto transition-all duration-150" data-onboarding="menu-header">
      {mode === 'edit' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-200 dark:border-gray-700 transition-all">
          <h2 className="text-xl font-bold mb-5 text-[var(--main-text-color)] dark:text-[var(--main-text-color)] transition-colors">{t.menuFor}</h2>
          <div className="space-y-4 w-full max-w-xl">
            {people.map((personName, index) => (
              <PersonNameInput
                key={index}
                name={personName}
                index={index}
                onChange={(value) => onPersonNameChange(index, value)}
                onDelete={people.length > 1 ? () => onDeletePerson(index) : undefined}
                showDelete={people.length > 1}
              />
            ))}
            <button
              type="button"
              onClick={onAddPerson}
              className="mt-4 flex items-center text-[var(--main-text-color)] hover:text-[var(--main-text-color-hover)] transition-all duration-150 bg-[rgba(158,198,204,0.1)] dark:bg-[rgba(158,198,204,0.05)] hover:bg-[rgba(158,198,204,0.2)] dark:hover:bg-[rgba(158,198,204,0.1)] px-4 py-2 rounded-lg shadow-sm border border-[rgba(158,198,204,0.2)] text-base"
            >
              <IconPlus className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
              Add Person
            </button>
          </div>
        </div>
      ) : (
        <div className="transition-all duration-150">
          <div className="flex items-center">
            <h2 className="text-[var(--main-text-color)] dark:text-[var(--main-text-color)] font-bold text-2xl transition-colors">
              {formatPeopleNames(people, dictionary.common.and)}
            </h2>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors">{t.lastUpdated(formatDate(lastUpdate))}</p>
        </div>
      )}
    </div>
  );
} 