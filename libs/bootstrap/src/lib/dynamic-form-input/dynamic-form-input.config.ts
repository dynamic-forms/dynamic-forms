import { DynamicFormInputConfig } from '@dynamic-forms/core';
import { CheckboxComponent } from './dynamic-form-checkbox/checkbox.component';
import { DatepickerComponent } from './dynamic-form-datepicker/datepicker.component';
import { DropdownComponent } from './dynamic-form-dropdown/dropdown.component';
import { NumberboxComponent } from './dynamic-form-numberbox/numberbox.component';
import { RadioComponent } from './dynamic-form-radio/radio.component';
import { TextareaComponent } from './dynamic-form-textarea/textarea.component';
import { TextboxComponent } from './dynamic-form-textbox/textbox.component';

export const bsDynamicFormInputConfig: DynamicFormInputConfig = {
  types: [
    { type: 'checkbox', component: CheckboxComponent },
    { type: 'datepicker', component: DatepickerComponent, wrappers: [ 'label' ] },
    { type: 'dropdown', component: DropdownComponent, wrappers: [ 'label' ] },
    { type: 'numberbox', component: NumberboxComponent, wrappers: [ 'label' ] },
    { type: 'radio', component: RadioComponent, wrappers: [ 'label' ] },
    { type: 'textarea', component: TextareaComponent, wrappers: [ 'label' ] },
    { type: 'textbox', component: TextboxComponent, wrappers: [ 'label' ] }
  ]
};
