import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BootstrapDynamicFormValidationModule } from '../dynamic-form-validation/dynamic-form-validation.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { BootstrapDynamicFormControlComponent } from './dynamic-form-control.component';
import { NumberboxModule } from './numberbox/numberbox.module';
import { TextboxModule } from './textbox/textbox.module';

@NgModule({
  imports: [
    CommonModule,
    BootstrapDynamicFormValidationModule,
    CheckboxModule,
    DatepickerModule,
    DropdownModule,
    NumberboxModule,
    TextboxModule
  ],
  declarations: [
    BootstrapDynamicFormControlComponent
  ],
  entryComponents: [
    BootstrapDynamicFormControlComponent
  ]
})
export class BootstrapDynamicFormControlModule {}
