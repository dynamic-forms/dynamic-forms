import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';
import { DynamicFormGroupValidation } from './dynamic-form-group-validation';

export interface DynamicFormGroupDefinition<
  Template extends DynamicFormGroupTemplate = DynamicFormGroupTemplate
> extends DynamicFormFieldDefinition<Template> {
  elements: DynamicFormElementDefinition[];
  validation?: DynamicFormGroupValidation;
  defaultValue?: any;
}
