import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';

describe('DynamicFormElement', () => {
  it('new instance', () => {
    const definition = <DynamicFormElementDefinition>{ id: 'id', type: 'type', template: {}, elements: [] };
    const formElement = new DynamicFormElement(definition);

    expect(formElement.id).toBe('id');
    expect(formElement.classType).toBe('element');
    expect(formElement.componentType).toBe('type');
    expect(formElement.definition).toBe(definition);
    expect(formElement.template).toBe(definition.template);
    expect(formElement.elements).toEqual([]);
  });

  it('sets elements', () => {
    const definition = <DynamicFormElementDefinition>{ type: 'type', template: {}, elements: [] };
    const formElement = new DynamicFormElement(definition);
    const elements = [
      <DynamicFormElement>{ classType: 'element', definition: {} }
    ];

    formElement.initElements(elements);

    expect(formElement.elements).toEqual(elements);
  });

  it('sets elements to empty array', () => {
    const definition = <DynamicFormElementDefinition>{ type: 'type', template: {}, elements: [] };
    const formElement = new DynamicFormElement(definition);

    formElement.initElements(null);

    expect(formElement.elements).toEqual([]);
  });
});
