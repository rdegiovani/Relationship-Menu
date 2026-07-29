'use client';

import { IconCloud, IconSpinner } from '../icons';
import { useTranslations } from '../LanguageProvider';

interface FileUploaderProps {
  isDragging: boolean;
  isProcessing: boolean;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onClick: () => void;
  compact?: boolean;
}

export function FileUploader({
  isDragging,
  isProcessing,
  onDrop,
  onDragOver,
  onDragLeave,
  onClick,
  compact = false
}: FileUploaderProps) {
  const t = useTranslations().files;

  return (
    <div 
      className={`border-3 border-dashed rounded-xl ${compact ? 'p-5' : 'p-10'} text-center cursor-pointer hover:bg-[rgba(158,198,204,0.05)] dark:hover:bg-[rgba(158,198,204,0.03)] ${
        isDragging ? 'border-[var(--main-text-color)] bg-blue-50 dark:bg-blue-900/20' : 'border-[var(--main-bg-color)] dark:border-[rgba(158,198,204,0.4)]'
      } ${isProcessing ? 'opacity-70 pointer-events-none' : ''}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={onClick}
    >
      {isProcessing ? (
        <div className="mb-6 animate-spin">
          <IconSpinner className="h-16 w-16 mx-auto text-[var(--main-text-color)]" />
        </div>
      ) : compact ? (
        // Compact version without icon
        <>
          <p className="text-lg text-[var(--main-text-color)] font-semibold mb-1">
            {t.uploadTitle}
          </p>
          <p className="text-sm text-[var(--main-text-color-hover)]">
            {t.uploadHint}
          </p>
        </>
      ) : (
        // Full version with icon
        <>
          <div className="mb-6">
            <IconCloud className={`h-16 w-16 mx-auto text-[var(--main-text-color)] transition-transform duration-200 ${isDragging ? 'scale-110' : ''}`} />
          </div>
          <p className="mb-3 text-xl text-[var(--main-text-color)] font-semibold">
            {t.uploadTitle}
          </p>
          <p className="text-[var(--main-text-color-hover)] mb-2">
            {t.uploadHint}
          </p>
        </>
      )}
      
      {!isProcessing && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {t.uploadFormats}
        </p>
      )}
    </div>
  );
} 