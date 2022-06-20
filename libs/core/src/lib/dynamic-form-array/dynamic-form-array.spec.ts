import { FormArray, FormControl } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../testing';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayValidator } from './dynamic-form-array-validator';

describe('DynamicFormArray', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
    builder.getFieldId.and.returnValue('fieldId');
  });

  it('creates instance', () => {
    const definition = { id: 'id', key: 'key', index: 1, type: 'componentType', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);

    expect(formArray.root).toBe(form);
    expect(formArray.parent).toBe(form);
    expect(formArray.parentField).toBe(form);

    expect(formArray.definition).toBe(definition);
    expect(formArray.template).toBe(definition.template);

    expect(formArray.id).toBe('id');
    expect(formArray.key).toBe('key');
    expect(formArray.index).toBe(1);
    expect(formArray.classType).toBe('field');
    expect(formArray.fieldClassType).toBe('array');
    expect(formArray.componentType).toBe('componentType');

    expect(formArray.model).toEqual([]);
    expect(formArray.value).toEqual([]);
    expect(formArray.valid).toBeTrue();
    expect(formArray.status).toBe('VALID');
    expect(formArray.control).toBeInstanceOf(FormArray);

    expect(formArray.children).toEqual([]);
    expect(formArray.headerActions).toEqual([]);
    expect(formArray.footerActions).toEqual([]);

    expect(form.model).toEqual({ key: [] });
  });

  it('sets model to default value', () => {
    const defaultValue = [ { value: 0 }, { value: 1 } ];
    const definition = { key: 'key', template: {}, defaultValue } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);

    expect(formArray.model).toEqual(defaultValue);
  });

  it('sets model to default length', () => {
    const definition = { key: 'key', template: {}, defaultLength: 2 } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);

    expect(formArray.model).toEqual([ undefined, undefined ]);
  });

  it('returns expression data with id, key, index and model', () => {
    const definition = { id: 'id', key: 'key', index: 1, type: 'componentType', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);

    expect(formArray.expressionData.id).toBe('id');
    expect(formArray.expressionData.key).toBe('key');
    expect(formArray.expressionData.index).toBe(1);
    expect(formArray.expressionData.model).toEqual([]);
    expect(formArray.expressionData.length).toEqual(0);
  });

  it('init calls calls initId, initExpressions, initChildren, initValidators, initHeaderActions and initFooterActions', () => {
    const root = { classType: 'field', model: {} } as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { key: 'key', template: {}, children: [], headerActions: [], footerActions: [] } as DynamicFormArrayDefinition;
    const formArray = new DynamicFormArray(builder, root, parent, definition);

    const initIdSpy = spyOn(formArray as any, 'initId').and.callThrough();
    const initExpressionsSpy = spyOn(formArray as any, 'initExpressions').and.callThrough();
    const getExpressionsSpy = spyOn(formArray as any, 'getExpressions').and.callThrough();
    const initChildrenSpy = spyOn(formArray as any, 'initChildren').and.callThrough();
    const getChildrenSpy = spyOn(formArray as any, 'getChildren').and.callThrough();
    const initValidatorsSpy = spyOn(formArray as any, 'initValidators').and.callThrough();
    const getValidatorsSpy = spyOn(formArray as any, 'getValidators').and.callThrough();
    const initHeaderActionsSpy = spyOn(formArray as any, 'initHeaderActions').and.callThrough();
    const getHeaderActionsSpy = spyOn(formArray as any, 'getHeaderActions').and.callThrough();
    const initFooterActionsSpy = spyOn(formArray as any, 'initFooterActions').and.callThrough();
    const getFooterActionsSpy = spyOn(formArray as any, 'getFooterActions').and.callThrough();

    formArray.init();

    expect(initIdSpy).toHaveBeenCalledTimes(1);
    expect(builder.getFieldId).toHaveBeenCalledOnceWith(formArray);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFieldExpressions).toHaveBeenCalledOnceWith(formArray);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormArrayElements).toHaveBeenCalledOnceWith(formArray);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createArrayValidators).toHaveBeenCalledOnceWith(formArray);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, formArray, definition.headerActions);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, formArray, definition.footerActions);
  });

  it('inits children and fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl() },
      { classType: 'field', definition: {}, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    builder.createFormArrayElements.and.returnValue(fields);

    formArray.init();

    expect(formArray.length).toBe(2);
    expect(formArray.children).toBe(fields);
  });

  it('inits children and fields with empty array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);

    builder.createFormArrayElements.and.returnValue(null);

    formArray.init();

    expect(formArray.length).toBe(0);
    expect(formArray.children).toEqual([]);
  });

  it('inits validators', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const validators = [{}] as DynamicFormArrayValidator[];

    builder.createArrayValidators.and.returnValue(validators);

    formArray.init();

    expect(formArray.validators).toBe(validators);
  });

  it('pushes field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl() },
      { classType: 'field', definition: {}, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];
    const field = { classType: 'field', definition: {}, control: new FormControl() } as unknown as DynamicFormField;

    spyOn(formArray.control, 'push');

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    formArray.init();
    formArray.pushField(field);

    expect(formArray.length).toBe(3);
    expect(formArray.children.length).toBe(3);
    expect(formArray.children[0]).toBe(fields[0]);
    expect(formArray.children[1]).toBe(fields[1]);
    expect(formArray.children[2]).toBe(field);
    expect(formArray.control.push).toHaveBeenCalledWith(field.control);
  });

  it('pops field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(formArray.control, 'removeAt');
    spyOn(formArray.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    formArray.init();
    formArray.popField();

    expect(formArray.length).toBe(1);
    expect(formArray.children.length).toBe(1);
    expect(formArray.children[0]).toBe(fields[0]);
    expect(formArray.control.removeAt).toHaveBeenCalledWith(1);
    expect(formArray.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).not.toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
  });

  it('does not pop field if length is zero', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);

    spyOn(formArray.children, 'pop');
    spyOn(formArray.model, 'pop');
    spyOn(formArray.control, 'removeAt');
    spyOn(formArray.control, 'markAsTouched');

    formArray.popField();

    expect(formArray.children.pop).not.toHaveBeenCalled();
    expect(formArray.model.pop).not.toHaveBeenCalled();
    expect(formArray.control.removeAt).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('removes field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(formArray.control, 'removeAt');
    spyOn(formArray.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(fields[2], 'destroy');
    spyOn(fields[3], 'destroy');

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    formArray.init();
    formArray.removeField(1);

    expect(formArray.length).toBe(3);
    expect(formArray.children.length).toBe(3);
    expect(formArray.children[0]).toBe(fields[0]);
    expect(formArray.children[0].definition.index).toBe(0);
    expect(formArray.children[1]).toBe(fields[2]);
    expect(formArray.children[1].definition.index).toBe(1);
    expect(formArray.children[2]).toBe(fields[3]);
    expect(formArray.children[2].definition.index).toBe(2);
    expect(formArray.control.removeAt).toHaveBeenCalledWith(1);
    expect(formArray.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).not.toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
    expect(fields[2].destroy).not.toHaveBeenCalled();
    expect(fields[3].destroy).not.toHaveBeenCalled();
  });

  it('does not remove field if index is invalid', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);

    spyOn(formArray.children, 'splice');
    spyOn(formArray.model, 'splice');
    spyOn(formArray.control, 'removeAt');
    spyOn(formArray.control, 'markAsTouched');

    formArray.removeField(1);

    expect(formArray.children.splice).not.toHaveBeenCalled();
    expect(formArray.model.splice).not.toHaveBeenCalled();
    expect(formArray.control.removeAt).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('clears fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(formArray.control, 'clear');
    spyOn(formArray.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    formArray.init();
    formArray.clearFields();

    expect(formArray.length).toBe(0);
    expect(formArray.children).toEqual([]);
    expect(formArray.control.clear).toHaveBeenCalled();
    expect(formArray.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
  });

  it('does not clear fields if length is zero', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);

    spyOn(formArray.control, 'clear');
    spyOn(formArray.control, 'markAsTouched');

    formArray.clearFields();

    expect(formArray.control.clear).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('moves field down', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() },
      { classType: 'field', definition: { index: 1 }, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    formArray.init();

    spyOn(formArray.control, 'removeAt').and.callThrough();
    spyOn(formArray.control, 'insert').and.callThrough();
    spyOn(formArray.control, 'markAsTouched');

    formArray.moveFieldDown(0);

    expect(formArray.children).toEqual([ fields[1], fields[0] ]);
    expect(formArray.children[0].definition.index).toBe(0);
    expect(formArray.children[1].definition.index).toBe(1);
    expect(formArray.control.removeAt).toHaveBeenCalledWith(0);
    expect(formArray.control.insert).toHaveBeenCalledWith(1, fields[0].control);
    expect(formArray.control.markAsTouched).toHaveBeenCalled();
  });

  it('does not move field down', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    formArray.init();

    spyOn(formArray.control, 'removeAt').and.callThrough();
    spyOn(formArray.control, 'insert').and.callThrough();
    spyOn(formArray.control, 'markAsTouched');

    formArray.moveFieldDown(0);

    expect(formArray.children).toEqual([ fields[0] ]);
    expect(formArray.control.removeAt).not.toHaveBeenCalled();
    expect(formArray.control.insert).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('moves field up', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() },
      { classType: 'field', definition: { index: 1 }, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    formArray.init();

    spyOn(formArray.control, 'removeAt').and.callThrough();
    spyOn(formArray.control, 'insert').and.callThrough();
    spyOn(formArray.control, 'markAsTouched');

    formArray.moveFieldUp(1);

    expect(formArray.children).toEqual([ fields[1], fields[0] ]);
    expect(formArray.control.removeAt).toHaveBeenCalledWith(1);
    expect(formArray.control.insert).toHaveBeenCalledWith(0, fields[1].control);
    expect(formArray.control.markAsTouched).toHaveBeenCalled();
  });

  it('does not move field up', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    builder.createFormArrayElements.and.returnValue(fields);

    formArray.init();

    spyOn(formArray.control, 'removeAt').and.callThrough();
    spyOn(formArray.control, 'insert').and.callThrough();
    spyOn(formArray.control, 'markAsTouched');

    formArray.moveFieldUp(0);

    expect(formArray.children).toEqual([ fields[0] ]);
    expect(formArray.control.removeAt).not.toHaveBeenCalled();
    expect(formArray.control.insert).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('check calls check of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    builder.createFormArrayElements.and.returnValue(fields);

    formArray.init();
    formArray.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormArrayElements.and.returnValue(fields);

    formArray.init();
    formArray.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    builder.createFormArrayElements.and.returnValue(fields);

    formArray.init();
    formArray.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetEmpty calls destroy of all fields and clear of form array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(formArray.control, 'clear');

    builder.createFormArrayElements.and.returnValue(fields);

    formArray.init();
    formArray.resetEmpty();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
    expect(formArray.control.clear).toHaveBeenCalledTimes(1);
    expect(formArray.children).toEqual([]);
  });

  it('resetDefault calls destroy of all fields and clear of form array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(formArray.control, 'clear');

    builder.createFormArrayElements.and.returnValue(fields);

    formArray.init();
    formArray.resetDefault();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
    expect(formArray.control.clear).toHaveBeenCalledTimes(1);
  });

  it('validate calls validate of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    builder.createFormArrayElements.and.returnValue(fields);

    formArray.init();
    formArray.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
