import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';

describe('DynamicFormElement', () => {
  it('creates instance', () => {
    const definition = <DynamicFormElementDefinition>{ id: 'id', type: 'type', template: {}, elements: [] };
    const formElement = new DynamicFormElement(definition);

    expect(formElement.id).toBe('id');
    expect(formElement.classType).toBe('element');
    expect(formElement.componentType).toBe('type');
    expect(formElement.definition).toBe(definition);
    expect(formElement.template).toBe(definition.template);
    expect(formElement.elements).toEqual([]);
  });

  it('inits elements', () => {
    const definition = <DynamicFormElementDefinition>{ type: 'type', template: {}, elements: [] };
    const formElement = new DynamicFormElement(definition);
    const elements = [
      <DynamicFormElement>{ classType: 'element', definition: {} }
    ];

    formElement.initElements(elements);

    expect(formElement.elements).toBe(elements);
  });

  it('inits elements with empty array', () => {
    const definition = <DynamicFormElementDefinition>{ type: 'type', template: {}, elements: [] };
    const formElement = new DynamicFormElement(definition);

    formElement.initElements(null);

    expect(formElement.elements).toEqual([]);
  });
});
