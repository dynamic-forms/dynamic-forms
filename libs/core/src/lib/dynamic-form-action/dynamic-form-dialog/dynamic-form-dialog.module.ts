import { NgModule } from '@angular/core';
import { DynamicFormActionHandler } from '../../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../../dynamic-form-action/dynamic-form-action.module';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormDialog } from './dynamic-form-dialog';

export function dynamicFormDialogOpen(dialog: DynamicFormDialog): void {
  dialog.open();
}

export const dynamicFormDialogOpenHandler: DynamicFormActionHandler<DynamicFormDialog> = {
  type: 'openDialog',
  func: dynamicFormDialogOpen,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormDialogClose(dialog: DynamicFormDialog): void {
  dialog.close();
}

export const dynamicFormDialogCloseHandler: DynamicFormActionHandler<DynamicFormDialog> = {
  type: 'closeDialog',
  func: dynamicFormDialogClose,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormDialogToggle(dialog: DynamicFormDialog): void {
  dialog.toggle();
}

export const dynamicFormDialogToggleHandler: DynamicFormActionHandler<DynamicFormDialog> = {
  type: 'toggleDialog',
  func: dynamicFormDialogToggle,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    DynamicFormActionModule.withHandlers([
      dynamicFormDialogOpenHandler,
      dynamicFormDialogCloseHandler,
      dynamicFormDialogToggleHandler
    ])
  ]
})
export class DynamicFormDialogModule {}
