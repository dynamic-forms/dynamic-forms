import { DynamicFormInputConfig } from '@dynamic-forms/core';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NumberboxComponent } from './numberbox/numberbox.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TextboxComponent } from './textbox/textbox.component';

export const matDynamicFormInputConfig: DynamicFormInputConfig = {
  types: [
    { type: 'checkbox', component: CheckboxComponent },
    { type: 'datepicker', component: DatepickerComponent },
    { type: 'dropdown', component: DropdownComponent },
    { type: 'numberbox', component: NumberboxComponent },
    { type: 'textarea', component: TextareaComponent },
    { type: 'textbox', component: TextboxComponent }
  ]
};
