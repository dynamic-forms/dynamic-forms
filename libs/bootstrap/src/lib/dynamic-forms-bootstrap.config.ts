import { DynamicFormArrayComponent, DynamicFormConfig, DynamicFormConfigService, DynamicFormGroupComponent } from '@dynamic-forms/core';
import { BootstrapDynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { CheckboxComponent } from './dynamic-form-input/checkbox/checkbox.component';
import { DatepickerComponent } from './dynamic-form-input/datepicker/datepicker.component';
import { DropdownComponent } from './dynamic-form-input/dropdown/dropdown.component';
import { NumberboxComponent } from './dynamic-form-input/numberbox/numberbox.component';
import { TextboxComponent } from './dynamic-form-input/textbox/textbox.component';
import { BootstrapDynamicLabelWrapperComponent } from './dynamic-form-wrapper/dynamic-label-wrapper.component';

export const dynamicFormsBootstrapConfig: DynamicFormConfig = {
  module: 'bootstrap',
  wrapperConfig: {
    types: [
      { type: 'label', component: BootstrapDynamicLabelWrapperComponent }
    ]
  },
  fieldConfig: {
    types: [
      { type: 'group', component: DynamicFormGroupComponent },
      { type: 'array', component: DynamicFormArrayComponent },
      { type: 'control', component: BootstrapDynamicFormControlComponent }
    ]
  },
  inputConfig: {
    types: [
      { type: 'checkbox', component: CheckboxComponent },
      { type: 'datepicker', component: DatepickerComponent, wrappers: [ 'label' ] },
      { type: 'dropdown', component: DropdownComponent, wrappers: [ 'label' ] },
      { type: 'numberbox', component: NumberboxComponent, wrappers: [ 'label' ] },
      { type: 'textbox', component: TextboxComponent, wrappers: [ 'label' ] }
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

export function dynamicFormsBootstrapConfigService(configs: DynamicFormConfig[]): DynamicFormConfigService {
  const config = configs.find(c => c.module === dynamicFormsBootstrapConfig.module);
  return new DynamicFormConfigService(config);
}
