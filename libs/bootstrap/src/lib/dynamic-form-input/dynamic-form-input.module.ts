import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxModule } from './checkbox/checkbox.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { NumberboxModule } from './numberbox/numberbox.module';
import { TextboxModule } from './textbox/textbox.module';

@NgModule({
  imports: [
    CommonModule,
    CheckboxModule,
    DatepickerModule,
    DropdownModule,
    NumberboxModule,
    TextboxModule
  ]
})
export class BootstrapDynamicFormInputModule {}
