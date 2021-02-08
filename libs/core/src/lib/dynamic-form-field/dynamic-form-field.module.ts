import { NgModule } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../dynamic-form-action/dynamic-form-action.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormValidationModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormField } from './dynamic-form-field';

export function dynamicFormFieldReset(field: DynamicFormField): void {
  field.reset();
}

export const dynamicFormFieldResetHandler: DynamicFormActionHandler = {
  type: 'reset',
  func: dynamicFormFieldReset,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormFieldResetDefault(field: DynamicFormField): void {
  field.resetDefault();
}

export const dynamicFormFieldResetDefaultHandler: DynamicFormActionHandler = {
  type: 'resetDefault',
  func: dynamicFormFieldResetDefault,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormFieldValidate(field: DynamicFormField): void {
  field.validate();
}

export const dynamicFormFieldValidateHandler: DynamicFormActionHandler = {
  type: 'validate',
  func: dynamicFormFieldValidate,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormSubmit(form: DynamicForm, action: DynamicFormAction): void {
  const parent = action.parent as DynamicFormAction;
  if (parent.dialog && parent.dialogOpen) {
    parent.closeDialog();
  }
  form.submit();
}

export function getDynamicForm(action: DynamicFormAction): DynamicForm {
  return action.root;
}

export const dynamicFormSubmitHandler: DynamicFormActionHandler = {
  type: 'submit',
  elementFunc: getDynamicForm,
  func: dynamicFormSubmit,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    DynamicFormValidationModule,
    DynamicFormActionModule.withHandlers([
      dynamicFormFieldResetHandler,
      dynamicFormFieldResetDefaultHandler,
      dynamicFormFieldValidateHandler,
      dynamicFormSubmitHandler
    ])
  ],
  exports: [
    DynamicFormValidationModule,
    DynamicFormActionModule
  ]
})
export class DynamicFormFieldModule {}
