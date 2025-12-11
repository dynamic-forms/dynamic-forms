import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

export interface DynamicFormArrayDefinition<
  Value = any,
  Template extends DynamicFormArrayTemplate = DynamicFormArrayTemplate,
> extends DynamicFormFieldDefinition<Value[], Template> {
  definitionTemplate: DynamicFormFieldDefinition;
  defaultLength?: number;
  children?: undefined;
  footerActions?: DynamicFormActionDefinition[];
}
