import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDynamicFormCheckboxModule } from './dynamic-form-checkbox/dynamic-form-checkbox.module';
import { BsDynamicFormComboboxModule } from './dynamic-form-combobox/dynamic-form-combobox.module';
import { BsDynamicFormDatepickerModule } from './dynamic-form-datepicker/dynamic-form-datepicker.module';
import { BsDynamicFormNumberboxModule } from './dynamic-form-numberbox/dynamic-form-numberbox.module';
import { BsDynamicFormRadioModule } from './dynamic-form-radio/dynamic-form-radio.module';
import { BsDynamicFormSelectModule } from './dynamic-form-select/dynamic-form-select.module';
import { BsDynamicFormTextareaModule } from './dynamic-form-textarea/dynamic-form-textarea.module';
import { BsDynamicFormTextboxModule } from './dynamic-form-textbox/dynamic-form-textbox.module';

@NgModule({
  imports: [
    CommonModule,
    BsDynamicFormCheckboxModule,
    BsDynamicFormComboboxModule,
    BsDynamicFormDatepickerModule,
    BsDynamicFormNumberboxModule,
    BsDynamicFormRadioModule,
    BsDynamicFormSelectModule,
    BsDynamicFormTextareaModule,
    BsDynamicFormTextboxModule
  ]
})
export class BsDynamicFormInputModule {}
