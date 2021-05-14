import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';

export function dynamicFormItemsFactory(
  builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormItemsDefinition
): DynamicFormItems {
  const items = new DynamicFormItems(builder, root, parent, definition);
  items.initExpressions(builder.createElementExpressions(items));
  items.initChildren(items.definition.children.map((childDefinition, index) => {
    const itemDefinition = { ...builder.getDefinition(childDefinition, root), index };
    const item = new DynamicFormItem(builder, root, items, itemDefinition);
    item.initExpressions(builder.createElementExpressions(item));
    item.initChildren(builder.createFormElements(root, parent, itemDefinition.children));
    return item;
  }));
  return items;
}
