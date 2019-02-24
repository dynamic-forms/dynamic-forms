import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDynamicFormValidationComponent } from './dynamic-form-validation.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  declarations: [
    MatDynamicFormValidationComponent
  ],
  exports: [
    MatDynamicFormValidationComponent
  ]
})
export class MatDynamicFormValidationModule {}
