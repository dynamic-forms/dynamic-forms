import { DynamicFormActionExpression } from '../dynamic-form-expression/dynamic-form-action-expression';
import { DynamicFormActionExpressions } from '../dynamic-form-expression/dynamic-form-action-expressions';
import { DynamicFormFieldExpressionData } from '../dynamic-form-expression/dynamic-form-field-expression-data';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';

describe('DynamicFormAction', () => {
  it('creates instance', () => {
    const root = <DynamicForm>{};
    const parent = <DynamicFormField>{};
    const definition = <DynamicFormActionDefinition>{ id: 'id', type: 'componentType', template: {}, elements: [] };
    const action = new DynamicFormAction(root, parent, definition);

    expect(action.id).toBe('id');
    expect(action.classType).toBe('action');
    expect(action.componentType).toBe('componentType');
    expect(action.definition).toBe(definition);
    expect(action.template).toBe(definition.template);

    expect(action.root).toBe(root);
    expect(action.parent).toBe(parent);

    expect(action.elements).toEqual([]);

    expect(action.expressions).toEqual({});
    expect(action.expressionData).toBeTruthy();

    expect(action.dialogOpen).toBeFalse();
    expect(action.dialogOpenChanges).toBeDefined();

    expect(action.dialogDefinition).toBeUndefined();
    expect(() => action.dialogTemplate).toThrow();

    expect(action.dialog).toBeUndefined();
    expect(() => action.dialogElements).toThrow();
    expect(() => action.dialogHeaderActions).toThrow();
    expect(() => action.dialogFooterActions).toThrow();
  });

  it('returns expression data with expression data of parent and root being undefined', () => {
    const definition = <DynamicFormActionDefinition>{ template: {} };
    const action = new DynamicFormAction(null, null, definition);

    expect(action.expressionData.parent).toBeUndefined();
    expect(action.expressionData.root).toBeUndefined();
  });

  it('returns expression data with expression data of parent and root being defined', () => {
    const rootExpressionData = <DynamicFormFieldExpressionData>{};
    const parentExpressionData = <DynamicFormFieldExpressionData>{};
    const root = <DynamicForm>{ expressionData: rootExpressionData };
    const parent = <DynamicFormField>{ expressionData: parentExpressionData };
    const definition = <DynamicFormActionDefinition>{ template: {} };
    const action = new DynamicFormAction(root, parent, definition);

    expect(action.expressionData.parent).toEqual(parentExpressionData);
    expect(action.expressionData.root).toEqual(rootExpressionData);
  });

  it('inits expressions', () => {
    const definition = <DynamicFormActionDefinition>{ template: {} };
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

  it('inits dialog', () => {
    const dialogDefinition = <DynamicFormDefinition>{ template: {} };
    const definition = <DynamicFormActionDefinition>{ template: {}, dialogDefinition };
    const action = new DynamicFormAction(null, null, definition);
    const dialog = new DynamicForm(dialogDefinition, {});

    action.initDialog(dialog);

    expect(action.dialogOpen).toBeFalse();
    expect(action.dialogOpenChanges).toBeDefined();

    expect(action.dialogDefinition).toBe(dialogDefinition);
    expect(action.dialogTemplate).toBe(dialogDefinition.template);

    expect(action.dialog).toBe(dialog);
    expect(action.dialog.definition).toBe(dialogDefinition);
    expect(action.dialog.template).toBe(dialogDefinition.template);

    expect(action.dialogElements).toEqual([]);
    expect(action.dialogHeaderActions).toEqual([]);
    expect(action.dialogFooterActions).toEqual([]);
  });

  it('open, close, toggle and check dialog do not throw if no dialog', () => {
    const dialogDefinition = <DynamicFormDefinition>{ template: {} };
    const definition = <DynamicFormActionDefinition>{ template: {}, dialogDefinition };
    const action = new DynamicFormAction(null, null, definition);

    expect(() => action.openDialog()).not.toThrow();
    expect(() => action.closeDialog()).not.toThrow();
    expect(() => action.toggleDialog()).not.toThrow();
    expect(() => action.checkDialog()).not.toThrow();
  });

  it('opens, closes and toggles dialog', (done) => {
    const dialogDefinition = <DynamicFormDefinition>{ template: {} };
    const definition = <DynamicFormActionDefinition>{ template: {}, dialogDefinition };
    const action = new DynamicFormAction(null, null, definition);
    const dialog = new DynamicForm(dialogDefinition, {});

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
    const dialogDefinition = <DynamicFormDefinition>{ template: {} };
    const definition = <DynamicFormActionDefinition>{ template: {}, dialogDefinition };
    const action = new DynamicFormAction(null, null, definition);
    const dialog = new DynamicForm(dialogDefinition, {});

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
    const dialogDefinition = <DynamicFormDefinition>{ template: {} };
    const definition = <DynamicFormActionDefinition>{ template: {}, dialogDefinition };
    const action = new DynamicFormAction(null, null, definition);

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

  it('checks dialog', () => {
    const dialogDefinition = <DynamicFormDefinition>{ template: {} };
    const definition = <DynamicFormActionDefinition>{ template: {}, dialogDefinition };
    const action = new DynamicFormAction(null, null, definition);
    const dialog = new DynamicForm(dialogDefinition, {});

    spyOn(dialog, 'check');

    action.initDialog(dialog);
    action.openDialog();
    action.checkDialog();

    expect(dialog.check).toHaveBeenCalled();
  });

  it('does not check dialog if dialog is not open', () => {
    const dialogDefinition = <DynamicFormDefinition>{ type: 'componentType', template: {}, elements: [] };
    const definition = <DynamicFormActionDefinition>{ type: 'componentType', template: {}, elements: [], dialogDefinition };
    const action = new DynamicFormAction(null, null, definition);
    const dialog = new DynamicForm(dialogDefinition, {});

    spyOn(dialog, 'check');

    action.initDialog(dialog);
    action.checkDialog();

    expect(dialog.check).not.toHaveBeenCalled();
  });
});
