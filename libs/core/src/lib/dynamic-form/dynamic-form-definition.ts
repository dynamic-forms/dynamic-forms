import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';

export interface DynamicFormDefinition extends DynamicFormFieldDefinition {
  fields: DynamicFormFieldDefinition[];
}
