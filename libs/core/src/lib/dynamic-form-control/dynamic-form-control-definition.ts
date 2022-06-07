import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export interface DynamicFormControlDefinition<
  TValue = any,
  FormInput extends DynamicFormInput<TValue> = DynamicFormInput<TValue>,
  Template extends DynamicFormControlTemplate<TValue, FormInput> = DynamicFormControlTemplate<TValue, FormInput>
> extends DynamicFormFieldDefinition<Template> {
  children?: undefined;
  headerActions?: undefined;
  footerActions?: undefined;
}
