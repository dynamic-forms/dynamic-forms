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

export const PREFERENCES = new StateToken<Preferences>('dynamicFormsDemoPreferences');
