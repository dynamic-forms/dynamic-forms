import { DynamicFormActionHandler } from '../../dynamic-form-action/dynamic-form-action-handler';
import { withDynamicFormActionHandlers } from '../../dynamic-form-action/dynamic-form-action.module';
import { DynamicFormControl } from '../../dynamic-form-control/dynamic-form-control';
import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormsFeature } from '../../dynamic-forms-feature';
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

export function withDynamicFormTextboxActionHandlers(): DynamicFormsFeature {
  return withDynamicFormActionHandlers(dynamicFormTextboxToggleAsTextTypeHandler);
}
