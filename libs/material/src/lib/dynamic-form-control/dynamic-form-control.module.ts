import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CheckboxModule } from './checkbox/checkbox.module';
import { DatepickerModule } from './datepicker/datepicker.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { MatDynamicFormControlComponent } from './dynamic-form-control.component';
import { NumberboxModule } from './numberbox/numberbox.module';
import { TextboxModule } from './textbox/textbox.module';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    CheckboxModule,
    DatepickerModule,
    DropdownModule,
    NumberboxModule,
    TextboxModule
  ],
  declarations: [
    MatDynamicFormControlComponent
  ],
  exports: [
    MatDynamicFormControlComponent
  ],
  entryComponents: [
    MatDynamicFormControlComponent
  ],
  providers: [
    {
      provide: MAT_LABEL_GLOBAL_OPTIONS,
      useValue: { float: 'never' }
    }
  ]
})
export class MatDynamicFormControlModule {}
