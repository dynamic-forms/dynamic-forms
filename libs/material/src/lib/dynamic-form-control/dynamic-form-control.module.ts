import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDynamicFormControlComponent } from './dynamic-form-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MatDynamicFormControlComponent
  ],
  exports: [
    MatDynamicFormControlComponent
  ],
  entryComponents: [
    MatDynamicFormControlComponent
  ]
})
export class MatDynamicFormControlModule {}
