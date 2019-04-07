import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CheckboxModule } from './checkbox/checkbox.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { NumberboxModule } from './numberbox/numberbox.module';
import { RadioModule } from './radio/radio.module';
import { TextareaModule } from './textarea/textarea.module';
import { TextboxModule } from './textbox/textbox.module';

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
