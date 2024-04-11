import { DynamicFormDefinition } from '@dynamic-forms/core';

export interface FormData<TModel = any> {
  definition: DynamicFormDefinition;
  model: TModel;
}
