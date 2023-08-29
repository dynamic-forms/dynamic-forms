import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, DynamicFormFileModule, DynamicFormTextboxModule } from '@dynamic-forms/core';
import { bsDynamicFormCheckboxType } from './dynamic-form-checkbox/dynamic-form-checkbox-type';
import { bsDynamicFormComboboxType } from './dynamic-form-combobox/dynamic-form-combobox-type';
import { bsDynamicFormDatepickerType } from './dynamic-form-datepicker/dynamic-form-datepicker-type';
import { bsDynamicFormFileType } from './dynamic-form-file/dynamic-form-file-type';
import { bsDynamicFormNumberboxType } from './dynamic-form-numberbox/dynamic-form-numberbox-type';
import { bsDynamicFormRadioType } from './dynamic-form-radio/dynamic-form-radio-type';
import { bsDynamicFormSelectType } from './dynamic-form-select/dynamic-form-select-type';
import { bsDynamicFormSwitchType } from './dynamic-form-switch/dynamic-form-switch-type';
import { bsDynamicFormTextareaType } from './dynamic-form-textarea/dynamic-form-textarea-type';
import { bsDynamicFormTextboxType } from './dynamic-form-textbox/dynamic-form-textbox-type';
import { bsDynamicFormToggleType } from './dynamic-form-toggle/dynamic-form-toggle-type';

export const bsDynamicFormInputTypes = [
  bsDynamicFormCheckboxType,
  bsDynamicFormComboboxType,
  bsDynamicFormDatepickerType,
  bsDynamicFormFileType,
  bsDynamicFormNumberboxType,
  bsDynamicFormRadioType,
  bsDynamicFormSelectType,
  bsDynamicFormSwitchType,
  bsDynamicFormTextareaType,
  bsDynamicFormTextboxType,
  bsDynamicFormToggleType,
];

@NgModule({
  imports: [
    DynamicFormFileModule,
    DynamicFormTextboxModule,
    DynamicFormConfigModule.withInputs(bsDynamicFormInputTypes),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
})
export class BsDynamicFormInputModule {}
