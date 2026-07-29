'use client';

import { TemplateItem as TemplateItemType } from './types';
import TemplateIcon from './TemplateIcon';
import MenuStats from '../ui/MenuStats';
import { IconChevron } from '../icons';
import { localizedTemplateText } from '../../localization/templateText';
import { useLanguage } from '../LanguageProvider';

interface TemplateItemProps {
  template: TemplateItemType;
  onClick: (template: TemplateItemType) => void;
}

const TemplateItem = ({ template, onClick }: TemplateItemProps) => {
  const { language } = useLanguage();
  const name = localizedTemplateText(template.name, language);
  const description = localizedTemplateText(template.description, language);

  return (
    <div 
      onClick={() => onClick(template)}
      className="relative bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:bg-[rgba(158,198,204,0.1)] dark:hover:bg-[rgba(158,198,204,0.05)] border border-gray-200 dark:border-gray-700 shadow hover:shadow-md hover:border-[var(--main-bg-color)] group"
    >
      <div className="flex items-stretch space-x-3 sm:space-x-5">
        <div className="hidden sm:block flex-shrink-0 pt-1">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[rgba(158,198,204,0.2)] dark:bg-[rgba(158,198,204,0.15)] shadow-sm">
            <TemplateIcon icon={template.icon} />
          </div>
        </div>
        
        <div className="flex-grow flex flex-col">
          <div className="flex items-center sm:hidden mb-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(158,198,204,0.2)] dark:bg-[rgba(158,198,204,0.15)] mr-3 shadow-sm">
              <TemplateIcon icon={template.icon} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--main-text-color)] group-hover:text-[var(--main-text-color-hover)] transition-colors break-words">
              {name}
            </h3>
          </div>
          
          <h3 className="hidden sm:block text-xl font-semibold text-[var(--main-text-color)] group-hover:text-[var(--main-text-color-hover)] transition-colors mb-1 break-words">
            {name}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mt-1 sm:mt-2 mb-3 sm:mb-4 leading-relaxed break-words">
            {description}
          </p>
          
          {template.stats ? (
            <div className="flex mt-auto items-center justify-between">
              <MenuStats 
                sections={template.stats.sections} 
                items={template.stats.items} 
              />
              
              <div className="ml-2 flex sm:hidden items-center">
                <div className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-[rgba(158,198,204,0.4)] dark:bg-[rgba(158,198,204,0.3)] text-[var(--main-text-color)] shadow-sm">
                  <IconChevron direction="right" className="h-4 w-4" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-end mt-auto">
              <div className="h-7 w-7 sm:h-8 sm:w-8 flex sm:hidden items-center justify-center rounded-full bg-[rgba(158,198,204,0.4)] dark:bg-[rgba(158,198,204,0.3)] text-[var(--main-text-color)] shadow-sm">
                <IconChevron direction="right" className="h-4 w-4" />
              </div>
            </div>
          )}
        </div>
        
        <div className="hidden sm:flex flex-col justify-center items-center">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[rgba(158,198,204,0.4)] dark:bg-[rgba(158,198,204,0.3)] text-[var(--main-text-color)] shadow-sm">
            <IconChevron direction="right" className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateItem; 