import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';

export const dynamicFormItemsFactory = (
  builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormItemsDefinition,
): DynamicFormItems => {
  const items = new DynamicFormItems(builder, root, parent, definition);
  items.init();
  return items;
};
