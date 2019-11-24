import { DynamicFormElementDefinition } from '../dynamic-form-element-definition';
import { DynamicFormContainerTemplate } from './dynamic-form-container-template';

export interface DynamicFormContainerDefinition extends DynamicFormElementDefinition<DynamicFormContainerTemplate> {
  elements: DynamicFormElementDefinition[];
}
