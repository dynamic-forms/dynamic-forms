import { DynamicFormElementTemplate } from '../dynamic-form-element-template';

export interface DynamicFormContainerTemplate extends DynamicFormElementTemplate {
  orientation?: 'row' | 'column';
}
