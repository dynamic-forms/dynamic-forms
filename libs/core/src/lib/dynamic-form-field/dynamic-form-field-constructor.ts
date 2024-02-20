import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldType } from './dynamic-form-field-type';

export interface DynamicFormFieldConstructor<Field extends DynamicFormField> {
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  new (
    builder: DynamicFormBuilder,
    root: DynamicForm,
    parent: DynamicFormElement,
    definition: DynamicFormFieldDefinition,
    type: DynamicFormFieldType,
  ): Field;
}
