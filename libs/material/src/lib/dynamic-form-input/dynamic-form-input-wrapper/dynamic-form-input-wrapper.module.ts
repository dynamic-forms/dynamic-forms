import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDynamicFormInputWrapperComponent } from './dynamic-form-input-wrapper.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MatDynamicFormInputWrapperComponent
  ],
  exports: [
    MatDynamicFormInputWrapperComponent
  ]
})
export class MatDynamicFormInputWrapperModule {}
