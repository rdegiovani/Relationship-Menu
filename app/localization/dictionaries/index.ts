import { LanguageCode } from '../languages';
import { Dictionary, en } from './en';
import { ptBR } from './pt-BR';

export type { Dictionary };

export const DICTIONARIES: Record<LanguageCode, Dictionary> = {
  en,
  'pt-BR': ptBR,
};
