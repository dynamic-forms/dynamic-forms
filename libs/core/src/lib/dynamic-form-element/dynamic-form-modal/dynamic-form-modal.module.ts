import { NgModule } from '@angular/core';
import { DynamicFormActionHandler } from '../../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../../dynamic-form-action/dynamic-form-action.module';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormModal } from './dynamic-form-modal';

export function dynamicFormModalOpen(modal: DynamicFormModal): void {
  modal.open();
}

export const dynamicFormModalOpenHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'openModal',
  func: dynamicFormModalOpen,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormModalClose(modal: DynamicFormModal): void {
  modal.close();
}

export const dynamicFormModalCloseHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'closeModal',
  func: dynamicFormModalClose,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormModalToggle(modal: DynamicFormModal): void {
  modal.toggle();
}

export const dynamicFormModalToggleHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'toggleModal',
  func: dynamicFormModalToggle,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    DynamicFormActionModule.withHandlers([
      dynamicFormModalOpenHandler,
      dynamicFormModalCloseHandler,
      dynamicFormModalToggleHandler
    ])
  ]
})
export class DynamicFormModalModule {}
