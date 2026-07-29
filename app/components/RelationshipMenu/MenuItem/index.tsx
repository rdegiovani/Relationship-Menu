import React from 'react';
import { MenuItem as MenuItemType, MenuMode, RichTextJSONPart } from '../../../types';
import { ViewMenuItem } from './ViewMenuItem';
import { EditMenuItem } from './EditMenuItem';
import { FillMenuItem } from './FillMenuItem';
import { getItemClassName } from './utils';

interface MenuItemProps {
  catIndex: number;
  itemIndex: number;
  item: MenuItemType;
  mode: MenuMode;
  isEditing?: boolean;
  onIconChange: (catIndex: number, itemIndex: number, newIcon: string | null) => void;
  onItemNameChange: (catIndex: number, itemIndex: number, newName: string) => void;
  onNoteChange: (catIndex: number, itemIndex: number, newNote: RichTextJSONPart[] | null) => void;
  onDeleteItem: (catIndex: number, itemIndex: number) => void;
  onMoveItemUp?: (catIndex: number, itemIndex: number) => void;
  onMoveItemDown?: (catIndex: number, itemIndex: number) => void;
  autoResizeTextarea: (element: HTMLTextAreaElement) => void;
  itemCount?: number;
  /** Individual answers (site fork) — see FillMenuItem. */
  activePerson?: number | null;
  individualMode?: boolean;
  personLocked?: boolean;
  onResponseChange?: (catIndex: number, itemIndex: number, personIndex: number, newIcon: string | null) => void;
  onResponseNoteChange?: (catIndex: number, itemIndex: number, personIndex: number, newNote: RichTextJSONPart[] | null) => void;
  /** View lens (site fork, view mode) — see ViewMenuItem. */
  people?: string[];
  showAllResponses?: boolean;
  viewPerson?: number | null;
}

export function MenuItem({
  item,
  catIndex,
  itemIndex,
  mode,
  onIconChange,
  onItemNameChange,
  onNoteChange,
  onDeleteItem,
  onMoveItemUp,
  onMoveItemDown,
  autoResizeTextarea,
  itemCount,
  activePerson = null,
  individualMode = false,
  personLocked = false,
  onResponseChange,
  onResponseNoteChange,
  people = [],
  showAllResponses = false,
  viewPerson = null
}: MenuItemProps) {
  // Individual answers: in fill mode the row is tinted by the active person's
  // answer instead of the shared icon, so feedback follows what is being edited.
  // In view mode with a person lens, it follows that person's answer.
  const displayIcon = individualMode && mode === 'fill'
    ? (activePerson !== null ? (item.responses?.[String(activePerson)] ?? null) : null)
    : mode === 'view' && viewPerson !== null
      ? (item.responses?.[String(viewPerson)] ?? null)
      : item.icon;
  // Common styling classes for all menu item types
  const commonClasses = `py-3 px-[25px] sm:py-3 sm:px-[25px] md:py-4 md:px-[30px] max-sm:py-[15px] max-sm:px-[15px] border-b border-gray-200/60 dark:border-gray-700/40 last:border-0 ${getItemClassName(displayIcon)}`;
  
  // Render the appropriate component based on mode
  if (mode === 'view') {
    return (
      <div className={commonClasses} role="listitem">
        <ViewMenuItem
          item={item}
          people={people}
          showAllResponses={showAllResponses}
          viewPerson={viewPerson}
        />
      </div>
    );
  } else if (mode === 'edit') {
    return (
      <div className={commonClasses}>
        <EditMenuItem
          catIndex={catIndex}
          itemIndex={itemIndex}
          item={item}
          onIconChange={onIconChange}
          onItemNameChange={onItemNameChange}
          onNoteChange={onNoteChange}
          onDeleteItem={onDeleteItem}
          onMoveItemUp={onMoveItemUp}
          onMoveItemDown={onMoveItemDown}
          autoResizeTextarea={autoResizeTextarea}
          itemCount={itemCount}
        />
      </div>
    );
  } else {
    // Fill mode
    return (
      <div className={commonClasses}>
        <FillMenuItem
          catIndex={catIndex}
          itemIndex={itemIndex}
          item={item}
          onIconChange={onIconChange}
          onNoteChange={onNoteChange}
          autoResizeTextarea={autoResizeTextarea}
          activePerson={activePerson}
          individualMode={individualMode}
          personLocked={personLocked}
          onResponseChange={onResponseChange}
          onResponseNoteChange={onResponseNoteChange}
        />
      </div>
    );
  }
}

// Re-export the getItemClassName function
export { getItemClassName, getItemSpanClasses } from './utils'; 