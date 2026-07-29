'use client';

import { IconDrawer, IconClipboard } from '../icons';
import { useTranslations } from '../LanguageProvider';

interface MenuStatsProps {
  sections: number;
  items: number;
  className?: string;
  compact?: boolean;
}

const MenuStats = ({ sections, items, className = "", compact = false }: MenuStatsProps) => {
  const t = useTranslations().common;

  // Define styling based on compact prop
  const itemClasses = compact 
    ? "flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 bg-[rgba(158,198,204,0.1)] dark:bg-[rgba(158,198,204,0.05)] px-3 py-1.5 rounded-md border border-[rgba(158,198,204,0.2)]"
    : "flex items-center bg-[rgba(158,198,204,0.15)] dark:bg-[rgba(158,198,204,0.1)] px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-[rgba(158,198,204,0.3)] shadow-sm whitespace-nowrap";
  
  const iconClasses = compact
    ? "h-4 w-4 mr-1.5 text-[var(--main-text-color)]"
    : "h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-[var(--main-text-color)]";
  
  const textClasses = compact
    ? "text-gray-600 dark:text-gray-300"
    : "text-gray-800 dark:text-gray-200";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={itemClasses}>
        <IconDrawer className={iconClasses} />
        <span className={textClasses}>{t.topics(sections)}</span>
      </div>
      <div className={itemClasses}>
        <IconClipboard className={iconClasses} />
        <span className={textClasses}>{t.items(items)}</span>
      </div>
    </div>
  );
};

export default MenuStats; 