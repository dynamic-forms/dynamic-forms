import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';

describe('DynamicFormElement', () => {
  it('creates instance', () => {
    const root = { classType: 'field' } as DynamicForm;
    const parent = { classType: 'element' } as DynamicFormElement;
    const definition = { id: 'id', type: 'type', template: {}, children: [] } as DynamicFormElementDefinition;
    const formElement = new DynamicFormElement(root, parent, definition);

    expect(formElement.root).toBe(root);
    expect(formElement.parent).toBe(parent);
    expect(formElement.parentField).toBe(root);

    expect(formElement.definition).toBe(definition);
    expect(formElement.template).toBe(definition.template);

    expect(formElement.id).toBe('id');
    expect(formElement.classType).toBe('element');
    expect(formElement.componentType).toBe('type');

    expect(formElement.children).toEqual([]);
  });

  it('inits children', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormElementDefinition;
    const formElement = new DynamicFormElement(root, parent, definition);
    const children = [
      { classType: 'element', definition: {} } as DynamicFormElement
    ];

    formElement.initChildren(children);

    expect(formElement.children).toBe(children);
  });

  it('inits children with empty array', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormElementDefinition;
    const formElement = new DynamicFormElement(root, parent, definition);

    formElement.initChildren(null);

    expect(formElement.children).toEqual([]);
  });
});
