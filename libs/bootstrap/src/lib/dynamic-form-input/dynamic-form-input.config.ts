import { DynamicFormInputConfig } from '@dynamic-forms/core';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NumberboxComponent } from './numberbox/numberbox.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TextboxComponent } from './textbox/textbox.component';

export const bsDynamicFormInputConfig: DynamicFormInputConfig = {
  types: [
    { type: 'checkbox', component: CheckboxComponent },
    { type: 'datepicker', component: DatepickerComponent, wrappers: [ 'label' ] },
    { type: 'dropdown', component: DropdownComponent, wrappers: [ 'label' ] },
    { type: 'numberbox', component: NumberboxComponent, wrappers: [ 'label' ] },
    { type: 'radio-button', component: RadioButtonComponent, wrappers: [ 'label' ] },
    { type: 'textarea', component: TextareaComponent, wrappers: [ 'label' ] },
    { type: 'textbox', component: TextboxComponent, wrappers: [ 'label' ] }
  ]
};
