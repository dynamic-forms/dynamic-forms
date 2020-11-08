import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormFieldModule } from '../dynamic-form-field/dynamic-form-field.module';
import { DynamicFormComponent } from './dynamic-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule,
    DynamicFormFieldModule
  ],
  declarations: [
    DynamicFormComponent
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormModule {}
