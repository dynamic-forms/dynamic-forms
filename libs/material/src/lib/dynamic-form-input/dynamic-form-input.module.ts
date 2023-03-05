import { NgModule } from '@angular/core';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDynamicFormCheckboxModule } from './dynamic-form-checkbox/dynamic-form-checkbox.module';
import { MatDynamicFormComboboxModule } from './dynamic-form-combobox/dynamic-form-combobox.module';
import { MatDynamicFormDatepickerModule } from './dynamic-form-datepicker/dynamic-form-datepicker.module';
import { MatDynamicFormFileModule } from './dynamic-form-file/dynamic-form-file.module';
import { MatDynamicFormNumberboxModule } from './dynamic-form-numberbox/dynamic-form-numberbox.module';
import { MatDynamicFormRadioModule } from './dynamic-form-radio/dynamic-form-radio.module';
import { MatDynamicFormSelectModule } from './dynamic-form-select/dynamic-form-select.module';
import { MatDynamicFormSwitchModule } from './dynamic-form-switch/dynamic-form-switch.module';
import { MatDynamicFormTextareaModule } from './dynamic-form-textarea/dynamic-form-textarea.module';
import { MatDynamicFormTextboxModule } from './dynamic-form-textbox/dynamic-form-textbox.module';
import { MatDynamicFormToggleModule } from './dynamic-form-toggle/dynamic-form-toggle.module';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatDynamicFormCheckboxModule,
    MatDynamicFormComboboxModule,
    MatDynamicFormDatepickerModule,
    MatDynamicFormFileModule,
    MatDynamicFormNumberboxModule,
    MatDynamicFormRadioModule,
    MatDynamicFormSelectModule,
    MatDynamicFormSwitchModule,
    MatDynamicFormTextareaModule,
    MatDynamicFormTextboxModule,
    MatDynamicFormToggleModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class MatDynamicFormInputModule {}
