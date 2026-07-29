'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MenuData, MenuMode } from '../../types';
import { MenuHeader } from './MenuHeader';
import { MenuToolbar } from './MenuToolbar';
import { MenuContent } from './MenuContent';
import { PersonBar } from './PersonBar';
import { CompareView } from './CompareView';
import { ViewLensBar, ViewLens } from './ViewLensBar';
import { FloatingModeSelector } from './MenuToolbar/FloatingModeSelector';
import { useToast } from '../ui/Toast';
import { useLanguage } from '../LanguageProvider';
import { isPersonFinished, everyoneFinished } from '../../utils/responses';
import {
  createDataHandlers,
  createItemHandlers,
  createUIHandlers,
  createExportHandlers
} from './handlers';

interface RelationshipMenuProps {
  menuData: MenuData;
  onSave: (updatedData: MenuData) => void;
  initialMode?: MenuMode;
}

export function RelationshipMenu({ menuData, onSave, initialMode = 'view' }: RelationshipMenuProps) {
  // State for menu operation
  const [mode, setMode] = useState<MenuMode>(initialMode);
  const [editedData, setEditedData] = useState<MenuData>({ ...menuData });
  const [activeIconPicker, setActiveIconPicker] = useState<{catIndex: number, itemIndex: number} | null>(null);
  // Individual answers (site fork): index of the person currently answering
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  // View mode lens: everyone (current) · one person · a saved round
  const [viewLens, setViewLens] = useState<ViewLens>({ type: 'current', person: null });

  // Get the toast utility from context
  const { showToast } = useToast();
  const { language, t: dictionary } = useLanguage();

  // Derived state
  const isEditing = mode === 'edit' || mode === 'fill' || mode === 'compare';
  const currentData = isEditing ? editedData : menuData;
  const { last_update, people, menu } = currentData;
  const individualMode = !!currentData.individual_responses;
  // Clamp instead of resetting state: if the people list shrinks, the stale
  // selection simply stops being active.
  const activePerson = selectedPerson !== null && selectedPerson < people.length ? selectedPerson : null;
  const personLocked = activePerson !== null &&
    !!currentData.blind_mode && isPersonFinished(currentData, activePerson);

  // View lens (site fork): in blind mode nobody browses individual answers
  // before everyone is done — the classic consensus view is shown instead.
  const individualViewAllowed = individualMode &&
    (!currentData.blind_mode || everyoneFinished(currentData));
  const lens: ViewLens = individualViewAllowed ? viewLens : { type: 'current', person: null };
  const lensRound = lens.type === 'round' ? currentData.rounds?.[lens.index] ?? null : null;
  // With a round lens, the menu shown is the snapshot: that round's answers,
  // shared answers and people (positions align — rounds mirror the menu shape).
  const viewMenu = useMemo(() => {
    if (mode !== 'view' || !lensRound) return menu;
    return menu.map((category, catIndex) => ({
      ...category,
      items: category.items.map((item, itemIndex) => {
        const snapshot = lensRound.items[catIndex]?.[itemIndex];
        return snapshot
          ? { ...item, responses: snapshot.responses, response_notes: snapshot.response_notes, icon: snapshot.icon ?? null }
          : item;
      })
    }));
  }, [mode, lensRound, menu]);
  const viewPeople = lensRound ? lensRound.people : people;
  const viewPerson = mode === 'view' && individualViewAllowed && lens.type === 'current' ? lens.person : null;
  const showAllResponses = mode === 'view' && individualViewAllowed &&
    (lens.type === 'round' || (lens.type === 'current' && lens.person === null));

  // Auto-resize textarea utility function
  const autoResizeTextarea = (element: HTMLTextAreaElement) => {
    if (element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  // Create export handlers first
  const {
    handleJSONDownload,
    handleExportPDF
  } = useMemo(() => createExportHandlers({
    menuData,
    editedData,
    isEditing,
    showToast: showToast,
    t: dictionary.share,
    anonymous: dictionary.templates.anonymous,
    pdfStrings: dictionary.pdf,
    locale: language
  }), [menuData, editedData, isEditing, showToast, dictionary, language]);

  // Create UI handlers with the now-available handleExportPDF
  const {
    handleModeChange,
  } = useMemo(() => createUIHandlers({
    menuData,
    setEditedData,
    setMode,
    setActiveIconPicker,
    activeIconPicker,
  }), [menuData, activeIconPicker]);

  // Create data handlers
  const {
    handleNoteChange,
    handleIconChange,
    handleCategoryNameChange,
    handlePersonNameChange,
    handleItemNameChange,
    handleAddPerson,
    handleDeletePerson,
    handleResponseChange,
    handleResponseNoteChange,
    handleToggleFinished,
    handleFeatureSettingsChange,
    handleRegisterRound
  } = useMemo(() => createDataHandlers({
    editedData,
    setEditedData,
    onSave,
    setActiveIconPicker,
    showToast,
    t: dictionary.templates
  }), [editedData, onSave, showToast, dictionary]);

  // Create item handlers
  const {
    handleDeleteItem,
    handleAddItem,
    handleAddSection,
    handleDeleteSection,
    handleMoveSectionUp,
    handleMoveSectionDown,
    handleMoveItemUp,
    handleMoveItemDown
  } = useMemo(() => createItemHandlers({
    editedData,
    setEditedData,
    onSave,
    menu,
    t: dictionary.templates
  }), [editedData, onSave, menu, dictionary]);

  // Effect to resize all textareas when entering edit mode
  useEffect(() => {
    if (isEditing) {
      // Use setTimeout to ensure DOM is fully updated
      setTimeout(() => {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
          autoResizeTextarea(textarea as HTMLTextAreaElement);
        });
      }, 0);
    }
  }, [isEditing]);

  return (
    <div className="pb-16 md:pb-0">
      <div className="bg-[rgba(148,188,194,0.07)] dark:bg-[rgba(79,139,149,0.07)] rounded-xl shadow-sm border border-[rgba(148,188,194,0.2)] dark:border-[rgba(79,139,149,0.2)] p-4 md:p-5 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Menu Header Component */}
          <MenuHeader
            mode={mode}
            people={people}
            lastUpdate={last_update}
            onPersonNameChange={handlePersonNameChange}
            onAddPerson={handleAddPerson}
            onDeletePerson={handleDeletePerson}
            individualResponses={!!currentData.individual_responses}
            blindMode={!!currentData.blind_mode}
            onFeatureSettingsChange={handleFeatureSettingsChange}
          />
          
          {/* Menu Toolbar Component */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <MenuToolbar 
              onJSONDownload={handleJSONDownload}
              onExportPDF={handleExportPDF}
              menuData={menuData}
              showToast={showToast}
            />
          </div>
        </div>
      </div>

      {/* View lens for individual answers (site fork) */}
      {individualViewAllowed && mode === 'view' && (
        <ViewLensBar
          menuData={currentData}
          lens={lens}
          onSelectLens={setViewLens}
        />
      )}

      {/* Person selector for individual answers (site fork) */}
      {individualMode && mode === 'fill' && (
        <PersonBar
          menuData={currentData}
          activePerson={activePerson}
          onSelectPerson={setSelectedPerson}
          onToggleFinished={handleToggleFinished}
        />
      )}

      {/* Menu Content Component (or the comparison, in compare mode) */}
      {mode === 'compare' ? (
        <CompareView
          menuData={currentData}
          onConsensusChange={handleIconChange}
          onRegisterRound={() => {
            handleRegisterRound();
            showToast(dictionary.comparison.roundSaved, 'success');
          }}
        />
      ) : (
        <MenuContent
          menu={mode === 'view' ? viewMenu : menu}
          mode={mode}
          onIconChange={handleIconChange}
          onCategoryNameChange={handleCategoryNameChange}
          onItemNameChange={handleItemNameChange}
          onNoteChange={handleNoteChange}
          onDeleteItem={handleDeleteItem}
          onAddItem={handleAddItem}
          onAddSection={handleAddSection}
          onDeleteSection={handleDeleteSection}
          onMoveSectionUp={handleMoveSectionUp}
          onMoveSectionDown={handleMoveSectionDown}
          onMoveItemUp={handleMoveItemUp}
          onMoveItemDown={handleMoveItemDown}
          autoResizeTextarea={autoResizeTextarea}
          activePerson={activePerson}
          individualMode={individualMode && mode === 'fill'}
          personLocked={personLocked}
          onResponseChange={handleResponseChange}
          onResponseNoteChange={handleResponseNoteChange}
          people={viewPeople}
          showAllResponses={showAllResponses}
          viewPerson={viewPerson}
        />
      )}

      {/* Floating Mode Selector */}
      <FloatingModeSelector
        currentMode={mode}
        onModeChange={handleModeChange}
        showCompare={individualMode}
      />
    </div>
  );
} 