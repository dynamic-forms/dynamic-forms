import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItemDefinition } from './dynamic-form-item-definition';

describe('DynamicFormItem', () => {
  it('creates instance', () => {
    const template = { label: 'label', disabled: true };
    const definition = <DynamicFormItemDefinition>{ id: 'id', type: 'type', index: 1, template, elements: [] };
    const formItem = new DynamicFormItem(definition);

    expect(formItem.id).toBe('id');
    expect(formItem.classType).toBe('element');
    expect(formItem.componentType).toBe('type');
    expect(formItem.definition).toBe(definition);
    expect(formItem.template).toBe(definition.template);
    expect(formItem.elements).toEqual([]);
    expect(formItem.index).toBe(1);
    expect(formItem.label).toBe('label');
    expect(formItem.disabled).toBe(true);
  });

  it('inits elements', () => {
    const definition = <DynamicFormItemDefinition>{ type: 'type', template: {}, elements: [] };
    const formItem = new DynamicFormItem(definition);
    const elements = [
      <DynamicFormElement>{ classType: 'element', definition: {} }
    ];

    formItem.initElements(elements);

    expect(formItem.elements).toEqual(elements);
  });

  it('inits elements with empty array', () => {
    const definition = <DynamicFormItemDefinition>{ type: 'type', template: {}, elements: [] };
    const formItem = new DynamicFormItem(definition);

    formItem.initElements(null);

    expect(formItem.elements).toEqual([]);
  });

  it('returns expression data with index', () => {
    const definition = <DynamicFormItemDefinition>{ id: 'id', type: 'type', index: 1 };
    const formItem = new DynamicFormItem(definition);

    expect(formItem.expressionData.index).toBe(1);
  });
});
