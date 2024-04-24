import { NgModule } from '@angular/core';
import { withDynamicFormControlValidators } from '../../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormsFeature } from '../../dynamic-forms-feature';
import { importDynamicFormsProviders } from '../../dynamic-forms.module';
import { dynamicFormFileMaxSizeValidatorType } from './dynamic-form-file-validators';

export function withDynamicFormFileValidators(): DynamicFormsFeature {
  return withDynamicFormControlValidators(dynamicFormFileMaxSizeValidatorType);
}

/**
 * @deprecated Use {@link withDynamicFormFileValidators} instead.
 */
@NgModule({ providers: importDynamicFormsProviders(withDynamicFormFileValidators()) })
export class DynamicFormFileModule {}
