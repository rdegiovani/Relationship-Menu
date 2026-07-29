'use client';

import { useMemo, useState } from 'react';
import { TemplateSetupFormProps } from './types';
import TemplateIcon from './TemplateIcon';
import MenuStats from '../ui/MenuStats';
import { IconArrowLeft, IconWarning, IconPlusSolid, IconChevron } from '../icons';
import { PersonNameInput } from '../ui/PersonNameInput';
import { getLanguageName } from '../../localization/languages';
import { localizedTemplateText, resolveTemplateLanguage } from '../../localization/templateText';
import { useLanguage } from '../LanguageProvider';

const TemplateSetupForm = ({ selectedTemplate, onSubmit, onCancel }: TemplateSetupFormProps) => {
  const { language: uiLanguage, t } = useLanguage();
  const tt = t.templates;
  const [people, setPeople] = useState<string[]>(['']);
  // Start from the language the user already chose for the interface, so the
  // picker only has to be touched when someone wants a different one.
  const [language, setLanguage] = useState<string>(() =>
    resolveTemplateLanguage(selectedTemplate.languages, uiLanguage)
  );
  const [error] = useState<string | null>(null);

  const showLanguagePicker = useMemo(() => {
    const multipleLanguages = Array.isArray(selectedTemplate.languages) && selectedTemplate.languages.length > 1;
    const hasMenuContent = (selectedTemplate.stats?.sections ?? 0) + (selectedTemplate.stats?.items ?? 0) > 0;
    return multipleLanguages && hasMenuContent;
  }, [selectedTemplate.languages, selectedTemplate.stats]);

  const handleAddPerson = () => {
    setPeople([...people, '']);
  };

  const handleRemovePerson = (index: number) => {
    if (people.length <= 1) return;
    const newPeople = [...people];
    newPeople.splice(index, 1);
    setPeople(newPeople);
  };

  const handlePersonChange = (index: number, value: string) => {
    const newPeople = [...people];
    newPeople[index] = value;
    setPeople(newPeople);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let processedPeople = people.map(person => person.trim() === '' ? tt.anonymous : person.trim());
    if (processedPeople.length === 0) {
      processedPeople = [tt.anonymous];
    }
    onSubmit(selectedTemplate.path, processedPeople, language);
  };

  const localizedTitle = localizedTemplateText(selectedTemplate.name, language);
  const localizedDescription = localizedTemplateText(selectedTemplate.description, language);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow p-6">
      <div className="flex flex-col sm:flex-row sm:items-start mb-2 sm:mb-6">
        <div className="flex flex-1 mb-2 sm:mb-0">
          <div className="w-14 h-14 hidden sm:flex items-center justify-center rounded-full bg-[rgba(158,198,204,0.2)] dark:bg-[rgba(158,198,204,0.15)] mr-4 shadow-sm flex-shrink-0 self-center mt-1">
            <TemplateIcon icon={selectedTemplate.icon} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-[var(--main-text-color)] mb-1">
                {localizedTitle}
              </h3>
              <button
                onClick={onCancel}
                className="flex items-center text-[var(--main-text-color)] hover:text-[var(--main-text-color-hover)] px-3 py-1.5 rounded-lg border border-[rgba(158,198,204,0.2)] bg-[rgba(158,198,204,0.1)] hover:bg-[rgba(158,198,204,0.2)] transition-colors text-sm whitespace-nowrap ml-3 flex-shrink-0"
              >
                <IconArrowLeft className="h-4 w-4 mr-1.5" />
                {tt.backToTemplates}
              </button>
            </div>
            {selectedTemplate.stats && (
              <div className="hidden sm:block mt-2">
                <MenuStats
                  sections={selectedTemplate.stats.sections}
                  items={selectedTemplate.stats.items}
                  compact={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-6 leading-relaxed">
        {localizedDescription}
      </p>

      {showLanguagePicker && (
        <div className="mb-6">
          <label htmlFor="template-language" className="block text-lg font-medium text-[var(--main-text-color)] mb-1">
            {tt.languageLabel}
          </label>
          <div className="relative flex items-center group bg-[rgba(158,198,204,0.05)] dark:bg-[rgba(158,198,204,0.03)] rounded-lg p-1 pl-2 border border-[rgba(158,198,204,0.1)] hover:border-[rgba(158,198,204,0.3)] transition-colors">
            <div className="flex-grow flex items-center">
              <select
                id="template-language"
                value={language}
                onChange={(e) => { setLanguage(e.target.value); e.currentTarget.blur(); }}
                aria-describedby="template-language-hint"
                className="w-full appearance-none p-3 bg-transparent border-none rounded-md focus:outline-none focus:ring-0 focus:shadow-none transition-colors text-base"
              >
                {selectedTemplate.languages?.map((lang) => (
                  <option key={lang} value={lang} lang={lang}>
                    {getLanguageName(lang)}
                  </option>
                ))}
              </select>
            </div>
            <div className="pointer-events-none absolute right-3 text-[var(--main-text-color)]">
              <IconChevron />
            </div>
          </div>
          <p id="template-language-hint" className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tt.languageHint}</p>
        </div>
      )}

      {selectedTemplate.stats && (
        <div className="sm:hidden mb-6">
          <MenuStats
            sections={selectedTemplate.stats.sections}
            items={selectedTemplate.stats.items}
            compact={true}
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block text-lg font-medium text-[var(--main-text-color)] mb-4">
            {tt.peopleLabel}
            <span className="block text-sm font-normal text-gray-500 dark:text-gray-400 mt-1">
              {tt.peopleHint}
            </span>
          </label>

          <div className="space-y-4">
            {people.map((person, index) => (
              <PersonNameInput
                key={index}
                name={person}
                index={index}
                onChange={(value) => handlePersonChange(index, value)}
                onDelete={people.length > 1 ? () => handleRemovePerson(index) : undefined}
                showDelete={people.length > 1}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddPerson}
            className="mt-5 flex items-center text-[var(--main-text-color)] hover:text-[var(--main-text-color-hover)] transition-colors bg-[rgba(158,198,204,0.1)] dark:bg-[rgba(158,198,204,0.05)] hover:bg-[rgba(158,198,204,0.2)] dark:hover:bg-[rgba(158,198,204,0.1)] px-3 sm:px-4 py-2 rounded-lg shadow-sm border border-[rgba(158,198,204,0.2)] text-sm sm:text-base"
          >
            <IconPlusSolid className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
            {tt.addPerson}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800 flex items-center">
            <IconWarning className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">{error}</span>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 sm:px-6 py-2.5 sm:py-3 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--main-text-color)] shadow-sm text-sm sm:text-base bg-[var(--main-text-color)] hover:bg-[var(--main-bg-color)]"
          >
            {tt.submit}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateSetupForm;
