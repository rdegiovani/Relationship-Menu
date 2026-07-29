export type TemplateIcon = {
  type: string;
  path: string;
};

export type TemplateLocalizedText = Record<string, string>;

export type TemplateItemJSON = {
  title?: TemplateLocalizedText;
  icon_name?: string | null;
};

export type TemplateCategoryJSON = {
  title?: TemplateLocalizedText;
  items?: TemplateItemJSON[];
};

export type TemplateJSON = {
  uuid?: string;
  sorting_order?: number;
  languages?: string[];
  title?: TemplateLocalizedText;
  description?: TemplateLocalizedText;
  icon_svg?: string;
  icon_sf_symbol?: string;
  colors?: string[];
  categories?: TemplateCategoryJSON[];
};

export type TemplateItem = {
  id: string;
  name: TemplateLocalizedText; // localized names (e.g., { en: "...", de: "..." })
  description: TemplateLocalizedText; // localized descriptions
  path: string;
  icon?: TemplateIcon;
  stats?: {
    sections: number;
    items: number;
  };
  languages?: string[];
  sorting_order?: number;
};

export type MenuFeatureOptions = {
  individualResponses: boolean;
  blindMode: boolean;
};

export type TemplateSetupFormProps = {
  selectedTemplate: TemplateItem;
  onSubmit: (templatePath: string, people: string[], language?: string, features?: MenuFeatureOptions) => void;
  onCancel: () => void;
};

export interface TemplateSelectorProps {
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  className?: string;
  isModal?: boolean;
  onMenuPageWithNoMenu?: boolean;
} 