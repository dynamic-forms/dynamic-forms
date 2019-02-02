import { FormFieldConfig } from '../../form-field';
import { FormControlConfig } from '../../form-control';
import { FormValidationConfig } from '../../form-validation/form-validation.config';

export interface FormConfig {
  fieldConfig: FormFieldConfig;
  controlConfig: FormControlConfig;
  validationConfig: FormValidationConfig;
}
