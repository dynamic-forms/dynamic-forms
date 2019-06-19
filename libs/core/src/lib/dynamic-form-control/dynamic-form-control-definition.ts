import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export interface DynamicFormControlDefinition<FormInput extends DynamicFormInput = DynamicFormInput>
  extends DynamicFormFieldDefinition<DynamicFormControlTemplate<FormInput>> {}
