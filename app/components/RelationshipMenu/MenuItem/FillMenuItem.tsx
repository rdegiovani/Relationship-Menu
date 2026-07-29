'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MenuItem, RichTextJSONPart } from '../../../types';
import { IconPicker, renderIcon, ICON_OPTIONS } from '../../ui/IconPicker';
import { useTranslations } from '../../LanguageProvider';
import { IconChevron } from '../../icons';
import { getItemSpanClasses } from './utils';
import { renderRichText, isRichTextEmpty } from '../../../utils/richTextUtils';
import { RichTextEditor } from '../../ui/RichTextEditor';

interface FillMenuItemProps {
  catIndex: number;
  itemIndex: number;
  item: MenuItem;
  onIconChange: (catIndex: number, itemIndex: number, newIcon: string | null) => void;
  onNoteChange: (catIndex: number, itemIndex: number, newNote: RichTextJSONPart[] | null) => void;
  autoResizeTextarea: (element: HTMLTextAreaElement) => void;
  /** Individual answers (site fork): when set, the icon shown/edited is this person's answer. */
  activePerson?: number | null;
  individualMode?: boolean;
  /** True when the active person marked themselves done (blind mode) — answers become read-only. */
  personLocked?: boolean;
  onResponseChange?: (catIndex: number, itemIndex: number, personIndex: number, newIcon: string | null) => void;
  onResponseNoteChange?: (catIndex: number, itemIndex: number, personIndex: number, newNote: RichTextJSONPart[] | null) => void;
}

export function FillMenuItem({
  catIndex,
  itemIndex,
  item,
  onIconChange,
  onNoteChange,
  activePerson = null,
  individualMode = false,
  personLocked = false,
  onResponseChange,
  onResponseNoteChange,
}: FillMenuItemProps) {
  const dictionary = useTranslations();
  const t = dictionary.levels;
  const editor = dictionary.editor;
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerWrapperRef = useRef<HTMLDivElement>(null);
  const noteEditorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerWrapperRef.current && !pickerWrapperRef.current.contains(event.target as Node)) {
        setIsPickerOpen(false);
      }
    };
    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);

  // Close expanded note editor when clicking outside
  useEffect(() => {
    if (!isNoteExpanded) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (noteEditorRef.current && !noteEditorRef.current.contains(target)) {
        setIsNoteExpanded(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNoteExpanded]);

  // Individual answers: the icon shown/edited is the active person's answer,
  // not the shared one. Without an active person there is nothing to edit yet.
  const iconType = individualMode
    ? (activePerson !== null ? (item.responses?.[String(activePerson)] ?? null) : null)
    : (item.icon === undefined ? null : item.icon);

  const interactionDisabled = individualMode && (activePerson === null || personLocked);

  // Determine if icon is set
  const hasIcon = !!iconType && iconType !== "talk";

  const handleSelectIcon = (icon: string | null) => {
    if (individualMode) {
      if (activePerson !== null && onResponseChange) {
        onResponseChange(catIndex, itemIndex, activePerson, icon);
      }
    } else {
      onIconChange(catIndex, itemIndex, icon);
    }
  };

  // Render icon button for fill mode
  const renderIconButton = () => {
    const selectedOption = ICON_OPTIONS.find(opt => opt.value === iconType) || ICON_OPTIONS[ICON_OPTIONS.length - 1];

    // Don't allow changing icons for "talk" items in fill mode
    // (individual answers are always the person's own — the shared "talk" flag doesn't lock them)
    if (!individualMode && iconType === 'talk') {
      // Render the icon in a button-like container but without arrow and interaction
      return (
        <div 
          className={`hc-field inline-flex items-center justify-between px-1.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md ${
            selectedOption.bgColor
          }`}
          style={{ minWidth: '42px' }}  /* Match width of buttons with arrows */
          aria-label={t.icon}
        >
          {renderIcon(iconType)}
          <div className="w-4"></div> {/* Spacer to compensate for missing arrow */}
        </div>
      );
    }
    
    // Compact version for fill mode - icon only with dropdown arrow
    return (
      <button
        type="button"
        onClick={() => setIsPickerOpen((open) => !open)}
        disabled={interactionDisabled}
        className={`hc-field inline-flex items-center px-1.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md ${
          interactionDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
        } ${
          iconType ? selectedOption.bgColor : 'bg-white dark:bg-gray-800'
        }`}
        aria-label={t.selectIcon}
        aria-disabled={interactionDisabled}
      >
        {renderIcon(iconType)}
        <IconChevron
          direction="down"
          className="h-3.5 w-3.5 ml-0.5"
        />
      </button>
    );
  };

  // Handle expanding the note editor
  const handleExpandNote = () => {
    if (interactionDisabled) return;
    setIsNoteExpanded(true);
  };

  // In individual mode the note editor works on the active person's own written
  // answer; otherwise on the shared item note (upstream behavior).
  const noteValue = individualMode
    ? (activePerson !== null ? (item.response_notes?.[String(activePerson)] ?? null) : null)
    : (item.note ?? null);
  const handleNoteEdit = (richText: RichTextJSONPart[] | null) => {
    if (individualMode) {
      if (activePerson !== null && onResponseNoteChange) {
        onResponseNoteChange(catIndex, itemIndex, activePerson, richText);
      }
    } else {
      onNoteChange(catIndex, itemIndex, richText);
    }
  };

  // Render the note editor for fill mode
  const renderNoteEditor = () => {
    if (isNoteExpanded) {
      // Rich text editor when expanded
      return (
        <div ref={noteEditorRef} className="border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700">
          <RichTextEditor
            value={noteValue}
            onChange={handleNoteEdit}
            className="text-sm"
            autoFocus
          />
        </div>
      );
    } else {
      // Format the note text to preserve line breaks
      const formattedNote = !isRichTextEmpty(noteValue) ?
        renderRichText(noteValue) :
        editor.addNote;

      // Note text that expands when clicked
      return (
        <div
          onClick={handleExpandNote}
          className={`text-gray-800 dark:text-gray-50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 cursor-text text-sm whitespace-pre-line transition-colors duration-200 rounded py-0.5 -my-0.5 ${isRichTextEmpty(noteValue) ? 'text-gray-500 dark:text-gray-400' : ''}`}
          style={{ 
            transform: hasIcon ? 'translateY(-0.3rem)' : 'translateY(-0.7rem)',
            marginBottom: hasIcon ? '-0.3rem' : '-0.7rem', 
            marginLeft: '5.15rem',
            paddingLeft: '0.25rem',
            paddingRight: '0.25rem',
            marginRight: '-0.25rem'
          }}
        >
          {formattedNote}
        </div>
      );
    }
  };

  return (
    <>
      <div className="item-name">
        <div className="relative flex items-start flex-col w-full" ref={pickerWrapperRef}>
          {/* Fill mode layout - icon stays before title */}
          <div className="flex flex-row items-center w-full mb-2 gap-2">
            {renderIconButton()}
            <div className="flex-grow flex items-center pl-3">
              <span className={`font-bold ${getItemSpanClasses(individualMode ? iconType : item.icon)}`}>{item.name}</span>
            </div>
          </div>

          <IconPicker
            selectedIcon={iconType}
            onSelectIcon={(icon) => {
              handleSelectIcon(icon);
              setIsPickerOpen(false);
            }}
            isOpen={isPickerOpen}
            mode="fill"
            onClose={() => setIsPickerOpen(false)}
            parentRef={pickerWrapperRef}
          />
        </div>
      </div>
      <div className="mt-2">
        {renderNoteEditor()}
      </div>
    </>
  );
} 