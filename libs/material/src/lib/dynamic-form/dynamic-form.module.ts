import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { DynamicFormMaterialComponent } from './dynamic-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule
  ],
  declarations: [
    DynamicFormMaterialComponent
  ],
  exports: [
    DynamicFormMaterialComponent
  ]
})
export class DynamicFormMaterialModule {}
