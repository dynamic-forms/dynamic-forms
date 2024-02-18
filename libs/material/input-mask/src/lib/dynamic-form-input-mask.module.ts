import { NgModule } from '@angular/core';
import { DynamicFormConfigModule } from '@dynamic-forms/core';
import { matDynamicFormInputMaskType } from './dynamic-form-input-mask-type';

@NgModule({
  imports: [DynamicFormConfigModule.withInput(matDynamicFormInputMaskType)],
  exports: [DynamicFormConfigModule],
})
export class MatDynamicFormInputMaskModule {}
