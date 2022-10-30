import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';

export const dynamicFormItemsFactory = (
  builder: DynamicFormBuilder,
  root: DynamicForm,
  parent: DynamicFormElement,
  definition: DynamicFormItemsDefinition,
  type: DynamicFormElementType,
): DynamicFormItems => {
  const items = new DynamicFormItems(builder, root, parent, definition, type);
  items.init();
  return items;
};
