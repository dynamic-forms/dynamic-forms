import { FormFieldTemplate } from '../../form-field';
import { FormControlInput } from './../../form-control-input';
import { FormControlValidation } from './form-control-validation';

export interface FormControlTemplate extends FormFieldTemplate {
  input: FormControlInput;
  validation: FormControlValidation;
}
