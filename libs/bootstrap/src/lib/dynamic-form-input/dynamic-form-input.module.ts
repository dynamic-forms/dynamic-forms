import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormCheckboxModule } from './dynamic-form-checkbox/dynamic-form-checkbox.module';
import { DynamicFormComboboxModule } from './dynamic-form-combobox/dynamic-form-combobox.module';
import { DynamicFormDatepickerModule } from './dynamic-form-datepicker/dynamic-form-datepicker.module';
import { DynamicFormDropdownModule } from './dynamic-form-dropdown/dynamic-form-dropdown.module';
import { DynamicFormNumberboxModule } from './dynamic-form-numberbox/dynamic-form-numberbox.module';
import { DynamicFormRadioModule } from './dynamic-form-radio/dynamic-form-radio.module';
import { DynamicFormTextareaModule } from './dynamic-form-textarea/dynamic-form-textarea.module';
import { DynamicFormTextboxModule } from './dynamic-form-textbox/dynamic-form-textbox.module';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormCheckboxModule,
    DynamicFormComboboxModule,
    DynamicFormDatepickerModule,
    DynamicFormDropdownModule,
    DynamicFormNumberboxModule,
    DynamicFormRadioModule,
    DynamicFormTextareaModule,
    DynamicFormTextboxModule
  ]
})
export class DynamicFormInputBootstrapModule {}
