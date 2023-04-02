import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormElementModule } from '@dynamic-forms/core';
import { BsDynamicFormInputWrapperComponent } from './dynamic-form-input-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormElementModule,
  ],
  declarations: [
    BsDynamicFormInputWrapperComponent,
  ],
  exports: [
    BsDynamicFormInputWrapperComponent,
  ],
})
export class BsDynamicFormInputWrapperModule {}
