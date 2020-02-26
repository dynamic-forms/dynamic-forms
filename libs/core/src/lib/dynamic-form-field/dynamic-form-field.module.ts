import { NgModule } from '@angular/core';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormField } from './dynamic-form-field';

export function dynamicFormFieldResetFactory(field: DynamicFormField) {
  field.reset();
}

export const dynamicFormFieldResetHandler: DynamicFormActionHandler = {
  type: 'reset',
  func: dynamicFormFieldResetFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormFieldResetDefaultFactory(field: DynamicFormField) {
  field.resetDefault();
}

export const dynamicFormFieldResetDefaultHandler: DynamicFormActionHandler = {
  type: 'resetDefault',
  func: dynamicFormFieldResetDefaultFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormFieldValidateFactory(field: DynamicFormField) {
  field.validate();
}

export const dynamicFormFieldValidateHandler: DynamicFormActionHandler = {
  type: 'validate',
  func: dynamicFormFieldValidateFactory,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withActionHandler(dynamicFormFieldResetHandler),
    DynamicFormConfigModule.withActionHandler(dynamicFormFieldResetDefaultHandler),
    DynamicFormConfigModule.withActionHandler(dynamicFormFieldValidateHandler)
  ]
})
export class DynamicFormFieldModule {}
