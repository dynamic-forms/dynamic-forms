import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormControlMaterialComponent } from './dynamic-form-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DynamicFormControlMaterialComponent
  ],
  exports: [
    DynamicFormControlMaterialComponent
  ],
  entryComponents: [
    DynamicFormControlMaterialComponent
  ]
})
export class DynamicFormControlMaterialModule {}
