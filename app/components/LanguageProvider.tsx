'use client';

import { useEffect, useCallback, createContext, useContext, useMemo, useSyncExternalStore, ReactNode } from 'react';
import { LanguageCode, DEFAULT_LANGUAGE } from '../localization/languages';
import { DICTIONARIES, Dictionary } from '../localization/dictionaries';
import { getStoredLanguage, saveLanguage, detectBrowserLanguage } from '../utils/languageStorage';

type LanguageContextValue = {
  /** Language currently in use — falls back to the default until one is picked. */
  language: LanguageCode;
  /** False until the user has picked a language, which is what opens the picker. */
  hasChosenLanguage: boolean;
  setLanguage: (language: LanguageCode) => void;
  /** Translations for the current language. */
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Same-tab notification: saveLanguage() writes storage, then this fires so the
// external store re-reads (the native `storage` event only fires cross-tab).
const LANGUAGE_CHANGE_EVENT = 'languagePreferenceChanged';

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

/** Shorthand for the common case of only needing the strings. */
export function useTranslations(): Dictionary {
  return useLanguage().t;
}

function subscribeLanguage(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, callback);
  };
}

// A plain string (or null) snapshot so useSyncExternalStore can compare by value.
function getLanguageSnapshot(): LanguageCode | null {
  return getStoredLanguage();
}

// The static export is built in English, so that is what hydration must match.
// The document stays hidden (data-i18n="pending", see globals.css) until the
// effect below runs, so the real language paints first — no flash of English.
function getLanguageServerSnapshot(): LanguageCode | null {
  return null;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const storedLanguage = useSyncExternalStore(
    subscribeLanguage,
    getLanguageSnapshot,
    getLanguageServerSnapshot
  );

  // Before a choice is made, follow the browser. That only shows up on routes
  // that skip the picker — a shared menu link, where interrupting someone
  // mid-conversation to ask about languages would be worse than guessing.
  const language = storedLanguage ?? (typeof navigator === 'undefined' ? DEFAULT_LANGUAGE : detectBrowserLanguage());
  const hasChosenLanguage = storedLanguage !== null;

  const setLanguage = useCallback((newLanguage: LanguageCode) => {
    saveLanguage(newLanguage);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }, []);

  // Keep <html lang> honest for screen readers, hyphenation and translation
  // tools, and reveal the document once the language is settled.
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.removeAttribute('data-i18n');
  }, [language]);

  const contextValue: LanguageContextValue = useMemo(
    () => ({
      language,
      hasChosenLanguage,
      setLanguage,
      t: DICTIONARIES[language],
    }),
    [language, hasChosenLanguage, setLanguage]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
