import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';

export const dynamicFormDictionaryFactory = (
  builder: DynamicFormBuilder,
  root: DynamicForm,
  parent: DynamicFormField,
  definition: DynamicFormDictionaryDefinition,
): DynamicFormDictionary => builder.createFormDictionary(root, parent, definition);
