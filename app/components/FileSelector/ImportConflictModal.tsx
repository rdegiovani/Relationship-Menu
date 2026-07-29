'use client';

import { ConfirmModal } from '../ui/ConfirmModal';
import { useTranslations } from '../LanguageProvider';
import { MenuData } from '../../types';

interface ImportConflictProps {
  conflict: {
    exists: boolean;
    isNewer: boolean;
    data: MenuData;
    id: string;
  } | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ImportConflictModal({ conflict, onConfirm, onCancel }: ImportConflictProps) {
  const t = useTranslations().files;

  if (!conflict) return null;

  return (
    <ConfirmModal
      isOpen={true}
      onClose={onCancel}
      onConfirm={onConfirm}
      title={conflict.isNewer ? t.conflictOlderTitle : t.conflictNewerTitle}
      message={
        conflict.isNewer
          ? t.conflictOlderMessage
          : t.conflictNewerMessage
      }
      confirmText={conflict.isNewer ? t.conflictUpdate : t.conflictReplace}
      cancelText={t.conflictOpenExisting}
    />
  );
} 