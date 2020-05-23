import { NgModule } from '@angular/core';
import { DynamicFormActionHandler } from '../../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../../dynamic-form-action/dynamic-form-action.module';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormModalElement } from './dynamic-form-modal-element';

export function dynamicFormModalOpenFactory(element: DynamicFormModalElement): void {
  element.open();
}

export const dynamicFormModalOpenHandler: DynamicFormActionHandler<DynamicFormModalElement> = {
  type: 'openModal',
  func: dynamicFormModalOpenFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormModalCloseFactory(element: DynamicFormModalElement): void {
  element.close();
}

export const dynamicFormModalCloseHandler: DynamicFormActionHandler<DynamicFormModalElement> = {
  type: 'closeModal',
  func: dynamicFormModalCloseFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormModalToggleFactory(element: DynamicFormModalElement): void {
  element.toggle();
}

export const dynamicFormModalToggleHandler: DynamicFormActionHandler<DynamicFormModalElement> = {
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
