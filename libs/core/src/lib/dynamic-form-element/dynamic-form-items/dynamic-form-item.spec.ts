import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItemDefinition } from './dynamic-form-item-definition';

describe('DynamicFormItem', () => {
  it('creates instance', () => {
    const template = { label: 'label', disabled: true };
    const definition = { id: 'id', type: 'type', index: 1, template, children: [] } as DynamicFormItemDefinition;
    const formItem = new DynamicFormItem(definition);

    expect(formItem.id).toBe('id');
    expect(formItem.classType).toBe('element');
    expect(formItem.componentType).toBe('type');
    expect(formItem.definition).toBe(definition);
    expect(formItem.template).toBe(definition.template);
    expect(formItem.children).toEqual([]);
    expect(formItem.index).toBe(1);
    expect(formItem.label).toBe('label');
    expect(formItem.disabled).toBe(true);
  });

  it('inits children', () => {
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormItemDefinition;
    const formItem = new DynamicFormItem(definition);
    const children = [
      { classType: 'element', definition: {} } as DynamicFormElement
    ];

    formItem.initChildren(children);

    expect(formItem.children).toEqual(children);
  });

  it('inits children with empty array', () => {
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormItemDefinition;
    const formItem = new DynamicFormItem(definition);

    formItem.initChildren(null);

    expect(formItem.children).toEqual([]);
  });

  it('returns expression data with index', () => {
    const definition = { id: 'id', type: 'type', index: 1 } as DynamicFormItemDefinition;
    const formItem = new DynamicFormItem(definition);

    expect(formItem.expressionData.index).toBe(1);
  });
});
