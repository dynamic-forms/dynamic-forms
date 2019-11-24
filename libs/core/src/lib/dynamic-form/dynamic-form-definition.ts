import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';

export interface DynamicFormDefinition extends DynamicFormFieldDefinition {
  elements: DynamicFormElementDefinition[];
}
