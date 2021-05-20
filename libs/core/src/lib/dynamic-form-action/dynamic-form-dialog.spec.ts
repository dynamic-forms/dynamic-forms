import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../testing';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormDialog } from './dynamic-form-dialog';

describe('DynamicFormDialog', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
  });

  it('creates instance', () => {
    const root = {} as DynamicForm;
    const action = { root } as DynamicFormAction;
    const definition = { template: {}, children: [] } as DynamicFormDefinition;
    const dialog = new DynamicFormDialog(builder, action, definition, {});

    expect(dialog.root).toBe(dialog);
    expect(dialog.parent).toBeNull();
    expect(dialog.parentField).toBeNull();

    expect(dialog.children).toEqual([]);
    expect(dialog.headerActions).toEqual([]);
    expect(dialog.footerActions).toEqual([]);
  });

  it('init calls calls initId, initExpressions, initChildren, initValidators, initHeaderActions and initFooterActions', () => {
    const root = {} as DynamicForm;
    const action = { root } as DynamicFormAction;
    const definition = { template: {}, children: [], headerActions: [], footerActions: [] } as DynamicFormDefinition;
    const dialog = new DynamicFormDialog(builder, action, definition, {});

    const initIdSpy = spyOn(dialog as any, 'initId').and.callThrough();
    const getIdSpy = spyOn(dialog as any, 'getId').and.callThrough();
    const initExpressionsSpy = spyOn(dialog as any, 'initExpressions').and.callThrough();
    const getExpressionsSpy = spyOn(dialog as any, 'getExpressions').and.callThrough();
    const initChildrenSpy = spyOn(dialog as any, 'initChildren').and.callThrough();
    const getChildrenSpy = spyOn(dialog as any, 'getChildren').and.callThrough();
    const initValidatorsSpy = spyOn(dialog as any, 'initValidators').and.callThrough();
    const getValidatorsSpy = spyOn(dialog as any, 'getValidators').and.callThrough();
    const initHeaderActionsSpy = spyOn(dialog as any, 'initHeaderActions').and.callThrough();
    const getHeaderActionsSpy = spyOn(dialog as any, 'getHeaderActions').and.callThrough();
    const initFooterActionsSpy = spyOn(dialog as any, 'initFooterActions').and.callThrough();
    const getFooterActionsSpy = spyOn(dialog as any, 'getFooterActions').and.callThrough();

    dialog.init();

    expect(initIdSpy).toHaveBeenCalled();
    expect(getIdSpy).not.toHaveBeenCalled();
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFieldExpressions).toHaveBeenCalledOnceWith(dialog);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormElements).toHaveBeenCalledOnceWith(dialog, dialog, definition.children);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createGroupValidators).toHaveBeenCalledTimes(1);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, action, definition.headerActions);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, action, definition.footerActions);
  });
});
