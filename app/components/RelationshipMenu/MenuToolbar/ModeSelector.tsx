'use client';

import React from 'react';
import { MenuMode } from '../../../types';
import { IconEye, IconPencilPage, IconGear } from '../../../components/icons';
import { useTranslations } from '../../LanguageProvider';

interface ModeSelectorProps {
  currentMode: MenuMode;
  onModeChange: (mode: MenuMode) => void;
}

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  const t = useTranslations().editor;
  return (
    <div className="w-full">
      <div 
        className="flex rounded-lg border border-[var(--main-text-color)] bg-[rgba(148,188,194,0.15)] dark:bg-[rgba(79,139,149,0.15)] p-1 relative"
        role="group"
        aria-label={t.modeLabel}
      >
        {/* Hidden radio inputs for accessibility */}
        <input 
          type="radio" 
          id="mode-view" 
          name="mode-selector" 
          className="absolute opacity-0 h-0 w-0" 
          checked={currentMode === 'view'} 
          onChange={() => onModeChange('view')}
        />
        <input 
          type="radio" 
          id="mode-fill" 
          name="mode-selector" 
          className="absolute opacity-0 h-0 w-0" 
          checked={currentMode === 'fill'} 
          onChange={() => onModeChange('fill')}
        />
        <input 
          type="radio" 
          id="mode-edit" 
          name="mode-selector" 
          className="absolute opacity-0 h-0 w-0" 
          checked={currentMode === 'edit'} 
          onChange={() => onModeChange('edit')}
        />

        {/* Simple segment control buttons */}
        <label 
          htmlFor="mode-view"
          className={`flex-1 flex items-center justify-center h-10 relative z-10 cursor-pointer rounded-md transition-colors ${
            currentMode === 'view' ? 'bg-[var(--main-text-color)] text-white' : 'text-[var(--main-text-color)]'
          }`}
        >
          <div className="flex items-center justify-center">
            <IconEye className="h-5 w-5" aria-hidden="true" />
            <span className="ml-2 text-sm font-medium whitespace-nowrap">{t.modeView}</span>
          </div>
        </label>
        
        <label 
          htmlFor="mode-fill"
          className={`flex-1 flex items-center justify-center h-10 relative z-10 cursor-pointer rounded-md transition-colors ${
            currentMode === 'fill' ? 'bg-[var(--main-text-color)] text-white' : 'text-[var(--main-text-color)]'
          }`}
        >
          <div className="flex items-center justify-center">
            <IconPencilPage className="h-5 w-5" aria-hidden="true" />
            <span className="ml-2 text-sm font-medium whitespace-nowrap">{t.modeFill}</span>
          </div>
        </label>
        
        <label 
          htmlFor="mode-edit"
          className={`flex-1 flex items-center justify-center h-10 relative z-10 cursor-pointer rounded-md transition-colors ${
            currentMode === 'edit' ? 'bg-[var(--main-text-color)] text-white' : 'text-[var(--main-text-color)]'
          }`}
        >
          <div className="flex items-center justify-center">
            <IconGear className="h-5 w-5" aria-hidden="true" />
            <span className="ml-2 text-sm font-medium whitespace-nowrap">{t.modeEdit}</span>
          </div>
        </label>
      </div>
    </div>
  );
} 