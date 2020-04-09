import { DynamicFormFieldEvaluatorType } from '../dynamic-form-field/dynamic-form-field-evaluator';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormControl } from './dynamic-form-control';

export interface DynamicFormControlEvaluatorType<Input extends DynamicFormInput = DynamicFormInput>
  extends DynamicFormFieldEvaluatorType<DynamicFormControl<Input>> {}

export function dynamicFormSelectEvaluatorFn(control: DynamicFormControl): void {
  if (!control.template.input.multiple) {
    const valid = (control.template.input.options || []).some(option => {
      if (option.items) {
        return option.items.some(item => item.value === control.model);
      }
      return option.value === control.model;
    });
    if (!valid) {
      control.control.setValue(null);
    }
  }
}

export const dynamicFormSelectEvaluatorType: DynamicFormControlEvaluatorType = {
  type: 'select',
  func: dynamicFormSelectEvaluatorFn,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormControlEvaluatorTypes: DynamicFormControlEvaluatorType[] = [
  dynamicFormSelectEvaluatorType
];
