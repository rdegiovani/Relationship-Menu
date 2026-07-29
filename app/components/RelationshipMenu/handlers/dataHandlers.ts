import { MenuData, RichTextJSONPart } from '../../../types';
import { ToastType } from '../../ui/Toast/ToastContext';
import { Dictionary } from '../../../localization/dictionaries';
import { withResponse, removePersonData } from '../../../utils/responses';

export type DataHandlerProps = {
  editedData: MenuData;
  setEditedData: (data: MenuData) => void;
  onSave: (data: MenuData) => void;
  setActiveIconPicker?: (picker: { catIndex: number; itemIndex: number } | null) => void;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  /** Default names and validation messages in the active language. */
  t: Dictionary['templates'];
};

/**
 * Creates handlers for updating menu data
 */
export function createDataHandlers({
  editedData,
  setEditedData,
  onSave,
  setActiveIconPicker,
  showToast,
  t
}: DataHandlerProps) {
  /**
   * Update a note for a menu item
   */
  const handleNoteChange = (catIndex: number, itemIndex: number, newNote: RichTextJSONPart[] | null) => {
    const updatedData = { ...editedData };
    updatedData.menu[catIndex].items[itemIndex].note = newNote;
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Update an icon for a menu item
   */
  const handleIconChange = (catIndex: number, itemIndex: number, newIcon: string | null) => {
    const updatedData = { ...editedData };
    updatedData.menu[catIndex].items[itemIndex].icon = newIcon;
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
    
    if (setActiveIconPicker) {
      setActiveIconPicker(null); // Close the picker after selection
    }
  };

  /**
   * Update a category name
   */
  const handleCategoryNameChange = (catIndex: number, newName: string) => {
    const updatedData = { ...editedData };
    updatedData.menu[catIndex].name = newName;
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Update a person's name
   */
  const handlePersonNameChange = (personIndex: number, newName: string) => {
    const updatedData = { ...editedData };
    updatedData.people[personIndex] = newName;
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Update a menu item's name
   */
  const handleItemNameChange = (catIndex: number, itemIndex: number, newName: string) => {
    const updatedData = { ...editedData };
    updatedData.menu[catIndex].items[itemIndex].name = newName;
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Add a new person to the menu
   */
  const handleAddPerson = () => {
    const updatedData = { ...editedData };
    updatedData.people.push(t.newPerson);
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Remove a person from the menu
   */
  const handleDeletePerson = (personIndex: number) => {
    // Ensure we maintain at least 1 person
    if (editedData.people.length <= 1) {
      showToast(t.atLeastOnePerson, 'error', 4000);
      return;
    }
    // Remap individual answers and the finished list before dropping the person,
    // so answers never end up attributed to the wrong name.
    const updatedData = removePersonData(editedData, personIndex);
    updatedData.people = [...updatedData.people];
    updatedData.people.splice(personIndex, 1);
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Record one person's individual answer to an item (null clears it)
   */
  const handleResponseChange = (catIndex: number, itemIndex: number, personIndex: number, newIcon: string | null) => {
    const updatedData = { ...editedData };
    updatedData.menu = editedData.menu.map((category, ci) =>
      ci !== catIndex ? category : {
        ...category,
        items: category.items.map((item, ii) =>
          ii !== itemIndex ? item : withResponse(item, personIndex, newIcon)
        )
      }
    );
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Toggle a person's "I'm done" state (blind mode)
   */
  const handleToggleFinished = (personIndex: number) => {
    const updatedData = { ...editedData };
    const finished = new Set(editedData.finished_people ?? []);
    if (finished.has(personIndex)) {
      finished.delete(personIndex);
    } else {
      finished.add(personIndex);
    }
    updatedData.finished_people = finished.size > 0 ? Array.from(finished).sort((a, b) => a - b) : undefined;
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Toggle the individual-answers / blind-mode settings of the menu
   */
  const handleFeatureSettingsChange = (settings: { individual_responses?: boolean; blind_mode?: boolean }) => {
    const updatedData = { ...editedData, ...settings };
    // Turning the feature off also turns blind mode off — a hidden leftover flag
    // would silently gate the comparison if the feature is re-enabled later.
    if (settings.individual_responses === false) {
      updatedData.blind_mode = false;
    }
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  return {
    handleNoteChange,
    handleIconChange,
    handleCategoryNameChange,
    handlePersonNameChange,
    handleItemNameChange,
    handleAddPerson,
    handleDeletePerson,
    handleResponseChange,
    handleToggleFinished,
    handleFeatureSettingsChange
  };
}