import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DynamicFormConfigModule, DynamicFormFileModule, DynamicFormTextboxModule } from '@dynamic-forms/core';
import { matDynamicFormCheckboxType } from './dynamic-form-checkbox/dynamic-form-checkbox-type';
import { matDynamicFormComboboxType } from './dynamic-form-combobox/dynamic-form-combobox-type';
import { matDynamicFormDatepickerType } from './dynamic-form-datepicker/dynamic-form-datepicker-type';
import { matDynamicFormFileType } from './dynamic-form-file/dynamic-form-file-type';
import { matDynamicFormNumberboxType } from './dynamic-form-numberbox/dynamic-form-numberbox-type';
import { matDynamicFormRadioType } from './dynamic-form-radio/dynamic-form-radio-type';
import { matDynamicFormSelectType } from './dynamic-form-select/dynamic-form-select-type';
import { matDynamicFormSwitchType } from './dynamic-form-switch/dynamic-form-switch-type';
import { matDynamicFormTextareaType } from './dynamic-form-textarea/dynamic-form-textarea-type';
import { matDynamicFormTextboxType } from './dynamic-form-textbox/dynamic-form-textbox-type';
import { matDynamicFormToggleType } from './dynamic-form-toggle/dynamic-form-toggle-type';

export const matDynamicFormInputTypes = [
  matDynamicFormCheckboxType,
  matDynamicFormComboboxType,
  matDynamicFormDatepickerType,
  matDynamicFormFileType,
  matDynamicFormNumberboxType,
  matDynamicFormRadioType,
  matDynamicFormSelectType,
  matDynamicFormSwitchType,
  matDynamicFormTextareaType,
  matDynamicFormTextboxType,
  matDynamicFormToggleType,
];

@NgModule({
  imports: [DynamicFormFileModule, DynamicFormTextboxModule, DynamicFormConfigModule.withInputs(matDynamicFormInputTypes)],
  exports: [DynamicFormConfigModule],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    },
  ],
})
export class MatDynamicFormInputModule {}
