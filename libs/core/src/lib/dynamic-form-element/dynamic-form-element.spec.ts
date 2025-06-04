import { MockService } from 'ng-mocks';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldExpressionData } from '../dynamic-form-field/dynamic-form-field-expression-data';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementExpression } from './dynamic-form-element-expression';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';
import { DynamicFormElementExpressions } from './dynamic-form-element-expressions';
import { DynamicFormElementType } from './dynamic-form-element-type';

describe('DynamicFormElement', () => {
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder);
  });

  it('creates instance with root', () => {
    const root = {} as DynamicForm;
    const definition = { id: 'id', type: 'type', template: { hidden: true }, children: [] } as DynamicFormElementDefinition;
    const type = { type: 'type' } as DynamicFormElementType;
    const element = new DynamicFormElement(builder, root, root, definition, type);

    expect(element.root).toBe(root);
    expect(element.parent).toBe(root);
    expect(element.parentField).toBe(root);

    expect(element.definition).toBe(definition);
    expect(element.template).toBe(definition.template);
    expect(element.type).toBe(type);

    expect(element.classType).toBe('element');

    expect(element.id).toBe('id');
    expect(element.hidden).toBeTrue();

    expect(element.children).toEqual([]);
  });

  it('creates instance with root and parent', () => {
    const root = { classType: 'field' } as DynamicForm;
    const parent = { classType: 'element' } as DynamicFormElement;
    const element = new DynamicFormElement(builder, root, parent, {} as DynamicFormElementDefinition, {} as DynamicFormElementType);

    expect(element.root).toBe(root);
    expect(element.parent).toBe(parent);
    expect(element.parentField).toBe(root);
  });

  it('creates instance with root, parent and parent field', () => {
    const root = { classType: 'field' } as DynamicForm;
    const parentField = { classType: 'field' } as DynamicFormField;
    const parent = { classType: 'element', parent: parentField as DynamicFormElement } as DynamicFormElement;
    const element = new DynamicFormElement(builder, root, parent, {} as DynamicFormElementDefinition, {} as DynamicFormElementType);

    expect(element.root).toBe(root);
    expect(element.parent).toBe(parent);
    expect(element.parentField).toBe(parentField);
  });

  it('returns expression data with expression data of root, parent and parent field being defined', () => {
    const rootExpressionData = {} as DynamicFormFieldExpressionData;
    const parentFieldExpressionData = {} as DynamicFormFieldExpressionData;
    const parentExpressionData = {} as DynamicFormElementExpressionData;

    const root = { classType: 'field', expressionData: rootExpressionData } as DynamicForm;
    const parentField = { classType: 'field', expressionData: parentFieldExpressionData } as DynamicFormField;
    const parent = { parent: parentField as DynamicFormElement, expressionData: parentExpressionData } as DynamicFormElement;
    const element = new DynamicFormElement(builder, root, parent, {} as DynamicFormElementDefinition, {} as DynamicFormElementType);

    expect(element.expressionData.root).toBe(rootExpressionData);
    expect(element.expressionData.parent).toBe(parentExpressionData);
    expect(element.expressionData.parentField).toBe(parentFieldExpressionData);
  });

  it('returns expression data with expression data of parent being undefined', () => {
    const root = { classType: 'field', expressionData: {} } as DynamicForm;
    const element = new DynamicFormElement(builder, root, null, {} as DynamicFormElementDefinition, {} as DynamicFormElementType);

    expect(element.expressionData.parent).toBeUndefined();
  });

  it('init calls initId, initExpressions and initChildren', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormElementDefinition;
    const element = new DynamicFormElement(builder, root, parent, definition, {} as DynamicFormElementType);

    const createExpressionsSpy = spyOn(builder, 'createElementExpressions').and.callThrough();
    const createElementsSpy = spyOn(builder, 'createFormElements').and.callThrough();

    const initIdSpy = spyOn(element as any, 'initId').and.callThrough();
    const initExpressionsSpy = spyOn(element as any, 'initExpressions').and.callThrough();
    const getExpressionsSpy = spyOn(element as any, 'getExpressions').and.callThrough();
    const initChildrenSpy = spyOn(element as any, 'initChildren').and.callThrough();
    const getChildrenSpy = spyOn(element as any, 'getChildren').and.callThrough();

    element.init();

    expect(initIdSpy).toHaveBeenCalledTimes(1);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(createExpressionsSpy).toHaveBeenCalledOnceWith(element);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(createElementsSpy).toHaveBeenCalledOnceWith(root, element, definition.children);
  });

  it('inits expressions', () => {
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormElementDefinition;
    const element = new DynamicFormElement(builder, null, null, definition, {} as DynamicFormElementType);
    const expressions = {
      className: { value: 'class-name' } as DynamicFormElementExpression,
    } as DynamicFormElementExpressions;

    spyOn(builder, 'createElementExpressions').and.returnValue(expressions);

    element.init();

    expect(element.expressions).toBe(expressions);
    expect(element.template.className).toBe('class-name');
  });

  it('inits expressions with empty object', () => {
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormElementDefinition;
    const element = new DynamicFormElement(builder, null, null, definition, {} as DynamicFormElementType);

    spyOn(builder, 'createElementExpressions').and.returnValue(null);

    element.init();

    expect(element.expressions).toEqual({});
  });

  it('inits children', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormElementDefinition;
    const element = new DynamicFormElement(builder, root, parent, definition, {} as DynamicFormElementType);
    const children = [{ classType: 'element', definition: {} } as DynamicFormElement];

    spyOn(builder, 'createFormElements').and.returnValue(children);

    element.init();

    expect(element.children).toBe(children);
  });

  it('inits children with empty array', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormElementDefinition;
    const element = new DynamicFormElement(builder, root, parent, definition, {} as DynamicFormElementType);

    spyOn(builder, 'createFormElements').and.returnValue(null);

    element.init();

    expect(element.children).toEqual([]);
  });
});
