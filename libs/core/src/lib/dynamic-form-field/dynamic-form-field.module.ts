import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { withDynamicFormActionHandlers } from '../dynamic-form-action/dynamic-form-action.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { DynamicFormField } from './dynamic-form-field';

export const dynamicFormFieldClear = (field: DynamicFormField): void => field.clear();

export const dynamicFormFieldClearHandler: DynamicFormActionHandler = {
  type: 'clear',
  func: dynamicFormFieldClear,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormFieldReset = (field: DynamicFormField): void => field.reset();

export const dynamicFormFieldResetHandler: DynamicFormActionHandler = {
  type: 'reset',
  func: dynamicFormFieldReset,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormFieldResetEmpty = (field: DynamicFormField): void => field.resetEmpty();

export const dynamicFormFieldResetEmptyHandler: DynamicFormActionHandler = {
  type: 'resetEmpty',
  func: dynamicFormFieldResetEmpty,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormFieldResetDefault = (field: DynamicFormField): void => field.resetDefault();

export const dynamicFormFieldResetDefaultHandler: DynamicFormActionHandler = {
  type: 'resetDefault',
  func: dynamicFormFieldResetDefault,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormFieldValidate = (field: DynamicFormField): void => field.validate();

export const dynamicFormFieldValidateHandler: DynamicFormActionHandler = {
  type: 'validate',
  func: dynamicFormFieldValidate,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormSubmit = (form: DynamicForm, action: DynamicFormAction): void => {
  const parent = action.parent as DynamicFormAction;
  if (parent.dialog && parent.dialogOpen) {
    parent.closeDialog();
  }
  form.submit();
};

export const getDynamicForm = (action: DynamicFormAction): DynamicForm => action.root;

export const dynamicFormSubmitHandler: DynamicFormActionHandler = {
  type: 'submit',
  elementFunc: getDynamicForm,
  func: dynamicFormSubmit,
  libraryName: dynamicFormLibrary.name,
};

export const dynamicFormFieldActionHandlerDefaults = [
  dynamicFormFieldClearHandler,
  dynamicFormFieldResetHandler,
  dynamicFormFieldResetEmptyHandler,
  dynamicFormFieldResetDefaultHandler,
  dynamicFormFieldValidateHandler,
  dynamicFormSubmitHandler,
];

export function withDynamicFormFieldDefaultFeatures(): DynamicFormsFeature[] {
  return [withDynamicFormActionHandlers(...dynamicFormFieldActionHandlerDefaults)];
}
