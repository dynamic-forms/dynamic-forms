import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlHints } from './dynamic-form-control-hints';
import { DynamicFormControlValidation } from './dynamic-form-control-validation';

export interface DynamicFormControlTemplate<
  TValue = any,
  FormInput extends DynamicFormInput<TValue> = DynamicFormInput<TValue>
> extends DynamicFormFieldTemplate<DynamicFormControlValidation> {
  input: FormInput;
  hints?: DynamicFormControlHints;
}
