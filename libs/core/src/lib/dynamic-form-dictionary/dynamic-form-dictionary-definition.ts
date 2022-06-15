import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormDictionaryTemplate } from './dynamic-form-dictionary-template';

export interface DynamicFormDictionaryDefinition<
  Value = any,
  Template extends DynamicFormDictionaryTemplate = DynamicFormDictionaryTemplate
> extends DynamicFormFieldDefinition<{ [key: string]: Value }, Template> {
  definitionTemplate: DynamicFormFieldDefinition;
  defaultKeys?: string[];
  children?: undefined;
  footerActions?: DynamicFormActionDefinition[];
}
