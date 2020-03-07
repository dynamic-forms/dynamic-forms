import { DynamicFormActionExpression } from '../dynamic-form-expression/dynamic-form-action-expression';
import { DynamicFormActionExpressions } from '../dynamic-form-expression/dynamic-form-action-expressions';
import { DynamicFormFieldExpressionData } from '../dynamic-form-expression/dynamic-form-field-expression-data';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';

describe('DynamicFormAction', () => {
  it('new instance', () => {
    const root = <DynamicFormField>{};
    const parent = <DynamicFormField>{};
    const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: {}, elements: [] };
    const action = new DynamicFormAction(root, parent, definition);

    expect(action.root).toBe(root);
    expect(action.parent).toBe(parent);
    expect(action.definition).toBe(definition);
    expect(action.template).toBe(definition.template);

    expect(action.classType).toBe('action');
    expect(action.componentType).toBe('componentType');

    expect(action.elements).toEqual([]);

    expect(action.expressions).toEqual({});
    expect(action.expressionData).toBeTruthy();
  });

  it('returns expression data with expression data of parent and root being undefined', () => {
    const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: {}, elements: [] };
    const action = new DynamicFormAction(null, null, definition);

    expect(action.expressionData.parent).toBeUndefined();
    expect(action.expressionData.root).toBeUndefined();
  });

  it('returns expression data with expression data of parent and root being defined', () => {
    const rootExpressionData = <DynamicFormFieldExpressionData>{};
    const parentExpressionData = <DynamicFormFieldExpressionData>{};
    const root = <DynamicFormField>{ expressionData: rootExpressionData };
    const parent = <DynamicFormField>{ expressionData: parentExpressionData };
    const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: {}, elements: [] };
    const action = new DynamicFormAction(root, parent, definition);

    expect(action.expressionData.parent).toEqual(parentExpressionData);
    expect(action.expressionData.root).toEqual(rootExpressionData);
  });

  it('inits expressions', () => {
    const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: {}, elements: [] };
    const action = new DynamicFormAction(null, null, definition);
    const actionExpressions = <DynamicFormActionExpressions>{
      'hidden': <DynamicFormActionExpression>{ value: true },
      'disabled': <DynamicFormActionExpression>{ value: false }
    };

    action.initExpressions(actionExpressions);

    expect(action.expressions).toBe(actionExpressions);
    expect(action.template['hidden']).toBe(true);
    expect(action.template['disabled']).toBe(false);
  });
});
