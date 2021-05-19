import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldExpressionData } from '../dynamic-form-field/dynamic-form-field-expression-data';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../testing';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionExpression } from './dynamic-form-action-expression';
import { DynamicFormActionExpressions } from './dynamic-form-action-expressions';

describe('DynamicFormAction', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
    builder.getActionId.and.returnValue('actionId');
  });

  it('creates instance', () => {
    const root = { classType: 'field' } as DynamicForm;
    const parent = { classType: 'field' } as DynamicFormField;
    const definition = { id: 'id', type: 'componentType', template: {}, children: [] } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, root, parent, definition);

    expect(action.root).toBe(root);
    expect(action.parent).toBe(parent);
    expect(action.parentField).toBe(parent);

    expect(action.id).toBe('id');
    expect(action.classType).toBe('action');
    expect(action.componentType).toBe('componentType');
    expect(action.definition).toBe(definition);
    expect(action.template).toBe(definition.template);

    expect(action.children).toEqual([]);

    expect(action.expressions).toEqual({});
    expect(action.expressionData).toBeTruthy();

    expect(action.dialogOpen).toBeFalse();
    expect(action.dialogOpenChanges).toBeTruthy();

    expect(action.dialogDefinition).toBeUndefined();
    expect(() => action.dialogTemplate).toThrow();

    expect(action.dialog).toBeUndefined();
    expect(() => action.dialogChildren).toThrow();
    expect(() => action.dialogHeaderActions).toThrow();
    expect(() => action.dialogFooterActions).toThrow();
  });

  it('returns expression data with expression data of parent, root and dialog being undefined', () => {
    const definition = { template: {} } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, null, null, definition);

    expect(action.expressionData.parent).toBeUndefined();
    expect(action.expressionData.root).toBeUndefined();
    expect(action.expressionData.dialog).toBeUndefined();
  });

  it('returns expression data with expression data of parent, root and dialog being defined', () => {
    const rootExpressionData = {} as DynamicFormFieldExpressionData;
    const parentExpressionData = {} as DynamicFormFieldExpressionData;
    const dailogExpressionData = {} as DynamicFormFieldExpressionData;
    const root = { expressionData: rootExpressionData } as DynamicForm;
    const parent = { expressionData: parentExpressionData } as DynamicFormField;
    const definition = {
      template: {},
      dialogDefinition: { template: {} }
    } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, root, parent, definition);

    builder.createFieldExpressions.and.returnValue(dailogExpressionData);

    action.init();

    expect(action.expressionData.parent).toEqual(parentExpressionData);
    expect(action.expressionData.root).toEqual(rootExpressionData);
    expect(action.expressionData.dialog).toEqual(dailogExpressionData);
  });

  it('init calls initId, initExpressions and initChildren', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {} } as DynamicFormActionDefinition;
    const formAction = new DynamicFormAction(builder, root, parent, definition);

    const initIdSpy = spyOn(formAction as any, 'initId').and.callThrough();
    const getIdSpy = spyOn(formAction as any, 'getId').and.callThrough();
    const initExpressionsSpy = spyOn(formAction as any, 'initExpressions').and.callThrough();
    const getExpressionsSpy = spyOn(formAction as any, 'getExpressions').and.callThrough();
    const initChildrenSpy = spyOn(formAction as any, 'initChildren').and.callThrough();
    const getChildrenSpy = spyOn(formAction as any, 'getChildren').and.callThrough();

    formAction.init();

    expect(initIdSpy).toHaveBeenCalledTimes(1);
    expect(getIdSpy).toHaveBeenCalledTimes(1);
    expect(builder.getActionId).toHaveBeenCalledOnceWith(formAction);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createActionExpressions).toHaveBeenCalledOnceWith(formAction);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
  });

  it('inits expressions', () => {
    const definition = { template: {} } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, null, null, definition);
    const actionExpressions = {
      'hidden': { value: true } as DynamicFormActionExpression,
      'disabled': { value: false } as DynamicFormActionExpression
    } as DynamicFormActionExpressions;

    builder.createActionExpressions.and.returnValue(actionExpressions);

    action.init();

    expect(action.expressions).toBe(actionExpressions);
    expect(action.template['hidden']).toBe(true);
    expect(action.template['disabled']).toBe(false);
  });

  it('inits dialog', () => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, null, null, definition);

    action.init();

    expect(action.dialogOpen).toBeFalse();
    expect(action.dialogOpenChanges).toBeTruthy();

    expect(action.dialogDefinition).toBe(dialogDefinition);
    expect(action.dialogTemplate).toBe(dialogDefinition.template);

    expect(action.dialog).toBeTruthy();
    expect(action.dialog.definition).toBe(dialogDefinition);
    expect(action.dialog.template).toBe(dialogDefinition.template);

    expect(action.dialogChildren).toEqual([]);
    expect(action.dialogHeaderActions).toEqual([]);
    expect(action.dialogFooterActions).toEqual([]);
  });

  it('open, close and toggle dialog do not throw if no dialog', () => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, null, null, definition);

    expect(() => action.openDialog()).not.toThrow();
    expect(() => action.closeDialog()).not.toThrow();
    expect(() => action.toggleDialog()).not.toThrow();
  });

  it('opens, closes and toggles dialog', (done) => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, null, null, definition);

    const dialogOpenChanges = [];
    action.dialogOpenChanges.subscribe({
      next: (open) => dialogOpenChanges.push(open)
    });

    action.init();
    action.openDialog();

    expect(action.dialogOpen).toBeTrue();

    action.closeDialog();

    expect(action.dialogOpen).toBeFalse();

    action.toggleDialog();

    expect(action.dialogOpen).toBeTrue();

    expect(dialogOpenChanges).toEqual([ false, true, false, true ]);

    done();
  });

  it('dialogOpenChange ', (done) => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, null, null, definition);

    const dialogOpenChanges = [];
    action.dialogOpenChanges.subscribe({
      next: (open) => dialogOpenChanges.push(open)
    });

    action.init();

    action.closeDialog();
    action.closeDialog();
    action.openDialog();
    action.openDialog();
    action.closeDialog();
    action.closeDialog();

    expect(dialogOpenChanges).toEqual([ false, true, false ]);

    done();
  });

  it('does not open, close or toggle dialog', (done) => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, null, null, definition);

    const dialogOpenChanges = [];
    action.dialogOpenChanges.subscribe({
      next: (open) => dialogOpenChanges.push(open)
    });

    action.openDialog();
    action.closeDialog();
    action.toggleDialog();

    expect(action.dialogOpen).toBeFalse();
    expect(dialogOpenChanges).toEqual([ false ]);

    done();
  });
});
