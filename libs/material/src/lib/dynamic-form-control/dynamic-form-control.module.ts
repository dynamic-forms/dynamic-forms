import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxModule } from './checkbox/checkbox.module';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DatepickerModule } from './datepicker/datepicker.module';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownModule } from './dropdown/dropdown.module';
import { MatDynamicFormControlComponent } from './dynamic-form-control.component';
import { NumberboxComponent } from './numberbox/numberbox.component';
import { NumberboxModule } from './numberbox/numberbox.module';
import { TextboxComponent } from './textbox/textbox.component';
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
