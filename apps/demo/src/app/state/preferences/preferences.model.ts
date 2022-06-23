import { StateToken } from '@ngxs/store';

export enum FormEditorPreviewMode {
  TabView,
  SplitView
}

export interface FormEditorPreferences {
  previewMode: FormEditorPreviewMode;
}

export interface Preferences {
  formEditor: FormEditorPreferences;
}

export const defaultPreferences: Preferences = {
  formEditor: {
    previewMode: FormEditorPreviewMode.TabView,
  },
};

export const PREFERENCES = new StateToken<Preferences>('dynamicFormsDemoPreferences');

