import { NgModule } from '@angular/core';
import { DynamicFormActionHandler } from '../../dynamic-form-action/dynamic-form-action-handler';
import { DynamicFormActionModule } from '../../dynamic-form-action/dynamic-form-action.module';
import { DynamicFormControl } from '../../dynamic-form-control/dynamic-form-control';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormTextbox } from './dynamic-form-textbox';

export const dynamicFormTextboxToggleAsTextType = (field: DynamicFormControl): void => {
  const input = field.input as DynamicFormTextbox;
  input.inputTypeForced = input.inputTypeForced ? undefined : 'text';
};

export const dynamicFormTextboxToggleAsTextTypeHandler: DynamicFormActionHandler<DynamicFormControl> = {
  type: 'toggleTextboxAsTextType',
  func: dynamicFormTextboxToggleAsTextType,
  libraryName: dynamicFormLibrary.name,
};

@NgModule({
  imports: [DynamicFormActionModule.withHandler(dynamicFormTextboxToggleAsTextTypeHandler)],
  exports: [DynamicFormActionModule],
})
export class DynamicFormTextboxModule {}
