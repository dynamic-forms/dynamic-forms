import { NgModule } from '@angular/core';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../dynamic-form-action/dynamic-form-action.module';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormValidationModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormField } from './dynamic-form-field';

export function dynamicFormFieldResetFactory(field: DynamicFormField): void {
  field.reset();
}

export const dynamicFormFieldResetHandler: DynamicFormActionHandler = {
  type: 'reset',
  func: dynamicFormFieldResetFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormFieldResetDefaultFactory(field: DynamicFormField): void {
  field.resetDefault();
}

export const dynamicFormFieldResetDefaultHandler: DynamicFormActionHandler = {
  type: 'resetDefault',
  func: dynamicFormFieldResetDefaultFactory,
  libraryName: dynamicFormLibrary.name
};

export function dynamicFormFieldValidateFactory(field: DynamicFormField): void {
  field.validate();
}

export const dynamicFormFieldValidateHandler: DynamicFormActionHandler = {
  type: 'validate',
  func: dynamicFormFieldValidateFactory,
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    DynamicFormValidationModule,
    DynamicFormActionModule.withHandler(dynamicFormFieldResetHandler),
    DynamicFormActionModule.withHandler(dynamicFormFieldResetDefaultHandler),
    DynamicFormActionModule.withHandler(dynamicFormFieldValidateHandler)
  ],
  exports: [
    DynamicFormValidationModule,
    DynamicFormActionModule
  ]
})
export class DynamicFormFieldModule {}
