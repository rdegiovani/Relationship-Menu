'use client';

import { useTranslations } from '../LanguageProvider';
import React, { useRef } from 'react';
import { Step, TransitionPhase } from './types';
import { getModalPosition } from './utils';
import { useModalSize } from './hooks';

interface WizardOverlayProps {
  step: Step;
  spotlightRect: DOMRect;
  transitionPhase: TransitionPhase;
  currentSubStep: number;
  currentStep: number;
  steps: Step[];
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  calculateProgressPercentage: () => number;
  calculateCurrentStepNumber: () => number;
  calculateTotalSteps: () => number;
}

export const WizardOverlay: React.FC<WizardOverlayProps> = ({
  step,
  spotlightRect,
  transitionPhase,
  currentSubStep,
  currentStep,
  steps,
  onNext,
  onPrevious,
  onClose,
  calculateProgressPercentage,
  calculateCurrentStepNumber,
  calculateTotalSteps
}) => {
  const t = useTranslations().wizard;

  const modalRef = useRef<HTMLDivElement>(null);
  const modalSize = useModalSize(modalRef, transitionPhase, currentStep, currentSubStep);
  const hasSubSteps = step?.subSteps && step.subSteps.length > 0;
  const subStep = hasSubSteps && step.subSteps ? step.subSteps[currentSubStep] : null;

  return (
    <div className="fixed inset-0 z-[3000] pointer-events-auto">
      {spotlightRect && (
        <>
          <svg
            className="fixed inset-0 w-screen h-screen z-[3000] pointer-events-none"
            style={{ 
              left: 0, 
              top: 0, 
              width: '100vw', 
              height: '100vh', 
              position: 'fixed',
              opacity: transitionPhase === 'showFullPage' ? 0 : 1,
              transition: 'opacity 400ms ease-in-out'
            }}
          >
            <defs>
              <mask id="onboarding-spotlight-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <rect
                  x={spotlightRect.left - 8}
                  y={spotlightRect.top - 8}
                  width={spotlightRect.width + 16}
                  height={spotlightRect.height + 16}
                  rx={12}
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="black"
              fillOpacity="0.6"
              mask="url(#onboarding-spotlight-mask)"
              style={{ transition: 'opacity 400ms ease-in-out' }}
            />
          </svg>
          <div
            className="fixed z-[3001] pointer-events-none transition-opacity duration-400"
            style={{
              left: spotlightRect.left - 8,
              top: spotlightRect.top - 8,
              width: spotlightRect.width + 16,
              height: spotlightRect.height + 16,
              borderRadius: 12,
              boxShadow: '0 0 0 4px #94bcc2, 0 0 16px 8px rgba(148,188,194,0.2)',
              border: '2px solid #94bcc2',
              opacity: transitionPhase === 'showFullPage' ? 0 : 1,
            }}
          />
        </>
      )}
      {spotlightRect && step && (
        <div
          ref={modalRef}
          className="fixed z-[3002] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-[rgba(148,188,194,0.5)] transition-opacity duration-400"
          style={{
            ...getModalPosition(spotlightRect, modalSize),
            boxSizing: 'border-box',
            opacity: transitionPhase === 'showFullPage' || transitionPhase === 'fadeOutWelcome' ? 0 : 1,
          }}
        >
          <h3 className="text-lg font-bold mb-2 text-[rgba(79,139,149,1)]">{step.title}</h3>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex-grow">
              <div 
                className="bg-[rgba(148,188,194,0.8)] h-full rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${calculateProgressPercentage()}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{calculateCurrentStepNumber()}/{calculateTotalSteps()}</span>
          </div>
          
          {hasSubSteps ? (
            <div className="space-y-4 mb-4">
              {/* Intro text if available */}
              {step.description && (
                <p 
                  className="text-gray-700 dark:text-gray-200 font-medium mb-2"
                >
                  {step.description}
                </p>
              )}
              
              {/* Current Sub-step */}
              <div 
                className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-sm border border-[rgba(148,188,194,0.3)]"
                key={`substep-${currentSubStep}`}
              >
                <h4 className="font-medium text-lg mb-3" style={{ color: 'rgba(79,139,149,1)' }}>
                  {subStep?.title}
                </h4>
                <p 
                  className="text-gray-700 dark:text-gray-200 leading-relaxed"
                >
                  {subStep?.description || ''}
                </p>
              </div>
            </div>
          ) : (
            <p 
              className="mb-4 text-gray-700 dark:text-gray-200"
            >
              {step.description}
            </p>
          )}
          
          <div className="flex justify-between items-center gap-2">
            <div>
              {(currentStep > 0 || (hasSubSteps && currentSubStep > 0)) && (
                <button
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
                  onClick={onPrevious}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t.previous}
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={onClose}
              >
                {t.skip}
              </button>
              <button
                className="px-4 py-2 rounded bg-[rgba(148,188,194,1)] text-white hover:bg-[rgba(79,139,149,1)]"
                onClick={onNext}
              >
                {currentStep === steps.length - 1 && (!hasSubSteps || (step.subSteps && currentSubStep === step.subSteps.length - 1)) ? t.finish : t.next}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 