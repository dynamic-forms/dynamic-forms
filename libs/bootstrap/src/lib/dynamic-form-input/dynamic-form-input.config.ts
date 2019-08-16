import { DynamicFormInputConfig } from '@dynamic-forms/core';
import { DynamicFormCheckboxComponent } from './dynamic-form-checkbox/dynamic-form-checkbox.component';
import { DynamicFormComboboxComponent } from './dynamic-form-combobox/dynamic-form-combobox.component';
import { DynamicFormDatepickerComponent } from './dynamic-form-datepicker/dynamic-form-datepicker.component';
import { DynamicFormNumberboxComponent } from './dynamic-form-numberbox/dynamic-form-numberbox.component';
import { DynamicFormRadioComponent } from './dynamic-form-radio/dynamic-form-radio.component';
import { DynamicFormSelectComponent } from './dynamic-form-select/dynamic-form-select.component';
import { DynamicFormTextareaComponent } from './dynamic-form-textarea/dynamic-form-textarea.component';
import { DynamicFormTextboxComponent } from './dynamic-form-textbox/dynamic-form-textbox.component';

export const bsDynamicFormInputConfig: DynamicFormInputConfig = {
  types: [
    { type: 'checkbox', component: DynamicFormCheckboxComponent, wrappers: [ 'errors' ] },
    { type: 'combobox', component: DynamicFormComboboxComponent, wrappers: [ 'label', 'hints', 'errors' ] },
    { type: 'datepicker', component: DynamicFormDatepickerComponent, wrappers: [ 'label', 'hints', 'errors' ] },
    { type: 'numberbox', component: DynamicFormNumberboxComponent, wrappers: [ 'label', 'hints', 'errors' ] },
    { type: 'radio', component: DynamicFormRadioComponent, wrappers: [ 'label', 'errors' ] },
    { type: 'select', component: DynamicFormSelectComponent, wrappers: [ 'label', 'hints', 'errors' ] },
    { type: 'textarea', component: DynamicFormTextareaComponent, wrappers: [ 'label', 'hints', 'errors' ] },
    { type: 'textbox', component: DynamicFormTextboxComponent, wrappers: [ 'label', 'hints', 'errors' ] }
  ]
};
