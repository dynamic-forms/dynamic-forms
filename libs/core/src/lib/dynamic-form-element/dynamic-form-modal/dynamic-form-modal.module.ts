import { NgModule } from '@angular/core';
import { DynamicFormActionHandler } from '../../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../../dynamic-form-action/dynamic-form-action.module';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormModal } from './dynamic-form-modal';

export const dynamicFormModalOpen = (modal: DynamicFormModal): void => modal.open();

export const dynamicFormModalOpenHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'openModal',
  func: dynamicFormModalOpen,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormModalClose = (modal: DynamicFormModal): void => modal.close();

export const dynamicFormModalCloseHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'closeModal',
  func: dynamicFormModalClose,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormModalToggle = (modal: DynamicFormModal): void => modal.toggle();

export const dynamicFormModalToggleHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'toggleModal',
  func: dynamicFormModalToggle,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormModalMaximize = (modal: DynamicFormModal): void => modal.maximize();

export const dynamicFormModalMaximizeHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'maximizeModal',
  func: dynamicFormModalMaximize,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormModalMinimize = (modal: DynamicFormModal): void => modal.minimize();

export const dynamicFormModalMinimizeHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'minimizeModal',
  func: dynamicFormModalMinimize,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormModalToggleSize = (modal: DynamicFormModal): void => modal.toggleSize();

export const dynamicFormModalToggleSizeHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'toggleSizeModal',
  func: dynamicFormModalToggleSize,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    DynamicFormActionModule.withHandlers([
      dynamicFormModalOpenHandler,
      dynamicFormModalCloseHandler,
      dynamicFormModalToggleHandler,
      dynamicFormModalMaximizeHandler,
      dynamicFormModalMinimizeHandler,
      dynamicFormModalToggleSizeHandler,
    ])
  ]
})
export class DynamicFormModalModule {}
