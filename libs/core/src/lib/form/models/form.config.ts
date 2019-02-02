import { FormFieldConfig } from '../../form-field/form-field.config';
import { FormControlConfig } from '../../form-control/models/form-control.config';
import { FormValidationConfig } from '../../form-validation/form-validation.config';

export interface FormConfig {
  fieldConfig: FormFieldConfig;
  controlConfig: FormControlConfig;
  validationConfig: FormValidationConfig;
}
