import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export interface DynamicFormElementDefinition<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate
> {
  key?: string;
  type?: string;
  template?: Template;
}
