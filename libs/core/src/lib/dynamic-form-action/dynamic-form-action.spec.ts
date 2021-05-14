import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldExpressionData } from '../dynamic-form-field/dynamic-form-field-expression-data';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionExpression } from './dynamic-form-action-expression';
import { DynamicFormActionExpressions } from './dynamic-form-action-expressions';

describe('DynamicFormAction', () => {
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = {} as any;
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
    const dialogExpressionData = {} as DynamicFormFieldExpressionData;
    const root = { expressionData: rootExpressionData } as DynamicForm;
    const parent = { expressionData: parentExpressionData } as DynamicFormField;
    const dialog = { expressionData: dialogExpressionData } as DynamicForm;
    const definition = { template: {} } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, root, parent, definition);
    action.initDialog(dialog);

    expect(action.expressionData.parent).toEqual(parentExpressionData);
    expect(action.expressionData.root).toEqual(rootExpressionData);
    expect(action.expressionData.dialog).toEqual(dialogExpressionData);
  });

  it('inits expressions', () => {
    const definition = { template: {} } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, null, null, definition);
    const actionExpressions = {
      'hidden': { value: true } as DynamicFormActionExpression,
      'disabled': { value: false } as DynamicFormActionExpression
    } as DynamicFormActionExpressions;

    action.initExpressions(actionExpressions);

    expect(action.expressions).toBe(actionExpressions);
    expect(action.template['hidden']).toBe(true);
    expect(action.template['disabled']).toBe(false);
  });

  it('inits dialog', () => {
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = new DynamicFormAction(builder, null, null, definition);
    const dialog = new DynamicForm(builder, dialogDefinition, {});

    action.initDialog(dialog);

    expect(action.dialogOpen).toBeFalse();
    expect(action.dialogOpenChanges).toBeTruthy();

    expect(action.dialogDefinition).toBe(dialogDefinition);
    expect(action.dialogTemplate).toBe(dialogDefinition.template);

    expect(action.dialog).toBe(dialog);
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
    const dialog = new DynamicForm(builder, dialogDefinition, {});

    const dialogOpenChanges = [];
    action.dialogOpenChanges.subscribe(open => {
      dialogOpenChanges.push(open);
    });

    action.initDialog(dialog);
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
    const dialog = new DynamicForm(builder, dialogDefinition, {});

    const dialogOpenChanges = [];
    action.dialogOpenChanges.subscribe(open => {
      dialogOpenChanges.push(open);
    });

    action.initDialog(dialog);

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
    action.dialogOpenChanges.subscribe(open => {
      dialogOpenChanges.push(open);
    });

    action.openDialog();
    action.closeDialog();
    action.toggleDialog();

    expect(action.dialogOpen).toBeFalse();
    expect(dialogOpenChanges).toEqual([ false ]);

    done();
  });
});
