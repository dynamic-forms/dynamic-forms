import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormElementComponent } from './dynamic-form-element.component';
import { DynamicFormElementsComponent } from './dynamic-form-elements.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DynamicFormElementComponent,
    DynamicFormElementsComponent
  ],
  exports: [
    DynamicFormElementComponent,
    DynamicFormElementsComponent
  ],
  entryComponents: [
    DynamicFormElementComponent,
    DynamicFormElementsComponent
  ]
})
export class DynamicFormElementModule {}
