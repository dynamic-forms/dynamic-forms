import { DynamicFormInputConfig } from '@dynamic-forms/core';
import { DynamicFormCheckboxComponent } from './dynamic-form-checkbox/dynamic-form-checkbox.component';
import { DynamicFormDatepickerComponent } from './dynamic-form-datepicker/dynamic-form-datepicker.component';
import { DynamicFormDropdownComponent } from './dynamic-form-dropdown/dynamic-form-dropdown.component';
import { DynamicFormNumberboxComponent } from './dynamic-form-numberbox/dynamic-form-numberbox.component';
import { DynamicFormRadioComponent } from './dynamic-form-radio/dynamic-form-radio.component';
import { DynamicFormTextareaComponent } from './dynamic-form-textarea/dynamic-form-textarea.component';
import { DynamicFormTextboxComponent } from './dynamic-form-textbox/dynamic-form-textbox.component';

export const matDynamicFormInputConfig: DynamicFormInputConfig = {
  types: [
    { type: 'checkbox', component: DynamicFormCheckboxComponent },
    { type: 'datepicker', component: DynamicFormDatepickerComponent },
    { type: 'dropdown', component: DynamicFormDropdownComponent },
    { type: 'numberbox', component: DynamicFormNumberboxComponent },
    { type: 'radio', component: DynamicFormRadioComponent },
    { type: 'textarea', component: DynamicFormTextareaComponent },
    { type: 'textbox', component: DynamicFormTextboxComponent }
  ]
};
