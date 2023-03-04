import { NgModule } from '@angular/core';
import { BsDynamicFormCheckboxModule } from './dynamic-form-checkbox/dynamic-form-checkbox.module';
import { BsDynamicFormComboboxModule } from './dynamic-form-combobox/dynamic-form-combobox.module';
import { BsDynamicFormDatepickerModule } from './dynamic-form-datepicker/dynamic-form-datepicker.module';
import { BsDynamicFormFileModule } from './dynamic-form-file/dynamic-form-file.module';
import { BsDynamicFormNumberboxModule } from './dynamic-form-numberbox/dynamic-form-numberbox.module';
import { BsDynamicFormRadioModule } from './dynamic-form-radio/dynamic-form-radio.module';
import { BsDynamicFormSelectModule } from './dynamic-form-select/dynamic-form-select.module';
import { BsDynamicFormSwitchModule } from './dynamic-form-switch/dynamic-form-switch.module';
import { BsDynamicFormTextareaModule } from './dynamic-form-textarea/dynamic-form-textarea.module';
import { BsDynamicFormTextboxModule } from './dynamic-form-textbox/dynamic-form-textbox.module';
import { BsDynamicFormToggleModule } from './dynamic-form-toggle/dynamic-form-toggle.module';

@NgModule({
  imports: [
    BsDynamicFormCheckboxModule,
    BsDynamicFormComboboxModule,
    BsDynamicFormDatepickerModule,
    BsDynamicFormFileModule,
    BsDynamicFormNumberboxModule,
    BsDynamicFormRadioModule,
    BsDynamicFormSelectModule,
    BsDynamicFormSwitchModule,
    BsDynamicFormTextareaModule,
    BsDynamicFormTextboxModule,
    BsDynamicFormToggleModule,
  ],
})
export class BsDynamicFormInputModule {}
