'use client';

import { useTranslations } from '../LanguageProvider';
import React from 'react';
import { WelcomeScreen as WelcomeScreenType } from './types';

interface WelcomeScreenProps {
  welcomeScreen: WelcomeScreenType;
  onStart: () => void;
  onSkip: () => void;
  transitionPhase: 'none' | 'fadeOutWelcome' | 'showFullPage' | 'fadeInSpotlight';
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  welcomeScreen,
  onStart,
  onSkip,
  transitionPhase
}) => {
  const t = useTranslations().wizard;

  return (
    <div className="fixed inset-0 z-[3000] pointer-events-auto flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-400" 
        style={{ opacity: transitionPhase === 'fadeOutWelcome' ? 0 : 1 }}
      />
      <div 
        className="relative z-[3002] bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md border border-[rgba(148,188,194,0.5)] mx-4 transition-opacity duration-400" 
        style={{ 
          opacity: transitionPhase === 'fadeOutWelcome' ? 0 : 1,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(148, 188, 194, 0.2)'
        }}
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[rgba(148,188,194,0.15)] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(79,139,149,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h13"></path>
              <path d="M3 12h13"></path>
              <path d="M3 18h13"></path>
              <path d="M19 6l1 1 2-2"></path>
              <path d="M19 12l1 1 2-2"></path>
              <path d="M19 18l1 1 2-2"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-[rgba(79,139,149,1)] text-center">{welcomeScreen.title}</h2>
        <p className="mb-8 text-gray-700 dark:text-gray-200 text-center leading-relaxed">{welcomeScreen.description}</p>
        <div className="flex flex-col gap-3 w-full">
          <button
            className="w-full py-3 rounded-lg bg-[rgba(148,188,194,1)] text-white hover:bg-[rgba(79,139,149,1)] transition-colors font-medium"
            onClick={onStart}
          >
            {t.startTour}
          </button>
          <button
            className="w-full py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={onSkip}
          >
            {t.skip}
          </button>
        </div>
      </div>
    </div>
  );
}; 