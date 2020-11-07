import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormDictionaryTemplate } from './dynamic-form-dictionary-template';

export interface DynamicFormDictionaryDefinition<
  Template extends DynamicFormDictionaryTemplate = DynamicFormDictionaryTemplate
> extends DynamicFormFieldDefinition<Template> {
  definitionTemplate: DynamicFormFieldDefinition;
  defaultKeys?: string[];
  defaultValue?: any;
  elements: undefined;
  footerActions?: DynamicFormActionDefinition[];
}
