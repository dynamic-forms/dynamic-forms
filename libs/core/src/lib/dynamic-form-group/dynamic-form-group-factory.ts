import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';

export function dynamicFormGroupFactory(
  builder: DynamicFormBuilder, root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormGroupDefinition
) {
  return builder.createFormGroup(root, parent, definition);
}

