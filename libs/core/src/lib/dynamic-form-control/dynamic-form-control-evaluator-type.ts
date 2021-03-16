import { DynamicFormFieldEvaluatorType } from '../dynamic-form-field/dynamic-form-field-evaluator-type';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { dynamicFormLibrary } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormControl } from './dynamic-form-control';

export interface DynamicFormControlEvaluatorType<
  Input extends DynamicFormInput = DynamicFormInput
> extends DynamicFormFieldEvaluatorType<DynamicFormControl<Input>> {
  inputType?: string;
}

export function dynamicFormSelectEvaluatorFn(control: DynamicFormControl): void {
  if (!control.model) {
    return;
  }
  const options = control.template.input.options || [];
  const multiple = control.template.input.multiple;
  const someOption = (value) => {
    return options.some(option => {
      return !option.disabled
        ? option.items
          ? option.items.filter(i => !i.disabled).some(i => i.value === value)
          : option.value === value
        : false;
    });
  };
  if (control.model instanceof Array) {
    const validOptions = multiple ? control.model.filter(model => someOption(model)) : null;
    const valid = multiple ? control.model.length === validOptions.length : false;
    if (!valid) {
      control.patchModel(validOptions);
    }
  } else {
    const valid = multiple ? false : someOption(control.model);
    if (!valid) {
      const model = multiple ? (someOption(control.model) ? [ control.model ] : []) : null;
      control.patchModel(model);
    }
  }
}

export const dynamicFormSelectEvaluatorType: DynamicFormControlEvaluatorType = {
  type: 'select',
  inputType: 'select',
  func: dynamicFormSelectEvaluatorFn,
  libraryName: dynamicFormLibrary.name
};

export const dynamicFormControlEvaluatorTypes: DynamicFormControlEvaluatorType[] = [
  dynamicFormSelectEvaluatorType
];
