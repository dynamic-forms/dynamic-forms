import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormElementComponent } from './dynamic-form-element.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DynamicFormElementComponent
  ],
  exports: [
    DynamicFormElementComponent
  ],
  entryComponents: [
    DynamicFormElementComponent
  ]
})
export class DynamicFormElementModule {}
