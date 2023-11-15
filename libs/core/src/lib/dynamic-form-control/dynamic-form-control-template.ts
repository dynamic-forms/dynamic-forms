import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlHints } from './dynamic-form-control-hints';
import { DynamicFormControlValidation } from './dynamic-form-control-validation';

export interface DynamicFormControlTemplate<Value = any, FormInput extends DynamicFormInput<Value> = DynamicFormInput<Value>>
  extends DynamicFormFieldTemplate<DynamicFormControlValidation> {
  input: FormInput;
  hints?: DynamicFormControlHints;
}
