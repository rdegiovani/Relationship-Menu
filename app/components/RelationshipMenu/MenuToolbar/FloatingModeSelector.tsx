'use client';

import React from 'react';
import { MenuMode } from '../../../types';
import { IconEye, IconPencilPage, IconGear, IconCompare } from '../../../components/icons';
import { useTranslations } from '../../LanguageProvider';

interface FloatingModeSelectorProps {
  currentMode: MenuMode;
  onModeChange: (mode: MenuMode) => void;
  /** Site fork: shows the Compare mode when the menu uses individual answers. */
  showCompare?: boolean;
}

export function FloatingModeSelector({ currentMode, onModeChange, showCompare = false }: FloatingModeSelectorProps) {
  const t = useTranslations().editor;
  return (
    <div className="hc-mode-selector fixed bottom-4 right-4 z-50 md:block md:shadow-lg md:rounded-full md:border md:border-[var(--main-text-color)] md:bg-white md:dark:bg-gray-800">
      {/* Mobile Tab Bar (full width at bottom on small screens) */}
      <div
        className="w-full fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden"
        data-onboarding="mode-selector"
        style={{
          boxShadow: '0 0px 100px 0px rgba(0, 0, 0, 0.1), 0 -2px 8px -2px rgba(0, 0, 0, 0.1)'
        }}
      >
        <button
          onClick={() => onModeChange('view')}
          className={`flex flex-col items-center justify-center py-3 px-5 ${
            currentMode === 'view' ? 'text-[var(--main-text-color)] font-medium' : 'text-gray-500 dark:text-gray-400'
          }`}
          aria-current={currentMode === 'view' ? 'page' : undefined}
        >
          <IconEye className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs mt-1">{t.modeView}</span>
        </button>
        
        <button
          onClick={() => onModeChange('fill')}
          className={`flex flex-col items-center justify-center py-3 px-5 ${
            currentMode === 'fill' ? 'text-[var(--main-text-color)] font-medium' : 'text-gray-500 dark:text-gray-400'
          }`}
          aria-current={currentMode === 'fill' ? 'page' : undefined}
        >
          <IconPencilPage className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs mt-1">{t.modeFill}</span>
        </button>

        {showCompare && (
          <button
            onClick={() => onModeChange('compare')}
            className={`flex flex-col items-center justify-center py-3 px-5 ${
              currentMode === 'compare' ? 'text-[var(--main-text-color)] font-medium' : 'text-gray-500 dark:text-gray-400'
            }`}
            aria-current={currentMode === 'compare' ? 'page' : undefined}
          >
            <IconCompare className="h-6 w-6" aria-hidden="true" />
            <span className="text-xs mt-1">{t.modeCompare}</span>
          </button>
        )}

        <button
          onClick={() => onModeChange('edit')}
          className={`flex flex-col items-center justify-center py-3 px-5 ${
            currentMode === 'edit' ? 'text-[var(--main-text-color)] font-medium' : 'text-gray-500 dark:text-gray-400'
          }`}
          aria-current={currentMode === 'edit' ? 'page' : undefined}
        >
          <IconGear className="h-6 w-6" aria-hidden="true" />
          <span className="text-xs mt-1">{t.modeEdit}</span>
        </button>
      </div>

      {/* Desktop Floating Tooltip (circular buttons at bottom right) */}
      <div
        className="hidden md:flex md:flex-col md:items-center md:gap-2 md:p-2"
        data-onboarding="mode-selector"
      >
        <button
          onClick={() => onModeChange('view')}
          className={`p-3 rounded-full ${
            currentMode === 'view' 
              ? 'bg-[var(--main-text-color)] text-white' 
              : 'bg-[rgba(148,188,194,0.15)] dark:bg-[rgba(79,139,149,0.15)] text-[var(--main-text-color)] hover:bg-[rgba(148,188,194,0.3)] dark:hover:bg-[rgba(79,139,149,0.3)]'
          }`}
          aria-label={t.modeViewLabel}
          title={t.modeViewLabel}
        >
          <IconEye className="h-5 w-5" aria-hidden="true" />
        </button>
        
        <button
          onClick={() => onModeChange('fill')}
          className={`p-3 rounded-full ${
            currentMode === 'fill' 
              ? 'bg-[var(--main-text-color)] text-white' 
              : 'bg-[rgba(148,188,194,0.15)] dark:bg-[rgba(79,139,149,0.15)] text-[var(--main-text-color)] hover:bg-[rgba(148,188,194,0.3)] dark:hover:bg-[rgba(79,139,149,0.3)]'
          }`}
          aria-label={t.modeFillLabel}
          title={t.modeFillLabel}
        >
          <IconPencilPage className="h-5 w-5" aria-hidden="true" />
        </button>

        {showCompare && (
          <button
            onClick={() => onModeChange('compare')}
            className={`p-3 rounded-full ${
              currentMode === 'compare'
                ? 'bg-[var(--main-text-color)] text-white'
                : 'bg-[rgba(148,188,194,0.15)] dark:bg-[rgba(79,139,149,0.15)] text-[var(--main-text-color)] hover:bg-[rgba(148,188,194,0.3)] dark:hover:bg-[rgba(79,139,149,0.3)]'
            }`}
            aria-label={t.modeCompareLabel}
            title={t.modeCompareLabel}
          >
            <IconCompare className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        <button
          onClick={() => onModeChange('edit')}
          className={`p-3 rounded-full ${
            currentMode === 'edit' 
              ? 'bg-[var(--main-text-color)] text-white' 
              : 'bg-[rgba(148,188,194,0.15)] dark:bg-[rgba(79,139,149,0.15)] text-[var(--main-text-color)] hover:bg-[rgba(148,188,194,0.3)] dark:hover:bg-[rgba(79,139,149,0.3)]'
          }`}
          aria-label={t.modeEditLabel}
          title={t.modeEditLabel}
        >
          <IconGear className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
} 