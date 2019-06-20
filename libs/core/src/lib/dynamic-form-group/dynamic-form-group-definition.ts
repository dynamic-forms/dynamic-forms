import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

export interface DynamicFormGroupDefinition extends DynamicFormFieldDefinition<DynamicFormGroupTemplate> {
  fields: DynamicFormFieldDefinition[];
}
