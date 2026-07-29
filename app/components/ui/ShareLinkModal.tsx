'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { IconShare, IconX, IconCheck } from '../icons';
import { useModalA11y } from './useModalA11y';
import { useTranslations } from '../LanguageProvider';

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareLink: string;
}

export function ShareLinkModal({ isOpen, onClose, shareLink }: ShareLinkModalProps) {
  const dictionary = useTranslations();
  const t = dictionary.share;
  const [copied, setCopied] = useState(false);
  const { containerRef } = useModalA11y({
    isOpen,
    onDismiss: onClose,
    autoFocus: false,
  });

  // Only reachable client-side (isOpen flips on user action), so document.body
  // is available for the portal.
  if (!isOpen || typeof document === 'undefined') return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] overflow-y-auto"
      role="dialog"
      aria-labelledby="share-link-modal-title"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500/80 dark:bg-gray-900/90 backdrop-blur-sm"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal content */}
        <div
          ref={containerRef}
          tabIndex={-1}
          className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative z-10 focus:outline-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[var(--main-bg-color)]/20 mr-3">
                <IconShare className="h-5 w-5 text-[var(--main-text-color)]" aria-hidden="true" />
              </div>
              <h2 id="share-link-modal-title" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {t.linkModalTitle}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-[var(--main-bg-color)]/20 transition-colors ring-2 ring-[var(--main-text-color)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--main-text-color)]"
              aria-label={dictionary.common.close}
            >
              <IconX className="h-5 w-5" />
            </button>
          </div>
          <div className="border-b border-gray-200 dark:border-gray-700 -mx-4 sm:-mx-6 mb-6"></div>

          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            {t.linkModalBody}
          </p>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-md pl-3 pr-2 py-2 mb-4">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 min-w-0 bg-transparent text-sm text-gray-800 dark:text-gray-100 outline-none select-all"
              onFocus={(e) => e.target.select()}
            />
            <button
              className="flex-shrink-0 px-4 py-2 bg-[var(--main-text-color)] text-white rounded-md text-sm font-medium hover:bg-[var(--main-text-color-hover)] transition-colors flex items-center justify-center min-w-[80px]"
              onClick={handleCopy}
              disabled={copied}
            >
              {copied ? <IconCheck className="w-5 h-5 text-white" /> : t.copy}
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t.linkModalWarning}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
