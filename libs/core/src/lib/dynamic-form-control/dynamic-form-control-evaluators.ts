import { DynamicFormControl } from './dynamic-form-control';

export class DynamicFormControlEvaluators {
  static evalSelect(formControl: DynamicFormControl): void {
    const valid = formControl.template.input.multiple
      ? DynamicFormControlEvaluators.selectHasOptions(formControl)
      : DynamicFormControlEvaluators.selectHasOption(formControl);
    if (!valid) {
      formControl.control.setValue(null);
    }
  }

  private static selectHasOptions(_formControl: DynamicFormControl): boolean {
    return true;
  }

  private static selectHasOption(formControl: DynamicFormControl): boolean {
    const hasOption = (formControl.template.input.options || []).some(option => {
      if (option.items) {
        return option.items.some(item => item.value === formControl.model);
      }
      return option.value === formControl.model;
    });
    return hasOption;
  }
}
