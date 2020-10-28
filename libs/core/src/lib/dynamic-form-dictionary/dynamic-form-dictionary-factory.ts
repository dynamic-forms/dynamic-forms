import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';

export function dynamicFormDictionaryFactory(
  builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormField, definition: DynamicFormDictionaryDefinition
): DynamicFormDictionary {
  return builder.createFormDictionary(root, parent, definition);
}
