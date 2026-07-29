/**
 * Languages the interface is translated into.
 *
 * Template content (public/templates/*.json) may carry additional languages —
 * those are handled separately by the template picker, which only offers the
 * languages a given template actually contains.
 */
export const SUPPORTED_LANGUAGES = ['en', 'pt-BR'] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

/**
 * Endonyms — every language is written in itself, so people can find their own
 * language without having to read English first.
 */
export const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  'pt-BR': 'Português (Brasil)',
};

export function getLanguageName(code: string): string {
  return LANGUAGE_NAMES[code] ?? code;
}
