import { FormFieldTemplate } from '../../form-field/form-field.model';
import { FormControlInput } from './../../form-control-input/form-input.model';
import { FormControlValidation } from './form-control.validation';

export interface FormControlTemplate extends FormFieldTemplate {
  input: FormControlInput;
  validation: FormControlValidation;
}
