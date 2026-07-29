'use client';

import React from 'react';
import { useTranslations } from '../LanguageProvider';

export function AttributionSection() {
  const t = useTranslations().landing;

  return (
    <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>
        {t.attributionCreatedBy} <a href="https://paulvincentroll.com/" className="text-[var(--main-text-color)] hover:underline mx-1" target="_blank" rel="noopener noreferrer">Paul-Vincent Roll</a>.
      </p>
      <p>
        {t.attributionBasedOn}
        <a href="https://drive.google.com/drive/folders/17Hc3UFkDX3qA4IGYmjxEQhMW9BUOdPxt" className="text-[var(--main-text-color)] hover:underline mx-1" target="_blank" rel="noopener noreferrer">
          Relationship Anarchy Smörgåsbord (Version 6)
        </a>
        {t.attributionAnd}
        <a href="https://www.reddit.com/r/polyamory/comments/pwkdxp/v3_relationship_components_menu_last_update_for" className="text-[var(--main-text-color)] hover:underline mx-1" target="_blank" rel="noopener noreferrer">
          Non-Escalator Relationship Menu (Version 3)
        </a>
      </p>
    </div>
  );
}
