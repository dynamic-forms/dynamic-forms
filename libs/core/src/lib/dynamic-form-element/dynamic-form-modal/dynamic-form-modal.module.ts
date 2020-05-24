import { NgModule } from '@angular/core';
import { DynamicFormActionHandler } from '../../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../../dynamic-form-action/dynamic-form-action.module';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormModal } from './dynamic-form-modal';

export function dynamicFormModalOpenFactory(modal: DynamicFormModal): void {
  modal.open();
}

export const dynamicFormModalOpenHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'openModal',
  func: dynamicFormModalOpenFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormModalCloseFactory(modal: DynamicFormModal): void {
  modal.close();
}

export const dynamicFormModalCloseHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'closeModal',
  func: dynamicFormModalCloseFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormModalToggleFactory(modal: DynamicFormModal): void {
  modal.toggle();
}

export const dynamicFormModalToggleHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'toggleModal',
  func: dynamicFormModalToggleFactory,
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
