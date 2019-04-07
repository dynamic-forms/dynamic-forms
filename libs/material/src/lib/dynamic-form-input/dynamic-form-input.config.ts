import { DynamicFormInputConfig } from '@dynamic-forms/core';
import { CheckboxComponent } from './dynamic-form-checkbox/checkbox.component';
import { DatepickerComponent } from './dynamic-form-datepicker/datepicker.component';
import { DropdownComponent } from './dynamic-form-dropdown/dropdown.component';
import { NumberboxComponent } from './dynamic-form-numberbox/numberbox.component';
import { RadioComponent } from './dynamic-form-radio/radio.component';
import { TextareaComponent } from './dynamic-form-textarea/textarea.component';
import { TextboxComponent } from './dynamic-form-textbox/textbox.component';

export const matDynamicFormInputConfig: DynamicFormInputConfig = {
  types: [
    { type: 'checkbox', component: CheckboxComponent },
    { type: 'datepicker', component: DatepickerComponent },
    { type: 'dropdown', component: DropdownComponent },
    { type: 'numberbox', component: NumberboxComponent },
    { type: 'radio', component: RadioComponent },
    { type: 'textarea', component: TextareaComponent },
    { type: 'textbox', component: TextboxComponent }
  ]
};
