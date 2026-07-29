import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, LanguageCode } from '../localization/languages';

// localStorage key, following the same naming convention as themeStorage
export const LANGUAGE_STORAGE_KEY = 'relationshipMenu.language';

/**
 * Validates if the value is a language we ship translations for
 */
export function isSupportedLanguage(value: unknown): value is LanguageCode {
  return typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

/**
 * Reads the stored UI language.
 * Returns null when the user has never picked one — the caller then shows the
 * language picker instead of silently guessing.
 */
export function getStoredLanguage(): LanguageCode | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSupportedLanguage(stored) ? stored : null;
  } catch (error) {
    console.error('Error reading language preference:', error);
    return null;
  }
}

/**
 * Saves the UI language to localStorage
 */
export function saveLanguage(language: LanguageCode): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    return true;
  } catch (error) {
    console.error('Error saving language preference:', error);
    return false;
  }
}

/**
 * Best guess from the browser, used to pre-select an option in the picker.
 * Matches the exact tag first ('pt-BR'), then the base tag ('pt' -> 'pt-BR'),
 * so a Portuguese speaker never lands on the picker with English highlighted.
 */
export function detectBrowserLanguage(): LanguageCode {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const candidate of candidates) {
    if (!candidate) continue;

    const exact = SUPPORTED_LANGUAGES.find(
      (lang) => lang.toLowerCase() === candidate.toLowerCase()
    );
    if (exact) return exact;

    const base = candidate.split('-')[0].toLowerCase();
    const byBase = SUPPORTED_LANGUAGES.find(
      (lang) => lang.split('-')[0].toLowerCase() === base
    );
    if (byBase) return byBase;
  }

  return DEFAULT_LANGUAGE;
}
