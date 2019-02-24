import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@dynamic-forms/core';
import { BsDynamicFormComponent } from './dynamic-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule
  ],
  declarations: [
    BsDynamicFormComponent
  ],
  exports: [
    BsDynamicFormComponent
  ]
})
export class BootstrapDynamicFormModule {}
