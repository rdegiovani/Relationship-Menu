import { DEFAULT_LANGUAGE } from './languages';

/** A template string keyed by language code, e.g. { en: 'Romantic', de: 'Romantisch' }. */
export type LocalizedText = Record<string, string> | undefined;

/**
 * Picks the best available translation for a piece of template content.
 *
 * Templates are contributed per language and not every one carries every
 * language, so this falls back to English and then to whatever is present —
 * showing a template in the wrong language beats showing an empty card.
 */
export function localizedTemplateText(text: LocalizedText, language: string): string {
  if (!text) return '';
  return text[language] || text[DEFAULT_LANGUAGE] || Object.values(text)[0] || '';
}

/**
 * The language a template should be filled in with: the one the user picked,
 * when the template has it, otherwise the template's own first choice.
 */
export function resolveTemplateLanguage(
  available: string[] | undefined,
  preferred: string
): string {
  if (!available?.length) return preferred;
  if (available.includes(preferred)) return preferred;
  if (available.includes(DEFAULT_LANGUAGE)) return DEFAULT_LANGUAGE;
  return available[0];
}
