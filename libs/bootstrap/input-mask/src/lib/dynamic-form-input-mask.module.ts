import { NgModule } from '@angular/core';
import { DynamicFormConfigModule } from '@dynamic-forms/core';
import { bsDynamicFormInputMaskType } from './dynamic-form-input-mask-type';

@NgModule({
  imports: [DynamicFormConfigModule.withInput(bsDynamicFormInputMaskType)],
  exports: [DynamicFormConfigModule],
})
export class BsDynamicFormInputMaskModule {}
