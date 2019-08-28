import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';
import { DynamicFormGroupValidation } from './dynamic-form-group-validation';

export interface DynamicFormGroupDefinition extends DynamicFormFieldDefinition<DynamicFormGroupTemplate> {
  validation?: DynamicFormGroupValidation;
  fields: DynamicFormFieldDefinition[];
}
