import { DynamicFormElementDefinition } from '../dynamic-form-element-definition';
import { DynamicFormMarkdownOptions } from './dynamic-form-markdown-options';
import { DynamicFormMarkdownTemplate } from './dynamic-form-markdown-template';

export interface DynamicFormMarkdownDefinition<
  Template extends DynamicFormMarkdownTemplate = DynamicFormMarkdownTemplate
> extends DynamicFormElementDefinition<Template> {
  options?: DynamicFormMarkdownOptions;
  children?: undefined;
}
