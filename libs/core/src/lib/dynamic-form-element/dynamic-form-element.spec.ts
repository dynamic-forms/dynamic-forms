import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldExpressionData } from '../dynamic-form-field/dynamic-form-field-expression-data';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';

describe('DynamicFormElement', () => {
  it('creates instance', () => {
    const definition = { id: 'id', type: 'type', template: {}, children: [] } as DynamicFormElementDefinition;
    const formElement = new DynamicFormElement(null, null, definition);

    expect(formElement.root).toBeNull();
    expect(formElement.parent).toBeNull();
    expect(formElement.parentField).toBeNull();

    expect(formElement.definition).toBe(definition);
    expect(formElement.template).toBe(definition.template);

    expect(formElement.id).toBe('id');
    expect(formElement.classType).toBe('element');
    expect(formElement.componentType).toBe('type');

    expect(formElement.children).toEqual([]);
  });

  it('creates instance with root', () => {
    const root = { classType: 'field' } as DynamicForm;
    const formElement = new DynamicFormElement(root, null, {} as DynamicFormElementDefinition);

    expect(formElement.root).toBe(root);
    expect(formElement.parent).toBeNull();
    expect(formElement.parentField).toBe(root);
  });

  it('creates instance with root and parent', () => {
    const root = { classType: 'field' } as DynamicForm;
    const parent = { classType: 'element' } as DynamicFormElement;
    const formElement = new DynamicFormElement(root, parent, {} as DynamicFormElementDefinition);

    expect(formElement.root).toBe(root);
    expect(formElement.parent).toBe(parent);
    expect(formElement.parentField).toBe(root);
  });

  it('creates instance with root, parent and parent field', () => {
    const root = { classType: 'field' } as DynamicForm;
    const parentField = { classType: 'field' } as DynamicFormField;
    const parent = { classType: 'element', parent: parentField as DynamicFormElement } as DynamicFormElement;
    const formElement = new DynamicFormElement(root, parent, {} as DynamicFormElementDefinition);

    expect(formElement.root).toBe(root);
    expect(formElement.parent).toBe(parent);
    expect(formElement.parentField).toBe(parentField);
  });

  it('returns expression data with expression data of root, parent and parent field being undefined', () => {
    const formElement = new DynamicFormElement(null, null, {} as DynamicFormElementDefinition);

    expect(formElement.expressionData.root).toBeUndefined();
    expect(formElement.expressionData.parent).toBeUndefined();
    expect(formElement.expressionData.parentField).toBeUndefined();
  });

  it('returns expression data with expression data of root, parent and parent field being defined', () => {
    const rootExpressionData = {} as DynamicFormFieldExpressionData;
    const parentFieldExpressionData = {} as DynamicFormFieldExpressionData;
    const parentExpressionData = {} as DynamicFormElementExpressionData;

    const root = { classType: 'field', expressionData: rootExpressionData } as DynamicForm;
    const parentField = { classType: 'field', expressionData: parentFieldExpressionData } as DynamicFormField;
    const parent = { parent: parentField  as DynamicFormElement, expressionData: parentExpressionData } as DynamicFormElement;
    const formElement = new DynamicFormElement(root, parent, {} as DynamicFormElementDefinition);

    expect(formElement.expressionData.root).toBe(rootExpressionData);
    expect(formElement.expressionData.parent).toBe(parentExpressionData);
    expect(formElement.expressionData.parentField).toBe(parentFieldExpressionData);
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
