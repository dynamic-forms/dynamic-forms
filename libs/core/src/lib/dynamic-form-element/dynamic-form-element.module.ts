import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormContainerComponent } from './dynamic-form-container/dynamic-form-container.component';
import { DynamicFormContentComponent } from './dynamic-form-content/dynamic-form-content.component';
import { DynamicFormElementComponent } from './dynamic-form-element.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DynamicFormContainerComponent,
    DynamicFormContentComponent,
    DynamicFormElementComponent
  ],
  exports: [
    DynamicFormContainerComponent,
    DynamicFormContentComponent,
    DynamicFormElementComponent
  ],
  entryComponents: [
    DynamicFormContainerComponent,
    DynamicFormContentComponent,
    DynamicFormElementComponent
  ]
})
export class DynamicFormElementModule {}
