import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';

export function dynamicFormControlFactory(
  builder: DynamicFormBuilder, root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormControlDefinition
): DynamicFormControl {
  return builder.createFormControl(root, parent, definition);
}

