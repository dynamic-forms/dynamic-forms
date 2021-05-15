import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../../testing';
import { DynamicFormElement } from '../dynamic-form-element';
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
    const formItem = new DynamicFormItem(builder, root, parent, definition);

    expect(formItem.root).toBe(root);
    expect(formItem.parent).toBe(parent);

    expect(formItem.definition).toBe(definition);
    expect(formItem.template).toBe(definition.template);

    expect(formItem.id).toBe('id');
    expect(formItem.classType).toBe('element');
    expect(formItem.componentType).toBe('type');

    expect(formItem.children).toEqual([]);
    expect(formItem.index).toBe(1);
    expect(formItem.label).toBe('label');
    expect(formItem.disabled).toBe(true);
  });

  it('inits children', () => {
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormItemDefinition;
    const formItem = new DynamicFormItem(builder, {} as DynamicForm, {} as DynamicFormElement, definition);
    const children = [
      { classType: 'element', definition: {} } as DynamicFormElement
    ];

    builder.createFormElements.and.returnValue(children);

    formItem.init();

    expect(formItem.children).toEqual(children);
  });

  it('inits children with empty array', () => {
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormItemDefinition;
    const formItem = new DynamicFormItem(builder, {} as DynamicForm, {} as DynamicFormElement, definition);

    builder.createFormElements.and.returnValue(null);

    formItem.init();

    expect(formItem.children).toEqual([]);
  });

  it('returns expression data with index', () => {
    const definition = { id: 'id', type: 'type', index: 1 } as DynamicFormItemDefinition;
    const formItem = new DynamicFormItem(builder, {} as DynamicForm, {} as DynamicFormElement, definition);

    expect(formItem.expressionData.index).toBe(1);
  });

  it('disabled returns true if disabled of template is true', () => {
    const definition = { id: 'id', type: 'type', index: 1, template: { disabled: true } } as DynamicFormItemDefinition;
    const formItem = new DynamicFormItem(builder, {} as DynamicForm, {} as DynamicFormElement, definition);

    expect(formItem.disabled).toBeTruthy();
  });

  it('disabled returns false for index being 0 even if disabled of template is true', () => {
    const definition = { id: 'id', type: 'type', index: 0, template: { disabled: true } } as DynamicFormItemDefinition;
    const formItem = new DynamicFormItem(builder, {} as DynamicForm, {} as DynamicFormElement, definition);

    expect(formItem.disabled).toBeFalsy();
  });
});
