import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormFieldComponent } from './dynamic-form-field.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DynamicFormFieldComponent
  ],
  exports: [
    DynamicFormFieldComponent
  ],
  entryComponents: [
    DynamicFormFieldComponent
  ]
})
export class DynamicFormFieldModule {}
