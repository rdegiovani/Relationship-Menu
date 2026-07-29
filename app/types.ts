// Rich text representation part (single run)
export type RichTextJSONPart = {
  text: string;
  bold?: boolean | null;
  italic?: boolean | null;
  underline?: boolean | null;
  strikethrough?: boolean | null;
  color?: string | null; // Hex color, e.g. "#RRGGBB"
};

// Define menu item type
export type MenuItem = {
  name: string;
  note?: RichTextJSONPart[] | null;
  icon?: string | null;
  // Site fork (individual answers): one answer per person, keyed by the person's
  // index in MenuData.people (as a string, since JSON object keys are strings).
  // Absent key = that person has not answered this item yet.
  responses?: { [personIndex: string]: string };
  // Site fork: each person's own written answer (used mostly on "conversation"
  // items, where the level is always "talk" and the text carries the substance).
  response_notes?: { [personIndex: string]: RichTextJSONPart[] };
};

// Define menu category type
export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

// Define main menu data type
export type MenuData = {
  schema_version: string;
  last_update: string;
  people: string[];
  menu: MenuCategory[];
  uuid: string; // Required UUID field (version 1.1+)
  language: string; // Required language for v1.2+
  template_uuid?: string | null; // Optional: UUID of template used to create the menu (v1.2+)
  // Site fork (individual answers). All optional and additive so menus created
  // upstream keep working unchanged and exported files stay compatible.
  individual_responses?: boolean; // Feature toggle: each person answers on their own
  blind_mode?: boolean; // Answers stay hidden until everyone marks themselves done
  finished_people?: number[]; // Person indexes that marked themselves done (blind mode)
  rounds?: MenuRound[]; // Saved snapshots of answers over time (site fork, v2)
};

// One saved "round": a positional snapshot of everyone's answers and the shared
// answers at a moment in time. Mirrors the menu shape: items[catIndex][itemIndex].
export type MenuRoundItem = {
  responses?: { [personIndex: string]: string };
  response_notes?: { [personIndex: string]: RichTextJSONPart[] };
  icon?: string | null;
};

export type MenuRound = {
  date: string; // ISO timestamp of when the round was saved
  people: string[]; // People names at the time (for labels in history)
  items: MenuRoundItem[][];
};

// Define available menu modes
export type MenuMode = 'view' | 'fill' | 'edit' | 'compare';

// Legacy schema types for migrations
export type LegacyMenuItem_1_2 = {
  name: string;
  note?: string | null;
  icon?: string | null;
};

export type LegacyMenuCategory_1_2 = {
  name: string;
  items: LegacyMenuItem_1_2[];
};

export type MenuData_1_2 = {
  schema_version: '1.2';
  last_update: string;
  people: string[];
  menu: LegacyMenuCategory_1_2[];
  uuid?: string; // may be missing or lowercase in 1.2
  language?: string; // optional in 1.2
  template_uuid?: string | null;
};

// Accessibility theme preferences
export type ColorMode = 'system' | 'light' | 'dark';
export type VisionTheme = 'default' | 'pd' | 'tritan'; // pd = protanopia/deuteranopia
export type ContrastLevel = 'normal' | 'high';

export type ThemePreferences = {
  colorMode: ColorMode;
  vision: VisionTheme;
  contrast: ContrastLevel;
  // When false/absent, contrast follows the system prefers-contrast setting.
  contrastExplicit?: boolean;
};