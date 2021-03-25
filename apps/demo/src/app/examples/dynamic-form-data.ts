import { DynamicFormDefinition } from '@dynamic-forms/core';
import { Example } from '../state/examples/examples.model';

export interface DynamicFormData {
  example: Example;
  definition: DynamicFormDefinition;
  model: any;
}
