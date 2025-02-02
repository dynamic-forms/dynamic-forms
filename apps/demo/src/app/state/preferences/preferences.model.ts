import { StateToken } from '@ngxs/store';

export enum ThemeMode {
  Light = 'light-mode',
  Dark = 'dark-mode',
}

export type ThemeClass = 'light' | 'dark';

export interface ThemePreferences {
  mode: ThemeMode | null;
  default: ThemeMode | null;
}

export enum FormEditorPreviewMode {
  TabView,
  SplitView,
}

export interface FormEditorPreferences {
  previewMode: FormEditorPreviewMode;
}

export interface Preferences {
  theme: ThemePreferences;
  formEditor: FormEditorPreferences;
}

export const defaultPreferences: Preferences = {
  theme: {
    mode: null,
    default: null,
  },
  formEditor: {
    previewMode: FormEditorPreviewMode.TabView,
  },
};

export const PREFERENCES = new StateToken<Preferences>('dynamicFormsDemoPreferences');
