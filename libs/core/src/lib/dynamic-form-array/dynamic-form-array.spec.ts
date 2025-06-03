import { FormArray, FormControl } from '@angular/forms';
import { MockService } from 'ng-mocks';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayValidator } from './dynamic-form-array-validator';

describe('DynamicFormArray', () => {
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder, { getFieldId: () => 'fieldId' });
  });

  it('creates instance', () => {
    const definition = { id: 'id', key: 'key', index: 1, type: 'type', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const type = { type: 'type' } as DynamicFormFieldType;
    const array = new DynamicFormArray(builder, form, form, definition, type);

    expect(array.root).toBe(form);
    expect(array.parent).toBe(form);
    expect(array.parentField).toBe(form);

    expect(array.definition).toBe(definition);
    expect(array.template).toBe(definition.template);
    expect(array.type).toBe(type);

    expect(array.id).toBe('id');
    expect(array.key).toBe('key');
    expect(array.index).toBe(1);
    expect(array.classType).toBe('field');
    expect(array.fieldClassType).toBe('array');

    expect(array.model).toEqual([]);
    expect(array.value).toEqual([]);
    expect(array.valid).toBeTrue();
    expect(array.status).toBe('VALID');
    expect(array.control).toBeInstanceOf(FormArray);

    expect(array.children).toEqual([]);
    expect(array.headerActions).toEqual([]);
    expect(array.footerActions).toEqual([]);

    expect(form.model).toEqual({ key: [] });
  });

  it('sets model to default value', () => {
    const defaultValue = [{ value: 0 }, { value: 1 }];
    const definition = { key: 'key', template: {}, defaultValue } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    expect(array.model).toEqual(defaultValue);
  });

  it('sets model to default length', () => {
    const definition = { key: 'key', template: {}, defaultLength: 2 } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    expect(array.model).toEqual([undefined, undefined]);
  });

  it('returns expression data with id, key, index and model', () => {
    const definition = { id: 'id', key: 'key', index: 1, type: 'componentType', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    expect(array.expressionData.id).toBe('id');
    expect(array.expressionData.key).toBe('key');
    expect(array.expressionData.index).toBe(1);
    expect(array.expressionData.model).toEqual([]);
    expect(array.expressionData.length).toEqual(0);
  });

  it('init calls calls initId, initExpressions, initChildren, initValidators, initHeaderActions and initFooterActions', () => {
    const root = { classType: 'field', model: {} } as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { key: 'key', template: {}, children: [], headerActions: [], footerActions: [] } as DynamicFormArrayDefinition;
    const array = new DynamicFormArray(builder, root, parent, definition, {} as DynamicFormFieldType);

    const getFieldIdSpy = spyOn(builder, 'getFieldId').and.callThrough();
    const createExpressionsSpy = spyOn(builder, 'createFieldExpressions').and.callThrough();
    const createElementsSpy = spyOn(builder, 'createFormArrayElements').and.callThrough();
    const createValidatorsSpy = spyOn(builder, 'createArrayValidators').and.callThrough();
    const createActionsSpy = spyOn(builder, 'createFormActions').and.callThrough();

    const initIdSpy = spyOn(array as any, 'initId').and.callThrough();
    const initExpressionsSpy = spyOn(array as any, 'initExpressions').and.callThrough();
    const getExpressionsSpy = spyOn(array as any, 'getExpressions').and.callThrough();
    const initChildrenSpy = spyOn(array as any, 'initChildren').and.callThrough();
    const getChildrenSpy = spyOn(array as any, 'getChildren').and.callThrough();
    const initValidatorsSpy = spyOn(array as any, 'initValidators').and.callThrough();
    const getValidatorsSpy = spyOn(array as any, 'getValidators').and.callThrough();
    const initHeaderActionsSpy = spyOn(array as any, 'initHeaderActions').and.callThrough();
    const getHeaderActionsSpy = spyOn(array as any, 'getHeaderActions').and.callThrough();
    const initFooterActionsSpy = spyOn(array as any, 'initFooterActions').and.callThrough();
    const getFooterActionsSpy = spyOn(array as any, 'getFooterActions').and.callThrough();

    array.init();

    expect(initIdSpy).toHaveBeenCalledTimes(1);
    expect(getFieldIdSpy).toHaveBeenCalledOnceWith(array);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(createExpressionsSpy).toHaveBeenCalledOnceWith(array);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(createElementsSpy).toHaveBeenCalledOnceWith(array);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(createValidatorsSpy).toHaveBeenCalledOnceWith(array);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(createActionsSpy).toHaveBeenCalledWith(root, array, definition.headerActions);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(createActionsSpy).toHaveBeenCalledWith(root, array, definition.footerActions);
  });

  it('inits children and fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl() },
      { classType: 'field', definition: {}, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    spyOn(builder, 'createFormArrayElements').and.returnValue(fields);

    array.init();

    expect(array.length).toBe(2);
    expect(array.children).toBe(fields);
  });

  it('inits children and fields with empty array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    spyOn(builder, 'createFormArrayElements').and.returnValue(null);

    array.init();

    expect(array.length).toBe(0);
    expect(array.children).toEqual([]);
  });

  it('inits validators', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const validators = [{}] as DynamicFormArrayValidator[];

    spyOn(builder, 'createArrayValidators').and.returnValue(validators);

    array.init();

    expect(array.validators).toBe(validators);
  });

  it('pushes field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl() },
      { classType: 'field', definition: {}, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];
    const field = { classType: 'field', definition: {}, control: new FormControl() } as unknown as DynamicFormField;

    const pushControlSpy = spyOn(array.control, 'push');

    spyOn(builder, 'createFormArrayElements').and.returnValue([...fields]);

    array.init();
    array.pushField(field);

    expect(array.length).toBe(3);
    expect(array.children.length).toBe(3);
    expect(array.children[0]).toBe(fields[0]);
    expect(array.children[1]).toBe(fields[1]);
    expect(array.children[2]).toBe(field);
    expect(pushControlSpy).toHaveBeenCalledWith(field.control);
  });

  it('pops field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    const removeControlSpy = spyOn(array.control, 'removeAt');
    const touchControlSpy = spyOn(array.control, 'markAsTouched');
    const destroyField0Spy = spyOn(fields[0], 'destroy');
    const destroyField1Spy = spyOn(fields[1], 'destroy');

    spyOn(builder, 'createFormArrayElements').and.returnValue([...fields]);

    array.init();
    array.popField();

    expect(array.length).toBe(1);
    expect(array.children.length).toBe(1);
    expect(array.children[0]).toBe(fields[0]);
    expect(removeControlSpy).toHaveBeenCalledWith(1);
    expect(touchControlSpy).toHaveBeenCalled();
    expect(destroyField0Spy).not.toHaveBeenCalled();
    expect(destroyField1Spy).toHaveBeenCalled();
  });

  it('does not pop field if length is zero', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    spyOn(array.children, 'pop');
    spyOn(array.model, 'pop');
    const removeControlSpy = spyOn(array.control, 'removeAt');
    const touchControlSpy = spyOn(array.control, 'markAsTouched');

    array.popField();

    expect(array.children.pop).not.toHaveBeenCalled();
    expect(array.model.pop).not.toHaveBeenCalled();
    expect(removeControlSpy).not.toHaveBeenCalled();
    expect(touchControlSpy).not.toHaveBeenCalled();
  });

  it('removes field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    const removeControlSpy = spyOn(array.control, 'removeAt');
    const touchControlSpy = spyOn(array.control, 'markAsTouched');
    const destoryField0Spy = spyOn(fields[0], 'destroy');
    const destoryField1Spy = spyOn(fields[1], 'destroy');
    const destoryField2Spy = spyOn(fields[2], 'destroy');
    const destoryField3Spy = spyOn(fields[3], 'destroy');

    spyOn(builder, 'createFormArrayElements').and.returnValue([...fields]);

    array.init();
    array.removeField(1);

    expect(array.length).toBe(3);
    expect(array.children.length).toBe(3);
    expect(array.children[0]).toBe(fields[0]);
    expect(array.children[0].definition.index).toBe(0);
    expect(array.children[1]).toBe(fields[2]);
    expect(array.children[1].definition.index).toBe(1);
    expect(array.children[2]).toBe(fields[3]);
    expect(array.children[2].definition.index).toBe(2);
    expect(removeControlSpy).toHaveBeenCalledWith(1);
    expect(touchControlSpy).toHaveBeenCalled();
    expect(destoryField0Spy).not.toHaveBeenCalled();
    expect(destoryField1Spy).toHaveBeenCalled();
    expect(destoryField2Spy).not.toHaveBeenCalled();
    expect(destoryField3Spy).not.toHaveBeenCalled();
  });

  it('does not remove field if index is invalid', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    spyOn(array.children, 'splice');
    spyOn(array.model, 'splice');
    const removeControlSpy = spyOn(array.control, 'removeAt');
    const touchControlSpy = spyOn(array.control, 'markAsTouched');

    array.removeField(1);

    expect(array.children.splice).not.toHaveBeenCalled();
    expect(array.model.splice).not.toHaveBeenCalled();
    expect(removeControlSpy).not.toHaveBeenCalled();
    expect(touchControlSpy).not.toHaveBeenCalled();
  });

  it('clears fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    const clearControlSpy = spyOn(array.control, 'clear');
    const touchControlSpy = spyOn(array.control, 'markAsTouched');
    const destroyField0Spy = spyOn(fields[0], 'destroy');
    const destroyField1Spy = spyOn(fields[1], 'destroy');

    spyOn(builder, 'createFormArrayElements').and.returnValue([...fields]);

    array.init();
    array.clearFields();

    expect(array.length).toBe(0);
    expect(array.children).toEqual([]);
    expect(clearControlSpy).toHaveBeenCalled();
    expect(touchControlSpy).toHaveBeenCalled();
    expect(destroyField0Spy).toHaveBeenCalled();
    expect(destroyField1Spy).toHaveBeenCalled();
  });

  it('does not clear fields if length is zero', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    const clearControlSpy = spyOn(array.control, 'clear');
    const touchControlSpy = spyOn(array.control, 'markAsTouched');

    array.clearFields();

    expect(clearControlSpy).not.toHaveBeenCalled();
    expect(touchControlSpy).not.toHaveBeenCalled();
  });

  it('moves field down', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() },
      { classType: 'field', definition: { index: 1 }, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    spyOn(builder, 'createFormArrayElements').and.returnValue([...fields]);

    array.init();

    const removeControlSpy = spyOn(array.control, 'removeAt').and.callThrough();
    const insertControlSpy = spyOn(array.control, 'insert').and.callThrough();
    const touchControlSpy = spyOn(array.control, 'markAsTouched');

    array.moveFieldDown(0);

    expect(array.children).toEqual([fields[1], fields[0]]);
    expect(array.children[0].definition.index).toBe(0);
    expect(array.children[1].definition.index).toBe(1);
    expect(removeControlSpy).toHaveBeenCalledWith(0);
    expect(insertControlSpy).toHaveBeenCalledWith(1, fields[0].control);
    expect(touchControlSpy).toHaveBeenCalled();
  });

  it('does not move field down', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [{ classType: 'field', definition: { index: 0 }, control: new FormControl() }] as unknown[] as DynamicFormField[];

    spyOn(builder, 'createFormArrayElements').and.returnValue([...fields]);

    array.init();

    const removeControlSpy = spyOn(array.control, 'removeAt').and.callThrough();
    const insertControlSpy = spyOn(array.control, 'insert').and.callThrough();
    const touchControlSpy = spyOn(array.control, 'markAsTouched');

    array.moveFieldDown(0);

    expect(array.children).toEqual([fields[0]]);
    expect(removeControlSpy).not.toHaveBeenCalled();
    expect(insertControlSpy).not.toHaveBeenCalled();
    expect(touchControlSpy).not.toHaveBeenCalled();
  });

  it('moves field up', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() },
      { classType: 'field', definition: { index: 1 }, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    spyOn(builder, 'createFormArrayElements').and.returnValue([...fields]);

    array.init();

    const removeControlSpy = spyOn(array.control, 'removeAt').and.callThrough();
    const insertControlSpy = spyOn(array.control, 'insert').and.callThrough();
    const touchControlSpy = spyOn(array.control, 'markAsTouched');

    array.moveFieldUp(1);

    expect(array.children).toEqual([fields[1], fields[0]]);
    expect(removeControlSpy).toHaveBeenCalledWith(1);
    expect(insertControlSpy).toHaveBeenCalledWith(0, fields[1].control);
    expect(touchControlSpy).toHaveBeenCalled();
  });

  it('does not move field up', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [{ classType: 'field', definition: { index: 0 }, control: new FormControl() }] as unknown[] as DynamicFormField[];

    spyOn(builder, 'createFormArrayElements').and.returnValue(fields);

    array.init();

    const removeControlSpy = spyOn(array.control, 'removeAt').and.callThrough();
    const insertControlSpy = spyOn(array.control, 'insert').and.callThrough();
    const touchControlSpy = spyOn(array.control, 'markAsTouched');

    array.moveFieldUp(0);

    expect(array.children).toEqual([fields[0]]);
    expect(removeControlSpy).not.toHaveBeenCalled();
    expect(insertControlSpy).not.toHaveBeenCalled();
    expect(touchControlSpy).not.toHaveBeenCalled();
  });

  it('check calls check of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
    ] as unknown[] as DynamicFormField[];

    const checkField0Spy = spyOn(fields[0], 'check');
    const checkField1Spy = spyOn(fields[1], 'check');

    spyOn(builder, 'createFormArrayElements').and.returnValue(fields);

    array.init();
    array.check();

    expect(checkField0Spy).toHaveBeenCalledTimes(1);
    expect(checkField1Spy).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    const destroyField0Spy = spyOn(fields[0], 'destroy');
    const destroyField1Spy = spyOn(fields[1], 'destroy');

    spyOn(builder, 'createFormArrayElements').and.returnValue(fields);

    array.init();
    array.destroy();

    expect(destroyField0Spy).toHaveBeenCalledTimes(1);
    expect(destroyField1Spy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
    ] as unknown[] as DynamicFormField[];

    const resetField0Spy = spyOn(fields[0], 'reset');
    const resetField1Spy = spyOn(fields[1], 'reset');

    spyOn(builder, 'createFormArrayElements').and.returnValue(fields);

    array.init();
    array.reset();

    expect(resetField0Spy).toHaveBeenCalledTimes(1);
    expect(resetField1Spy).toHaveBeenCalledTimes(1);
  });

  it('resetEmpty calls destroy of all fields and clear of form array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    const destroyField0Spy = spyOn(fields[0], 'destroy');
    const destroyField1Spy = spyOn(fields[1], 'destroy');
    const clearControlSpy = spyOn(array.control, 'clear');

    spyOn(builder, 'createFormArrayElements').and.returnValue(fields);

    array.init();
    array.resetEmpty();

    expect(destroyField0Spy).toHaveBeenCalledTimes(1);
    expect(destroyField1Spy).toHaveBeenCalledTimes(1);
    expect(clearControlSpy).toHaveBeenCalledTimes(1);
    expect(array.children).toEqual([]);
  });

  it('resetDefault calls destroy of all fields and clear of form array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    const destroyField0Spy = spyOn(fields[0], 'destroy');
    const destroyField1Spy = spyOn(fields[1], 'destroy');
    const clearControlSpy = spyOn(array.control, 'clear');

    spyOn(builder, 'createFormArrayElements').and.returnValue(fields);

    array.init();
    array.resetDefault();

    expect(destroyField0Spy).toHaveBeenCalledTimes(1);
    expect(destroyField1Spy).toHaveBeenCalledTimes(1);
    expect(clearControlSpy).toHaveBeenCalledTimes(1);
  });

  it('validate calls validate of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
    ] as unknown[] as DynamicFormField[];

    const validateField0Spy = spyOn(fields[0], 'validate');
    const validateField1Spy = spyOn(fields[1], 'validate');

    spyOn(builder, 'createFormArrayElements').and.returnValue(fields);

    array.init();
    array.validate();

    expect(validateField0Spy).toHaveBeenCalledTimes(1);
    expect(validateField1Spy).toHaveBeenCalledTimes(1);
  });
});
