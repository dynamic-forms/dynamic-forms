import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../../testing';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';

describe('DynamicFormItems', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
    builder.getDefinition.and.callFake((definition) => definition);
  });

  it('creates instance', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { id: 'id', type: 'type', template: {}, children: [] } as DynamicFormItemsDefinition;
    const formItems = new DynamicFormItems(builder, root, parent, definition);

    expect(formItems.root).toBe(root);
    expect(formItems.parent).toBe(parent);

    expect(formItems.definition).toBe(definition);
    expect(formItems.template).toBe(definition.template);

    expect(formItems.id).toBe('id');
    expect(formItems.classType).toBe('element');
    expect(formItems.componentType).toBe('type');

    expect(formItems.children).toEqual([]);
    expect(formItems.selectedIndex).toBeUndefined();
    expect(formItems.selectedItem).toBeUndefined();
  });

  it('inits children', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = {
      id: 'id',
      type: 'type',
      template: {},
      children: [
        { template: {} },
        { template: {} },
      ],
    } as DynamicFormItemsDefinition;
    const formItems = new DynamicFormItems(builder, root, parent, definition);

    formItems.init();

    expect(formItems.children.length).toBe(2);
    expect(formItems.selectedIndex).toBe(0);
    expect(formItems.selectedItem).toBe(formItems.children[0]);
  });

  it('inits children with empty array', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { id: 'id', type: 'type', template: {} } as DynamicFormItemsDefinition;
    const formItems = new DynamicFormItems(builder, root, parent, definition);

    formItems.init();

    expect(formItems.children).toEqual([]);
    expect(formItems.selectedIndex).toBeUndefined();
    expect(formItems.selectedItem).toBeUndefined();
  });

  it('selects first item', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = {
      id: 'id',
      type: 'type',
      template: {},
      children: [
        { template: { disabled: false } },
        { template: { disabled: true } },
      ],
    } as DynamicFormItemsDefinition;
    const formItems = new DynamicFormItems(builder, root, parent, definition);

    formItems.init();

    expect(formItems.children.length).toBe(2);
    expect(formItems.selectedIndex).toBe(0);
    expect(formItems.selectedItem).toBe(formItems.children[0]);
  });

  it('does not select item being disabled', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = {
      id: 'id',
      type: 'type',
      template: {},
      children: [
        { template: { disabled: false } },
        { template: { disabled: true } },
      ],
    } as DynamicFormItemsDefinition;
    const formItems = new DynamicFormItems(builder, root, parent, definition);

    formItems.init();
    formItems.selectItem(1);

    expect(formItems.selectedIndex).toBe(0);
    expect(formItems.selectedItem).toBe(formItems.children[0]);
  });

  it('check selects first item if selected item gets disabled', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = {
      id: 'id',
      type: 'type',
      template: {},
      children: [
        { template: { disabled: false } },
        { template: { disabled: false } },
      ],
    } as DynamicFormItemsDefinition;
    const formItems = new DynamicFormItems(builder, root, parent, definition);

    formItems.init();
    formItems.selectItem(1);

    expect(formItems.selectedIndex).toBe(1);
    expect(formItems.selectedItem).toBe(formItems.children[1]);

    formItems.check();

    expect(formItems.selectedIndex).toBe(1);
    expect(formItems.selectedItem).toBe(formItems.children[1]);

    formItems.children[1].definition.template.disabled = true;

    formItems.check();

    expect(formItems.selectedIndex).toBe(0);
    expect(formItems.selectedItem).toBe(formItems.children[0]);
  });
});
