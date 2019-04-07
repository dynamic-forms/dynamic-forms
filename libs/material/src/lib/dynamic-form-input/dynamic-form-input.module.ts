import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    MatFormFieldModule,
    CheckboxModule,
    DatepickerModule,
    DropdownModule,
    NumberboxModule,
    RadioModule,
    TextareaModule,
    TextboxModule
  ],
  providers: [
    {
      provide: MAT_LABEL_GLOBAL_OPTIONS,
      useValue: { float: 'always' }
    }
  ]
})
export class DynamicFormInputMaterialModule {}
