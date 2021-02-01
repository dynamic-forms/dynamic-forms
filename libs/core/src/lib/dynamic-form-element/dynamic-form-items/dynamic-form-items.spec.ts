import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';

describe('DynamicFormItems', () => {
  it('creates instance', () => {
    const definition = <DynamicFormItemsDefinition>{ id: 'id', type: 'type', template: {}, children: [] };
    const formItems = new DynamicFormItems(definition);

    expect(formItems.id).toBe('id');
    expect(formItems.classType).toBe('element');
    expect(formItems.componentType).toBe('type');
    expect(formItems.definition).toBe(definition);
    expect(formItems.template).toBe(definition.template);
    expect(formItems.children).toEqual([]);
    expect(formItems.items).toEqual([]);
    expect(formItems.selectedIndex).toBeUndefined();
    expect(formItems.selectedItem).toBeUndefined();
  });

  it('inits children', () => {
    const definition = <DynamicFormItemsDefinition>{ id: 'id', type: 'type', template: {} };
    const formItems = new DynamicFormItems(definition);
    const items = [
      <DynamicFormItem>{ classType: 'element', definition: {} },
      <DynamicFormItem>{ classType: 'element', definition: {} }
    ];

    formItems.initChildren(items);

    expect(formItems.items).toBe(items);
    expect(formItems.children).toBe(items);
    expect(formItems.selectedIndex).toBe(0);
    expect(formItems.selectedItem).toBe(items[0]);
  });

  it('inits children with empty array', () => {
    const definition = <DynamicFormItemsDefinition>{ id: 'id', type: 'type', template: {} };
    const formItems = new DynamicFormItems(definition);

    formItems.initChildren(null);

    expect(formItems.items).toEqual([]);
    expect(formItems.children).toEqual([]);
    expect(formItems.selectedIndex).toBeUndefined();
    expect(formItems.selectedItem).toBeUndefined();
  });

  it('selects first item being not disabled', () => {
    const definition = <DynamicFormItemsDefinition>{ id: 'id', type: 'type', template: {} };
    const formItems = new DynamicFormItems(definition);
    const items = [
      <DynamicFormItem>{ classType: 'element', definition: {}, disabled: true },
      <DynamicFormItem>{ classType: 'element', definition: {}, disabled: false }
    ];

    formItems.initChildren(items);

    expect(formItems.items).toBe(items);
    expect(formItems.children).toBe(items);
    expect(formItems.selectedIndex).toBe(1);
    expect(formItems.selectedItem).toBe(items[1]);
  });
});
