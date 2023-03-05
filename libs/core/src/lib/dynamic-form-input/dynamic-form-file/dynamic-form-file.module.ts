import { NgModule } from '@angular/core';
import { DynamicFormValidationModule } from '../../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormFileDirective } from './dynamic-form-file.directive';
import { dynamicFormFileMaxSizeValidatorType } from './dynamic-form-file-validators';

@NgModule({
  imports: [
    DynamicFormValidationModule.withControlValidator(dynamicFormFileMaxSizeValidatorType),
  ],
  declarations: [
    DynamicFormFileDirective,
  ],
  exports: [
    DynamicFormFileDirective,
  ],
})
export class DynamicFormFileModule {}
