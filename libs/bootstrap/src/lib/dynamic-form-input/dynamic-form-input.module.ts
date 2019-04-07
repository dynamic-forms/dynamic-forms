import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxModule } from './dynamic-form-checkbox/checkbox.module';
import { DatepickerModule } from './dynamic-form-datepicker/datepicker.module';
import { DropdownModule } from './dynamic-form-dropdown/dropdown.module';
import { NumberboxModule } from './dynamic-form-numberbox/numberbox.module';
import { RadioModule } from './dynamic-form-radio/radio.module';
import { TextareaModule } from './dynamic-form-textarea/textarea.module';
import { TextboxModule } from './dynamic-form-textbox/textbox.module';

@NgModule({
  imports: [
    CommonModule,
    CheckboxModule,
    DatepickerModule,
    DropdownModule,
    NumberboxModule,
    RadioModule,
    TextareaModule,
    TextboxModule
  ]
})
export class DynamicFormInputBootstrapModule {}
