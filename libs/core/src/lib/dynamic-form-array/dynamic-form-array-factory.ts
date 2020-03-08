import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';

export function dynamicFormArrayFactory(
  builder: DynamicFormBuilder, root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormArrayDefinition
): DynamicFormArray {
  return builder.createFormArray(root, parent, definition);
}
