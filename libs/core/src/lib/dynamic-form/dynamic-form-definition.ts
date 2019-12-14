import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormTemplate } from './dynamic-form-template';

export interface DynamicFormDefinition extends DynamicFormFieldDefinition<DynamicFormTemplate> {
  elements: DynamicFormElementDefinition[];
}
