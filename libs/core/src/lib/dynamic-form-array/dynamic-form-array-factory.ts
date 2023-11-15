import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';

export const dynamicFormArrayFactory = (
  builder: DynamicFormBuilder,
  root: DynamicForm,
  parent: DynamicFormField,
  definition: DynamicFormArrayDefinition,
): DynamicFormArray => builder.createFormArray(root, parent, definition);
