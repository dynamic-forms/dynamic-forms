import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../../testing';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';

describe('DynamicFormItems', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
    builder.getDefinition.and.callFake(definition => definition);
  });

  it('creates instance', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { id: 'id', type: 'type', template: {}, children: [] } as DynamicFormItemsDefinition;
    const type = { type: 'type' } as DynamicFormElementType;
    const items = new DynamicFormItems(builder, root, parent, definition, type);

    expect(items.root).toBe(root);
    expect(items.parent).toBe(parent);

    expect(items.definition).toBe(definition);
    expect(items.template).toBe(definition.template);
    expect(items.type).toBe(type);

    expect(items.id).toBe('id');
    expect(items.classType).toBe('element');

    expect(items.children).toEqual([]);
    expect(items.selectedIndex).toBeUndefined();
    expect(items.selectedItem).toBeUndefined();
  });

  it('inits children', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = {
      id: 'id',
      type: 'type',
      template: {},
      children: [{ template: {} }, { template: {} }],
    } as DynamicFormItemsDefinition;
    const items = new DynamicFormItems(builder, root, parent, definition, {} as DynamicFormElementType);

    items.init();

    expect(items.children.length).toBe(2);
    expect(items.selectedIndex).toBe(0);
    expect(items.selectedItem).toBe(items.children[0]);
  });

  it('inits children with empty array', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { id: 'id', type: 'type', template: {} } as DynamicFormItemsDefinition;
    const items = new DynamicFormItems(builder, root, parent, definition, {} as DynamicFormElementType);

    items.init();

    expect(items.children).toEqual([]);
    expect(items.selectedIndex).toBeUndefined();
    expect(items.selectedItem).toBeUndefined();
  });

  it('selects first item', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = {
      id: 'id',
      type: 'type',
      template: {},
      children: [{ template: { disabled: false } }, { template: { disabled: true } }],
    } as DynamicFormItemsDefinition;
    const items = new DynamicFormItems(builder, root, parent, definition, {} as DynamicFormElementType);

    items.init();

    expect(items.children.length).toBe(2);
    expect(items.selectedIndex).toBe(0);
    expect(items.selectedItem).toBe(items.children[0]);
  });

  it('does not select item being disabled', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = {
      id: 'id',
      type: 'type',
      template: {},
      children: [{ template: { disabled: false } }, { template: { disabled: true } }],
    } as DynamicFormItemsDefinition;
    const items = new DynamicFormItems(builder, root, parent, definition, {} as DynamicFormElementType);

    items.init();
    items.selectItem(1);

    expect(items.selectedIndex).toBe(0);
    expect(items.selectedItem).toBe(items.children[0]);
  });

  it('check selects first item if selected item gets disabled', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = {
      id: 'id',
      type: 'type',
      template: {},
      children: [{ template: { disabled: false } }, { template: { disabled: false } }],
    } as DynamicFormItemsDefinition;
    const items = new DynamicFormItems(builder, root, parent, definition, {} as DynamicFormElementType);

    items.init();
    items.selectItem(1);

    expect(items.selectedIndex).toBe(1);
    expect(items.selectedItem).toBe(items.children[1]);

    items.check();

    expect(items.selectedIndex).toBe(1);
    expect(items.selectedItem).toBe(items.children[1]);

    items.children[1].definition.template.disabled = true;

    items.check();

    expect(items.selectedIndex).toBe(0);
    expect(items.selectedItem).toBe(items.children[0]);
  });
});
