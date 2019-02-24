import { DynamicFormArrayComponent, DynamicFormConfig, DynamicFormConfigService, DynamicFormGroupComponent } from '@dynamic-forms/core';
import { MatDynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { CheckboxComponent } from './dynamic-form-input/checkbox/checkbox.component';
import { DatepickerComponent } from './dynamic-form-input/datepicker/datepicker.component';
import { DropdownComponent } from './dynamic-form-input/dropdown/dropdown.component';
import { NumberboxComponent } from './dynamic-form-input/numberbox/numberbox.component';
import { TextboxComponent } from './dynamic-form-input/textbox/textbox.component';

export const dynamicFormsMaterialConfig: DynamicFormConfig = {
  module: 'material',
  fieldConfig: {
    types: [
      { type: 'group', component: DynamicFormGroupComponent },
      { type: 'array', component: DynamicFormArrayComponent },
      { type: 'control', component: MatDynamicFormControlComponent }
    ]
  },
  inputConfig: {
    types: [
      { type: 'checkbox', component: CheckboxComponent },
      { type: 'datepicker', component: DatepickerComponent },
      { type: 'dropdown', component: DropdownComponent },
      { type: 'numberbox', component: NumberboxComponent },
      { type: 'textbox', component: TextboxComponent }
    ]
  },
  validationConfig: {
    defaultMessage: 'The field is invalid.',
    messages: {
      required: 'The field is required.',
      email: 'The field is not an email.',
      pattern: 'The field does not fit the pattern.',
      min: 'The field does not fit the min value',
      max: 'The field does not fit the max value',
      minlength: 'The field does not fit the min length',
      maxlength: 'The field does not fit the max length'
    }
  }
};

export function dynamicFormsMaterialConfigService(configs: DynamicFormConfig[]): DynamicFormConfigService {
  const config = configs.find(c => c.module === dynamicFormsMaterialConfig.module);
  return new DynamicFormConfigService(config);
}
