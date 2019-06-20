import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

export interface DynamicFormArrayDefinition extends DynamicFormFieldDefinition<DynamicFormArrayTemplate> {
  fields: DynamicFormFieldDefinition[];
}
