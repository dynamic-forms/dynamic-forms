import { DynamicFormInputConfig } from '@dynamic-forms/core';
import { BsDynamicFormCheckboxComponent } from './dynamic-form-checkbox/dynamic-form-checkbox.component';
import { BsDynamicFormComboboxComponent } from './dynamic-form-combobox/dynamic-form-combobox.component';
import { BsDynamicFormDatepickerComponent } from './dynamic-form-datepicker/dynamic-form-datepicker.component';
import { BsDynamicFormNumberboxComponent } from './dynamic-form-numberbox/dynamic-form-numberbox.component';
import { BsDynamicFormRadioComponent } from './dynamic-form-radio/dynamic-form-radio.component';
import { BsDynamicFormSelectComponent } from './dynamic-form-select/dynamic-form-select.component';
import { BsDynamicFormTextareaComponent } from './dynamic-form-textarea/dynamic-form-textarea.component';
import { BsDynamicFormTextboxComponent } from './dynamic-form-textbox/dynamic-form-textbox.component';

export const bsDynamicFormInputConfig: DynamicFormInputConfig = {
  types: [
    { type: 'checkbox', component: BsDynamicFormCheckboxComponent, wrappers: [ 'errors' ] },
    { type: 'combobox', component: BsDynamicFormComboboxComponent, wrappers: [ 'label', 'hints', 'errors' ] },
    { type: 'datepicker', component: BsDynamicFormDatepickerComponent, wrappers: [ 'label', 'hints', 'errors' ] },
    { type: 'numberbox', component: BsDynamicFormNumberboxComponent, wrappers: [ 'label', 'hints', 'errors' ] },
    { type: 'radio', component: BsDynamicFormRadioComponent, wrappers: [ 'label', 'errors' ] },
    { type: 'select', component: BsDynamicFormSelectComponent, wrappers: [ 'label', 'hints', 'errors' ] },
    { type: 'textarea', component: BsDynamicFormTextareaComponent, wrappers: [ 'label', 'hints', 'errors' ] },
    { type: 'textbox', component: BsDynamicFormTextboxComponent, wrappers: [ 'label', 'hints', 'errors' ] }
  ]
};
