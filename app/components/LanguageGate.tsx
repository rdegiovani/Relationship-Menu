'use client';

import { useState, ReactNode } from 'react';
import { useLanguage } from './LanguageProvider';
import { SUPPORTED_LANGUAGES, LanguageCode, getLanguageName } from '../localization/languages';
import { DICTIONARIES } from '../localization/dictionaries';
import { detectBrowserLanguage } from '../utils/languageStorage';
import { IconGlobe, IconCheck } from './icons';

/**
 * First-run language picker.
 *
 * Shown once, before any other screen, and never again after a choice is made.
 * Two details worth keeping:
 * - Every option is written in its own language (endonym) and carries `lang`,
 *   so nobody has to read English to find their language, and screen readers
 *   switch voice per option (WCAG 3.1.2).
 * - The whole screen re-renders in the highlighted language as the selection
 *   moves, so the choice is previewed before it is committed.
 */
function LanguagePicker({ onConfirm }: { onConfirm: (language: LanguageCode) => void }) {
  const browserLanguage = detectBrowserLanguage();
  const [selected, setSelected] = useState<LanguageCode>(browserLanguage);

  // Preview: the copy follows the highlighted option, not the stored language.
  const t = DICTIONARIES[selected].language;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-[rgba(158,198,204,0.3)] to-[rgba(99,159,169,0.2)] dark:from-[rgba(158,198,204,0.15)] dark:to-[rgba(99,159,169,0.1)] px-6 py-5">
          <div className="flex items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/60 dark:bg-gray-800/60 mr-3 flex-shrink-0">
              <IconGlobe className="h-5 w-5 text-[var(--main-text-color)]" />
            </div>
            <h1 className="text-xl font-bold text-[var(--main-text-color)]">
              {t.pickerTitle}
            </h1>
          </div>
        </div>

        <div className="p-6">
          <fieldset>
            <legend className="sr-only">{t.pickerTitle}</legend>
            <div className="space-y-2">
              {SUPPORTED_LANGUAGES.map((code) => {
                const isSelected = selected === code;
                const isBrowserDefault = code === browserLanguage;
                const hintId = `language-${code}-hint`;

                return (
                  <label
                    key={code}
                    className={`hc-option flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      isSelected
                        ? 'hc-option-active border-[var(--main-text-color)] bg-[var(--main-bg-color)]/10'
                        : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="language"
                      value={code}
                      checked={isSelected}
                      onChange={() => setSelected(code)}
                      aria-describedby={isBrowserDefault ? hintId : undefined}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--main-text-color)] peer-focus-visible:ring-offset-2 ${
                        isSelected
                          ? 'border-[var(--main-text-color)]'
                          : 'border-gray-300 dark:border-gray-500'
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-[var(--main-text-color)]" />
                      )}
                    </span>
                    <div className="ml-3">
                      <span
                        lang={code}
                        className="block text-base font-medium text-gray-900 dark:text-gray-100"
                      >
                        {getLanguageName(code)}
                      </span>
                      {isBrowserDefault && (
                        <span
                          id={hintId}
                          className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5"
                        >
                          <IconCheck className="h-3 w-3 mr-1 flex-shrink-0" />
                          {t.browserSuggestion}
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {t.pickerSubtitle}
          </p>

          {/* Uses the darker --main-text-color-hover as the resting background:
              white on --main-text-color is 3.85:1, below the 4.5:1 WCAG AA
              minimum for this text size. */}
          <button
            type="button"
            onClick={() => onConfirm(selected)}
            className="mt-6 w-full px-4 py-3 rounded-lg bg-[var(--main-text-color-hover)] text-white font-medium shadow-md transition-colors hover:brightness-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--main-text-color)] focus-visible:ring-offset-2"
          >
            {t.pickerConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders the picker until a language is chosen, then gets out of the way.
 * Routes that must never be interrupted (a shared menu link) opt out via
 * `skip` and inherit the language of the menu they were handed.
 */
export default function LanguageGate({
  children,
  skip = false,
}: {
  children: ReactNode;
  skip?: boolean;
}) {
  const { hasChosenLanguage, setLanguage } = useLanguage();

  if (!skip && !hasChosenLanguage) {
    return <LanguagePicker onConfirm={setLanguage} />;
  }

  return <>{children}</>;
}
