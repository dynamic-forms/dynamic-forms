import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { DynamicFormMaterialComponent } from './dynamic-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    MatButtonModule
  ],
  declarations: [
    DynamicFormMaterialComponent
  ],
  exports: [
    DynamicFormMaterialComponent
  ]
})
export class DynamicFormMaterialModule {}
