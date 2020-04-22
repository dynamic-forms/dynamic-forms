import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlHints } from './dynamic-form-control-hints';
import { DynamicFormControlValidation } from './dynamic-form-control-validation';

export interface DynamicFormControlTemplate<
  FormInput extends DynamicFormInput = DynamicFormInput
> extends DynamicFormFieldTemplate<DynamicFormControlValidation> {
  input: FormInput;
  hints?: DynamicFormControlHints;
}
