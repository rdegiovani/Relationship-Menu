'use client';

import { ConfirmModal } from '../ui/ConfirmModal';
import { useTranslations } from '../LanguageProvider';

interface DeleteMenuModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteMenuModal({ isOpen, onConfirm, onCancel }: DeleteMenuModalProps) {
  const t = useTranslations();

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onCancel}
      onConfirm={onConfirm}
      title={t.files.deleteTitle}
      message={t.files.deleteMessage}
      confirmText={t.common.delete}
      cancelText={t.common.cancel}
    />
  );
} 