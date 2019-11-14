import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormContentComponent } from './dynamic-form-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DynamicFormContentComponent
  ],
  exports: [
    DynamicFormContentComponent
  ],
  entryComponents: [
    DynamicFormContentComponent
  ]
})
export class DynamicFormContentModule {}
