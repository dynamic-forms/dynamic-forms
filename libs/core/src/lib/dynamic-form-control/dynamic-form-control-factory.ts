import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';

export function dynamicFormControlFactory(
  builder: DynamicFormBuilder, root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormControlDefinition
) {
  return builder.createFormControl(root, parent, definition);
}

