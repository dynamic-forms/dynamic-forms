import { NgModule } from '@angular/core';
import { DynamicFormValidationModule } from '../../dynamic-form-validation/dynamic-form-validation.module';
import { dynamicFormFileMaxSizeValidatorType } from './dynamic-form-file-validators';

@NgModule({
  imports: [
    DynamicFormValidationModule.withControlValidator(dynamicFormFileMaxSizeValidatorType),
  ],
})
export class DynamicFormFileModule {}
