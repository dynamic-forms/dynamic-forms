import { FormFieldTemplate } from '../../form-field/models/form-field-template';
import { FormControlInput } from './../../form-control-input/models/form-control-input';
import { FormControlValidation } from './form-control-validation';

export interface FormControlTemplate extends FormFieldTemplate {
  input: FormControlInput;
  validation: FormControlValidation;
}
