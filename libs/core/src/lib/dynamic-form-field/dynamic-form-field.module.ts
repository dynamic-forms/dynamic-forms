import { NgModule } from '@angular/core';
import { DynamicFormActionHandlerType } from '../dynamic-form-action/dynamic-form-action-handler-type';
import { DynamicFormConfigModule } from '../dynamic-form-config/dynamic-form-config.module';
import { dynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';

export const dynamicFormResetActionType: DynamicFormActionHandlerType = {
  type: 'reset',
  handler: (field, _action) => field.reset(),
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormResetDefaultActionType: DynamicFormActionHandlerType = {
  type: 'resetDefault',
  handler: (field, _action) => field.reset(),
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormValidateActionType: DynamicFormActionHandlerType = {
  type: 'validate',
  handler: (field, _action) => field.validate(),
  libraryName: dynamicFormLibrary.name
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withActionHandler(dynamicFormResetActionType),
    DynamicFormConfigModule.withActionHandler(dynamicFormResetDefaultActionType),
    DynamicFormConfigModule.withActionHandler(dynamicFormValidateActionType)
  ]
})
export class DynamicFormFieldModule {}
