import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { dynamicFormLibrary, DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormAction } from './dynamic-form-action';

export type DynamicFormActionFunc<Element extends DynamicFormElement = DynamicFormElement> =
  (element: Element, action?: DynamicFormAction) => void;

export interface DynamicFormActionHandler<Element extends DynamicFormElement = DynamicFormElement> {
  type: string;
  elementFunc?: (action: DynamicFormAction) => Element;
  func: DynamicFormActionFunc<Element>;
  libraryName: DynamicFormLibraryName;
}

export function dynamicFormDialogOpen(action: DynamicFormAction): void {
  action.openDialog();
}

export const dynamicFormDialogOpenHandler: DynamicFormActionHandler<DynamicFormAction> = {
  type: 'openDialog',
  func: dynamicFormDialogOpen,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormDialogClose(action: DynamicFormAction): void {
  action.closeDialog();
}

export const dynamicFormDialogCloseHandler: DynamicFormActionHandler<DynamicFormAction> = {
  type: 'closeDialog',
  func: dynamicFormDialogClose,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormDialogToggle(action: DynamicFormAction): void {
  action.toggleDialog();
}

export const dynamicFormDialogToggleHandler: DynamicFormActionHandler<DynamicFormAction> = {
  type: 'toggleDialog',
  func: dynamicFormDialogToggle,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormDialogHandlers: DynamicFormActionHandler<DynamicFormAction>[] = [
  dynamicFormDialogOpenHandler,
  dynamicFormDialogCloseHandler,
  dynamicFormDialogToggleHandler
];
