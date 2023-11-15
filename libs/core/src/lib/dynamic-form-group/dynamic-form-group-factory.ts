import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';

export const dynamicFormGroupFactory = (
  builder: DynamicFormBuilder,
  root: DynamicForm,
  parent: DynamicFormField,
  definition: DynamicFormGroupDefinition,
): DynamicFormGroup => builder.createFormGroup(root, parent, definition);
