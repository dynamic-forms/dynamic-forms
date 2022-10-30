import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../../testing';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItemDefinition } from './dynamic-form-item-definition';

describe('DynamicFormItem', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
  });

  it('creates instance', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const template = { label: 'label', disabled: true };
    const definition = { id: 'id', type: 'type', index: 1, template, children: [] } as DynamicFormItemDefinition;
    const type = {} as DynamicFormElementType;
    const item = new DynamicFormItem(builder, root, parent, definition, type);

    expect(item.root).toBe(root);
    expect(item.parent).toBe(parent);

    expect(item.definition).toBe(definition);
    expect(item.template).toBe(definition.template);

    expect(item.id).toBe('id');
    expect(item.classType).toBe('element');
    expect(item.componentType).toBe('type');

    expect(item.children).toEqual([]);
    expect(item.index).toBe(1);
    expect(item.label).toBe('label');
    expect(item.disabled).toBe(true);
  });

  it('inits children', () => {
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormItemDefinition;
    const item = new DynamicFormItem(builder, {} as DynamicForm, {} as DynamicFormElement, definition, {} as DynamicFormElementType);
    const children = [
      { classType: 'element', definition: {} } as DynamicFormElement,
    ];

    builder.createFormElements.and.returnValue(children);

    item.init();

    expect(item.children).toEqual(children);
  });

  it('inits children with empty array', () => {
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormItemDefinition;
    const item = new DynamicFormItem(builder, {} as DynamicForm, {} as DynamicFormElement, definition, {} as DynamicFormElementType);

    builder.createFormElements.and.returnValue(null);

    item.init();

    expect(item.children).toEqual([]);
  });

  it('returns expression data with index', () => {
    const definition = { id: 'id', type: 'type', index: 1 } as DynamicFormItemDefinition;
    const item = new DynamicFormItem(builder, {} as DynamicForm, {} as DynamicFormElement, definition, {} as DynamicFormElementType);

    expect(item.expressionData.index).toBe(1);
  });

  it('disabled returns true if disabled of template is true', () => {
    const definition = { id: 'id', type: 'type', index: 1, template: { disabled: true } } as DynamicFormItemDefinition;
    const item = new DynamicFormItem(builder, {} as DynamicForm, {} as DynamicFormElement, definition, {} as DynamicFormElementType);

    expect(item.disabled).toBeTruthy();
  });

  it('disabled returns false for index being 0 even if disabled of template is true', () => {
    const definition = { id: 'id', type: 'type', index: 0, template: { disabled: true } } as DynamicFormItemDefinition;
    const item = new DynamicFormItem(builder, {} as DynamicForm, {} as DynamicFormElement, definition, {} as DynamicFormElementType);

    expect(item.disabled).toBeFalsy();
  });
});
