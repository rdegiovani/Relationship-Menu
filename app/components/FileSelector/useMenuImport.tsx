import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MenuData } from '../../types';
import { getMenuById, saveMenu, updateMenuList } from '../../utils/menuStorage';
import { ImportConflictModal } from './ImportConflictModal';
import { migrateMenuData } from '../../utils/migrations';
import { useTranslations } from '../LanguageProvider';

interface UseMenuImportOptions {
  onComplete?: (menuId: string) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export function useMenuImport({ onComplete, isModal, onClose }: UseMenuImportOptions = {}) {
  const [importConflict, setImportConflict] = useState<{
    exists: boolean;
    isNewer: boolean;
    data: MenuData;
    id: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations().files;

  // Initial import, detects conflicts
  const importMenu = useCallback((importedData: MenuData) => {
    setError(null);
    // Migrate first to ensure compatibility and to catch newer schema errors
    let data: MenuData;
    try {
      data = migrateMenuData(importedData);
    } catch (e) {
      const err = e as Error;
      setError(err.message || t.importFailed);
      return false;
    }
    // Ensure we have a UUID
    if (!data.uuid) {
      data.uuid = uuidv4();
    }
    const menuId = data.uuid;

    // Prevent importing example menu
    if (typeof menuId === 'string' && menuId.toLowerCase() === 'example') {
      if (isModal && onClose) onClose();
      onComplete?.('example');
      return false;
    }

    // Check if this menu already exists
    const existingMenu = getMenuById(menuId);
    if (existingMenu) {
      const existingDate = new Date(existingMenu.last_update).getTime();
      const importedDate = new Date(data.last_update).getTime();
      if (existingDate === importedDate) {
        if (isModal && onClose) onClose();
        onComplete?.(menuId);
        return false;
      }
      const isNewer = importedDate > existingDate;
      setImportConflict({ exists: true, isNewer, data, id: menuId });
      return true;
    } else {
      saveMenu(data);
      updateMenuList(data);
      if (isModal && onClose) onClose();
      onComplete?.(menuId);
      return false;
    }
  }, [isModal, onClose, onComplete, t]);

  // Force import, always overwrites
  const forceImportMenu = useCallback((data: MenuData) => {
    // Migrate first to ensure compatibility and to catch newer schema errors
    let migrated: MenuData;
    try {
      migrated = migrateMenuData(data);
    } catch (e) {
      const err = e as Error;
      setError(err.message || t.importFailed);
      return;
    }
    // Always ensure uuid
    const menuId = migrated.uuid || uuidv4();
    const menuData = { ...migrated, uuid: menuId };
    saveMenu(menuData);
    updateMenuList(menuData);
    if (isModal && onClose) onClose();
    onComplete?.(menuId);
    setImportConflict(null);
  }, [isModal, onClose, onComplete, t]);

  // Cancel import (open existing menu, clear conflict)
  const cancelImport = useCallback(() => {
    if (importConflict) {
      if (isModal && onClose) onClose();
      onComplete?.(importConflict.id);
      setImportConflict(null);
    }
  }, [importConflict, isModal, onClose, onComplete]);

  // Modal component to render
  const ImportConflictModalElement = importConflict ? (
    <ImportConflictModal
      conflict={importConflict}
      onConfirm={() => forceImportMenu(importConflict.data)}
      onCancel={cancelImport}
    />
  ) : null;

  return {
    importMenu,
    forceImportMenu,
    importConflict,
    error,
    setError,
    ImportConflictModal: ImportConflictModalElement,
    cancelImport,
    setImportConflict, // for advanced use
  };
} 