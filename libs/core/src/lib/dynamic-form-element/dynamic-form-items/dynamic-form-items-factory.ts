import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';

export function dynamicFormItemsFactory(
  builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormField, definition: DynamicFormItemsDefinition
): DynamicFormItems {
  const items = new DynamicFormItems(definition);
  items.initExpressions(builder.createElementExpressions(items));
  items.initElements(items.definition.items.map(itemDefinition => {
    const item = new DynamicFormItem(itemDefinition);
    item.initExpressions(builder.createElementExpressions(item));
    item.initElements(builder.createFormElements(root, parent, itemDefinition.elements));
    return item;
  }));
  return items;
}
