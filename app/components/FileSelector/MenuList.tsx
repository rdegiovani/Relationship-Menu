'use client';

import { IconFile, IconTrash } from '../icons';
import { useLanguage } from '../LanguageProvider';
import { formatRelativeTime } from '../../utils/dateHelpers';
import { MenuInfo } from '../../utils/menuStorage';

interface MenuListProps {
  menus: MenuInfo[];
  currentMenuId: string | null;
  onMenuSelect: (menuId: string) => void;
  onMenuDelete: (menuId: string, event: React.MouseEvent) => void;
  compact?: boolean;
}

export function MenuList({ 
  menus, 
  currentMenuId, 
  onMenuSelect, 
  onMenuDelete,
  compact = false 
}: MenuListProps) {
  const { language, t: dictionary } = useLanguage();
  const t = dictionary.files;

  return (
    <div className={`space-y-3 ${!compact ? 'max-h-[300px] overflow-y-auto pr-1 mb-4' : ''}`}>
      {menus.map((menu) => (
        <div
          key={menu.id}
          onClick={() => onMenuSelect(menu.id)}
          className="bg-[rgba(158,198,204,0.08)] dark:bg-[rgba(158,198,204,0.03)] hover:bg-[rgba(158,198,204,0.15)] dark:hover:bg-[rgba(158,198,204,0.08)] rounded-lg p-4 cursor-pointer transition-colors flex items-center group"
        >
          <div className="mr-4 text-[var(--main-text-color)]">
            <IconFile className="h-6 w-6" />
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex items-center">
              <h4 className="font-medium text-[var(--main-text-color)] truncate">
                {menu.title}
              </h4>
              {currentMenuId === menu.id && <span className="ml-2 text-xs flex-shrink-0 bg-[var(--main-text-color)] text-white px-2 py-0.5 rounded-full">{t.current}</span>}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.lastUpdated(formatRelativeTime(new Date(menu.lastUpdated), language))}
            </p>
          </div>
          <button
            onClick={(e) => onMenuDelete(menu.id, e)}
            className="ml-2 p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label={t.deleteMenu}
          >
            <IconTrash className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
} 