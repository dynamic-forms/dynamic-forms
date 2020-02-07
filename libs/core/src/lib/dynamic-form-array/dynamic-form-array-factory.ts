import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';

export function dynamicFormArrayFactory(
  builder: DynamicFormBuilder, root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormArrayDefinition
) {
  return builder.createFormArray(root, parent, definition);
}
