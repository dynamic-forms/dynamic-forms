import { DynamicFormActionHandler } from '../../dynamic-form-action/dynamic-form-action-handler';
import { withDynamicFormActionHandlers } from '../../dynamic-form-action/dynamic-form-action.module';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormsFeature } from '../../dynamic-forms-feature';
import { DynamicFormModal } from './dynamic-form-modal';

export const dynamicFormModalOpen = (modal: DynamicFormModal): void => modal.open();

export const dynamicFormModalOpenHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'openModal',
  func: dynamicFormModalOpen,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormModalClose = (modal: DynamicFormModal): void => modal.close();

export const dynamicFormModalCloseHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'closeModal',
  func: dynamicFormModalClose,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormModalToggle = (modal: DynamicFormModal): void => modal.toggle();

export const dynamicFormModalToggleHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'toggleModal',
  func: dynamicFormModalToggle,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormModalMaximize = (modal: DynamicFormModal): void => modal.maximize();

export const dynamicFormModalMaximizeHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'maximizeModal',
  func: dynamicFormModalMaximize,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormModalMinimize = (modal: DynamicFormModal): void => modal.minimize();

export const dynamicFormModalMinimizeHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'minimizeModal',
  func: dynamicFormModalMinimize,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormModalToggleSize = (modal: DynamicFormModal): void => modal.toggleSize();

export const dynamicFormModalToggleSizeHandler: DynamicFormActionHandler<DynamicFormModal> = {
  type: 'toggleSizeModal',
  func: dynamicFormModalToggleSize,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormModalActionHandlers = [
  dynamicFormModalOpenHandler,
  dynamicFormModalCloseHandler,
  dynamicFormModalToggleHandler,
  dynamicFormModalMaximizeHandler,
  dynamicFormModalMinimizeHandler,
  dynamicFormModalToggleSizeHandler,
];

export function withDynamicFormModalActionHandlers(): DynamicFormsFeature {
  return withDynamicFormActionHandlers(...dynamicFormModalActionHandlers);
}
