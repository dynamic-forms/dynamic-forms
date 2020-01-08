import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDynamicFormCheckboxModule } from './dynamic-form-checkbox/dynamic-form-checkbox.module';
import { MatDynamicFormComboboxModule } from './dynamic-form-combobox/dynamic-form-combobox.module';
import { MatDynamicFormDatepickerModule } from './dynamic-form-datepicker/dynamic-form-datepicker.module';
import { MatDynamicFormNumberboxModule } from './dynamic-form-numberbox/dynamic-form-numberbox.module';
import { MatDynamicFormRadioModule } from './dynamic-form-radio/dynamic-form-radio.module';
import { MatDynamicFormSelectModule } from './dynamic-form-select/dynamic-form-select.module';
import { MatDynamicFormTextareaModule } from './dynamic-form-textarea/dynamic-form-textarea.module';
import { MatDynamicFormTextboxModule } from './dynamic-form-textbox/dynamic-form-textbox.module';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDynamicFormCheckboxModule,
    MatDynamicFormComboboxModule,
    MatDynamicFormDatepickerModule,
    MatDynamicFormNumberboxModule,
    MatDynamicFormRadioModule,
    MatDynamicFormSelectModule,
    MatDynamicFormTextareaModule,
    MatDynamicFormTextboxModule
  ],
  providers: [
    {
      provide: MAT_LABEL_GLOBAL_OPTIONS,
      useValue: { float: 'always' }
    }
  ]
})
export class MatDynamicFormInputModule {}
