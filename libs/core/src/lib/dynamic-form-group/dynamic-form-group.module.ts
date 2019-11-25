import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormElementModule } from '../dynamic-form-element/dynamic-form-element.module';
import { DynamicFormGroupComponent } from './dynamic-form-group.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormElementModule
  ],
  declarations: [
    DynamicFormGroupComponent
  ],
  exports: [
    DynamicFormGroupComponent
  ],
  entryComponents: [
    DynamicFormGroupComponent
  ]
})
export class DynamicFormGroupModule {}
