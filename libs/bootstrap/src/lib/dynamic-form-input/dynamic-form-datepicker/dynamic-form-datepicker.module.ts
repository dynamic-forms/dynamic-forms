import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFormDatepickerComponent
  ],
  entryComponents: [
    DynamicFormDatepickerComponent
  ]
})
export class DynamicFormDatepickerModule {}
