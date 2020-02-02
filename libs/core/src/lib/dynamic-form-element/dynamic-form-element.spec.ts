import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';

describe('DynamicFormElement', () => {
  it('new instance', () => {
    const definition = <DynamicFormElementDefinition>{ type: 'type', template: {}, elements: [] };
    const formElement = new DynamicFormElement(definition);

    expect(formElement.type).toBe('element');
    expect(formElement.definition).toBe(definition);
    expect(formElement.template).toBe(definition.template);
    expect(formElement.componentType).toBe('type');
    expect(formElement.elements).toEqual([]);
  });

  it('sets elements', () => {
    const definition = <DynamicFormElementDefinition>{ type: 'type', template: {}, elements: [] };
    const formElement = new DynamicFormElement(definition);
    const elements = [
      <DynamicFormElement>{ type: 'element', definition: {} }
    ];

    formElement.setElements(elements);

    expect(formElement.elements).toEqual(elements);
  });

  it('sets elements to empty array', () => {
    const definition = <DynamicFormElementDefinition>{ type: 'type', template: {}, elements: [] };
    const formElement = new DynamicFormElement(definition);

    formElement.setElements(null);

    expect(formElement.elements).toEqual([]);
  });
});
