import { FormControlConfig } from '../../form-control/models/form-control-config';
import { FormFieldConfig } from '../../form-field/models/form-field-config';
import { FormValidationConfig } from '../../form-validation/models/form-validation-config';

export interface FormConfig {
  fieldConfig: FormFieldConfig;
  controlConfig: FormControlConfig;
  validationConfig: FormValidationConfig;
}
