import { withDynamicFormControlValidators } from '../../dynamic-form-validation/dynamic-form-validation.module';
import { DynamicFormsFeature } from '../../dynamic-forms-feature';
import { dynamicFormFileMaxSizeValidatorType } from './dynamic-form-file-validators';

export function withDynamicFormFileValidators(): DynamicFormsFeature {
  return withDynamicFormControlValidators(dynamicFormFileMaxSizeValidatorType);
}
