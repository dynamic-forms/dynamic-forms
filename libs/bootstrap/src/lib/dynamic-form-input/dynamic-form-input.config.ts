import { DynamicFormInputConfig } from '@dynamic-forms/core';
import { DynamicFormCheckboxComponent } from './dynamic-form-checkbox/dynamic-form-checkbox.component';
import { DynamicFormComboboxComponent } from './dynamic-form-combobox/dynamic-form-combobox.component';
import { DynamicFormDatepickerComponent } from './dynamic-form-datepicker/dynamic-form-datepicker.component';
import { DynamicFormDropdownComponent } from './dynamic-form-dropdown/dynamic-form-dropdown.component';
import { DynamicFormNumberboxComponent } from './dynamic-form-numberbox/dynamic-form-numberbox.component';
import { DynamicFormRadioComponent } from './dynamic-form-radio/dynamic-form-radio.component';
import { DynamicFormTextareaComponent } from './dynamic-form-textarea/dynamic-form-textarea.component';
import { DynamicFormTextboxComponent } from './dynamic-form-textbox/dynamic-form-textbox.component';

export const bsDynamicFormInputConfig: DynamicFormInputConfig = {
  types: [
    { type: 'checkbox', component: DynamicFormCheckboxComponent },
    { type: 'combobox', component: DynamicFormComboboxComponent, wrappers: [ 'label' ] },
    { type: 'datepicker', component: DynamicFormDatepickerComponent, wrappers: [ 'label' ] },
    { type: 'dropdown', component: DynamicFormDropdownComponent, wrappers: [ 'label' ] },
    { type: 'numberbox', component: DynamicFormNumberboxComponent, wrappers: [ 'label' ] },
    { type: 'radio', component: DynamicFormRadioComponent, wrappers: [ 'label' ] },
    { type: 'textarea', component: DynamicFormTextareaComponent, wrappers: [ 'label' ] },
    { type: 'textbox', component: DynamicFormTextboxComponent, wrappers: [ 'label' ] }
  ]
};
