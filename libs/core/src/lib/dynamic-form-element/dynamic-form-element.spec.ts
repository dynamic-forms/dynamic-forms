import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';

describe('DynamicFormElement', () => {
  it('creates instance', () => {
    const definition = <DynamicFormElementDefinition>{ id: 'id', type: 'type', template: {}, children: [] };
    const formElement = new DynamicFormElement(definition);

    expect(formElement.id).toBe('id');
    expect(formElement.classType).toBe('element');
    expect(formElement.componentType).toBe('type');
    expect(formElement.definition).toBe(definition);
    expect(formElement.template).toBe(definition.template);
    expect(formElement.children).toEqual([]);
  });

  it('inits children', () => {
    const definition = <DynamicFormElementDefinition>{ type: 'type', template: {}, children: [] };
    const formElement = new DynamicFormElement(definition);
    const children = [
      <DynamicFormElement>{ classType: 'element', definition: {} }
    ];

    formElement.initChildren(children);

    expect(formElement.children).toBe(children);
  });

  it('inits children with empty array', () => {
    const definition = <DynamicFormElementDefinition>{ type: 'type', template: {}, children: [] };
    const formElement = new DynamicFormElement(definition);

    formElement.initChildren(null);

    expect(formElement.children).toEqual([]);
  });
});
