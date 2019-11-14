import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormElementModule } from '../dynamic-form-element.module';
import { DynamicFormContainerComponent } from './dynamic-form-container.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule
  ],
  declarations: [
    DynamicFormContainerComponent
  ],
  exports: [
    DynamicFormContainerComponent
  ],
  entryComponents: [
    DynamicFormContainerComponent
  ]
})
export class DynamicFormContainerModule {}
