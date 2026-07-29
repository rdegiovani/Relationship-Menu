import { MenuData } from '../../../types';
import { Dictionary } from '../../../localization/dictionaries';

export type ItemHandlerProps = {
  editedData: MenuData;
  setEditedData: (data: MenuData) => void;
  onSave: (data: MenuData) => void;
  menu: MenuData['menu'];
  /** Default names and confirm prompts in the active language. */
  t: Dictionary['templates'];
};

/**
 * Creates handlers for managing menu items and sections
 */
export function createItemHandlers({
  editedData,
  setEditedData,
  onSave,
  menu,
  t
}: ItemHandlerProps) {
  /**
   * Delete a menu item
   */
  const handleDeleteItem = (catIndex: number, itemIndex: number) => {
    if (window.confirm(t.confirmDeleteItem)) {
      const updatedData = { ...editedData };
      updatedData.menu[catIndex].items.splice(itemIndex, 1);
      updatedData.last_update = new Date().toISOString();
      setEditedData(updatedData);
      onSave(updatedData);
    }
  };

  /**
   * Add a new menu item to a category
   */
  const handleAddItem = (catIndex: number) => {
    const updatedData = { ...editedData };
    updatedData.menu[catIndex].items.push({
      name: t.newItem,
      icon: null,
      note: null
    });
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Add a new section to the menu
   */
  const handleAddSection = () => {
    const updatedData = { ...editedData };
    updatedData.menu.push({
      name: t.newSection,
      items: []
    });
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Delete a section from the menu
   */
  const handleDeleteSection = (catIndex: number) => {
    if (window.confirm(t.confirmDeleteSection)) {
      const updatedData = { ...editedData };
      updatedData.menu.splice(catIndex, 1);
      updatedData.last_update = new Date().toISOString();
      setEditedData(updatedData);
      onSave(updatedData);
    }
  };

  /**
   * Move a section up in the menu
   */
  const handleMoveSectionUp = (catIndex: number) => {
    if (catIndex === 0) return; // Already at the top
    
    const updatedData = { ...editedData };
    const temp = updatedData.menu[catIndex];
    updatedData.menu[catIndex] = updatedData.menu[catIndex - 1];
    updatedData.menu[catIndex - 1] = temp;
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Move a section down in the menu
   */
  const handleMoveSectionDown = (catIndex: number) => {
    if (catIndex === menu.length - 1) return; // Already at the bottom
    
    const updatedData = { ...editedData };
    const temp = updatedData.menu[catIndex];
    updatedData.menu[catIndex] = updatedData.menu[catIndex + 1];
    updatedData.menu[catIndex + 1] = temp;
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Move an item up within its category
   */
  const handleMoveItemUp = (catIndex: number, itemIndex: number) => {
    if (itemIndex === 0) return; // Already at the top
    
    const updatedData = { ...editedData };
    const temp = updatedData.menu[catIndex].items[itemIndex];
    updatedData.menu[catIndex].items[itemIndex] = updatedData.menu[catIndex].items[itemIndex - 1];
    updatedData.menu[catIndex].items[itemIndex - 1] = temp;
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  /**
   * Move an item down within its category
   */
  const handleMoveItemDown = (catIndex: number, itemIndex: number) => {
    if (itemIndex === menu[catIndex].items.length - 1) return; // Already at the bottom
    
    const updatedData = { ...editedData };
    const temp = updatedData.menu[catIndex].items[itemIndex];
    updatedData.menu[catIndex].items[itemIndex] = updatedData.menu[catIndex].items[itemIndex + 1];
    updatedData.menu[catIndex].items[itemIndex + 1] = temp;
    updatedData.last_update = new Date().toISOString();
    setEditedData(updatedData);
    onSave(updatedData);
  };

  return {
    handleDeleteItem,
    handleAddItem,
    handleAddSection,
    handleDeleteSection,
    handleMoveSectionUp,
    handleMoveSectionDown,
    handleMoveItemUp,
    handleMoveItemDown
  };
} 