import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormValidationMaterialComponent } from './dynamic-form-validation.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  declarations: [
    DynamicFormValidationMaterialComponent
  ],
  exports: [
    DynamicFormValidationMaterialComponent
  ]
})
export class DynamicFormValidationMaterialModule {}
