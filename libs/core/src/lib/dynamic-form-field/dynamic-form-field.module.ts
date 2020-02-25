import { NgModule } from '@angular/core';
import { DynamicFormActionHandler } from '../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';

export const dynamicFormFieldResetHandler: DynamicFormActionHandler = {
  type: 'reset',
  func: (field, _action) => field.reset(),
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormFieldResetDefaultHandler: DynamicFormActionHandler = {
  type: 'resetDefault',
  func: (field, _action) => field.resetDefault(),
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormFieldValidateHandler: DynamicFormActionHandler = {
  type: 'validate',
  func: (field, _action) => field.validate(),
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
