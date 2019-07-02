import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormCheckboxModule } from './dynamic-form-checkbox/dynamic-form-checkbox.module';
import { DynamicFormComboboxModule } from './dynamic-form-combobox/dynamic-form-combobox.module';
import { DynamicFormDatepickerModule } from './dynamic-form-datepicker/dynamic-form-datepicker.module';
import { DynamicFormNumberboxModule } from './dynamic-form-numberbox/dynamic-form-numberbox.module';
import { DynamicFormRadioModule } from './dynamic-form-radio/dynamic-form-radio.module';
import { DynamicFormSelectModule } from './dynamic-form-select/dynamic-form-select.module';
import { DynamicFormTextareaModule } from './dynamic-form-textarea/dynamic-form-textarea.module';
import { DynamicFormTextboxModule } from './dynamic-form-textbox/dynamic-form-textbox.module';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    DynamicFormCheckboxModule,
    DynamicFormComboboxModule,
    DynamicFormDatepickerModule,
    DynamicFormNumberboxModule,
    DynamicFormRadioModule,
    DynamicFormSelectModule,
    DynamicFormTextareaModule,
    DynamicFormTextboxModule
  ],
  providers: [
    {
      provide: MAT_LABEL_GLOBAL_OPTIONS,
      useValue: { float: 'always' }
    }
  ]
})
export class MatDynamicFormInputModule {}
