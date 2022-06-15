import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export interface DynamicFormControlDefinition<
  Value = any,
  FormInput extends DynamicFormInput<Value> = DynamicFormInput<Value>,
  Template extends DynamicFormControlTemplate<Value, FormInput> = DynamicFormControlTemplate<Value, FormInput>
> extends DynamicFormFieldDefinition<Template> {
  children?: undefined;
  headerActions?: undefined;
  footerActions?: undefined;
}
