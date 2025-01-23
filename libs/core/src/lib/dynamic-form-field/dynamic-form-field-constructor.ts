import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldType } from './dynamic-form-field-type';

export type DynamicFormFieldConstructor<Field extends DynamicFormField> = new (
  builder: DynamicFormBuilder,
  root: DynamicForm,
  parent: DynamicFormElement,
  definition: DynamicFormFieldDefinition,
  type: DynamicFormFieldType,
) => Field;
