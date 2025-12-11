import { InjectionToken } from '@angular/core';
import * as monaco from 'monaco-editor';

export type MonacoEditor = monaco.editor.IStandaloneCodeEditor;

export type MonacoEditorLanguage = 'json';

export enum MonacoEditorUpdateType {
  Change = 'change',
  Blur = 'blur',
}

export type MonacoEditorDisposable = monaco.IDisposable;

export type MonacoEditorOptions = monaco.editor.IStandaloneEditorConstructionOptions;

export interface MonacoEditorModule {
  create: (element: HTMLElement, options?: MonacoEditorOptions) => MonacoEditor;
}

export interface MonacoModule {
  editor: MonacoEditorModule;
}

export interface MonacoRef {
  require: any;
  monaco: any;
}

export const MONACO_REF = new InjectionToken<MonacoRef>('MonacoRef');
