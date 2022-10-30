import { FormArray, FormControl } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
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
    const type = {} as DynamicFormFieldType;
    const array = new DynamicFormArray(builder, form, form, definition, type);

    expect(array.root).toBe(form);
    expect(array.parent).toBe(form);
    expect(array.parentField).toBe(form);

    expect(array.definition).toBe(definition);
    expect(array.template).toBe(definition.template);

    expect(array.id).toBe('id');
    expect(array.key).toBe('key');
    expect(array.index).toBe(1);
    expect(array.classType).toBe('field');
    expect(array.fieldClassType).toBe('array');
    expect(array.componentType).toBe('componentType');

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
    const defaultValue = [ { value: 0 }, { value: 1 } ];
    const definition = { key: 'key', template: {}, defaultValue } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    expect(array.model).toEqual(defaultValue);
  });

  it('sets model to default length', () => {
    const definition = { key: 'key', template: {}, defaultLength: 2 } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    expect(array.model).toEqual([ undefined, undefined ]);
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
    expect(builder.getFieldId).toHaveBeenCalledOnceWith(array);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFieldExpressions).toHaveBeenCalledOnceWith(array);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormArrayElements).toHaveBeenCalledOnceWith(array);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createArrayValidators).toHaveBeenCalledOnceWith(array);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, array, definition.headerActions);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, array, definition.footerActions);
  });

  it('inits children and fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl() },
      { classType: 'field', definition: {}, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    builder.createFormArrayElements.and.returnValue(fields);

    array.init();

    expect(array.length).toBe(2);
    expect(array.children).toBe(fields);
  });

  it('inits children and fields with empty array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    builder.createFormArrayElements.and.returnValue(null);

    array.init();

    expect(array.length).toBe(0);
    expect(array.children).toEqual([]);
  });

  it('inits validators', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const validators = [{}] as DynamicFormArrayValidator[];

    builder.createArrayValidators.and.returnValue(validators);

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

    spyOn(array.control, 'push');

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    array.init();
    array.pushField(field);

    expect(array.length).toBe(3);
    expect(array.children.length).toBe(3);
    expect(array.children[0]).toBe(fields[0]);
    expect(array.children[1]).toBe(fields[1]);
    expect(array.children[2]).toBe(field);
    expect(array.control.push).toHaveBeenCalledWith(field.control);
  });

  it('pops field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(array.control, 'removeAt');
    spyOn(array.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    array.init();
    array.popField();

    expect(array.length).toBe(1);
    expect(array.children.length).toBe(1);
    expect(array.children[0]).toBe(fields[0]);
    expect(array.control.removeAt).toHaveBeenCalledWith(1);
    expect(array.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).not.toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
  });

  it('does not pop field if length is zero', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    spyOn(array.children, 'pop');
    spyOn(array.model, 'pop');
    spyOn(array.control, 'removeAt');
    spyOn(array.control, 'markAsTouched');

    array.popField();

    expect(array.children.pop).not.toHaveBeenCalled();
    expect(array.model.pop).not.toHaveBeenCalled();
    expect(array.control.removeAt).not.toHaveBeenCalled();
    expect(array.control.markAsTouched).not.toHaveBeenCalled();
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

    spyOn(array.control, 'removeAt');
    spyOn(array.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(fields[2], 'destroy');
    spyOn(fields[3], 'destroy');

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

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
    expect(array.control.removeAt).toHaveBeenCalledWith(1);
    expect(array.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).not.toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
    expect(fields[2].destroy).not.toHaveBeenCalled();
    expect(fields[3].destroy).not.toHaveBeenCalled();
  });

  it('does not remove field if index is invalid', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    spyOn(array.children, 'splice');
    spyOn(array.model, 'splice');
    spyOn(array.control, 'removeAt');
    spyOn(array.control, 'markAsTouched');

    array.removeField(1);

    expect(array.children.splice).not.toHaveBeenCalled();
    expect(array.model.splice).not.toHaveBeenCalled();
    expect(array.control.removeAt).not.toHaveBeenCalled();
    expect(array.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('clears fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(array.control, 'clear');
    spyOn(array.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    array.init();
    array.clearFields();

    expect(array.length).toBe(0);
    expect(array.children).toEqual([]);
    expect(array.control.clear).toHaveBeenCalled();
    expect(array.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
  });

  it('does not clear fields if length is zero', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);

    spyOn(array.control, 'clear');
    spyOn(array.control, 'markAsTouched');

    array.clearFields();

    expect(array.control.clear).not.toHaveBeenCalled();
    expect(array.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('moves field down', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() },
      { classType: 'field', definition: { index: 1 }, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    array.init();

    spyOn(array.control, 'removeAt').and.callThrough();
    spyOn(array.control, 'insert').and.callThrough();
    spyOn(array.control, 'markAsTouched');

    array.moveFieldDown(0);

    expect(array.children).toEqual([ fields[1], fields[0] ]);
    expect(array.children[0].definition.index).toBe(0);
    expect(array.children[1].definition.index).toBe(1);
    expect(array.control.removeAt).toHaveBeenCalledWith(0);
    expect(array.control.insert).toHaveBeenCalledWith(1, fields[0].control);
    expect(array.control.markAsTouched).toHaveBeenCalled();
  });

  it('does not move field down', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    array.init();

    spyOn(array.control, 'removeAt').and.callThrough();
    spyOn(array.control, 'insert').and.callThrough();
    spyOn(array.control, 'markAsTouched');

    array.moveFieldDown(0);

    expect(array.children).toEqual([ fields[0] ]);
    expect(array.control.removeAt).not.toHaveBeenCalled();
    expect(array.control.insert).not.toHaveBeenCalled();
    expect(array.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('moves field up', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() },
      { classType: 'field', definition: { index: 1 }, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    builder.createFormArrayElements.and.returnValue([ ...fields ]);

    array.init();

    spyOn(array.control, 'removeAt').and.callThrough();
    spyOn(array.control, 'insert').and.callThrough();
    spyOn(array.control, 'markAsTouched');

    array.moveFieldUp(1);

    expect(array.children).toEqual([ fields[1], fields[0] ]);
    expect(array.control.removeAt).toHaveBeenCalledWith(1);
    expect(array.control.insert).toHaveBeenCalledWith(0, fields[1].control);
    expect(array.control.markAsTouched).toHaveBeenCalled();
  });

  it('does not move field up', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    builder.createFormArrayElements.and.returnValue(fields);

    array.init();

    spyOn(array.control, 'removeAt').and.callThrough();
    spyOn(array.control, 'insert').and.callThrough();
    spyOn(array.control, 'markAsTouched');

    array.moveFieldUp(0);

    expect(array.children).toEqual([ fields[0] ]);
    expect(array.control.removeAt).not.toHaveBeenCalled();
    expect(array.control.insert).not.toHaveBeenCalled();
    expect(array.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('check calls check of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    builder.createFormArrayElements.and.returnValue(fields);

    array.init();
    array.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormArrayElements.and.returnValue(fields);

    array.init();
    array.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    builder.createFormArrayElements.and.returnValue(fields);

    array.init();
    array.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetEmpty calls destroy of all fields and clear of form array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(array.control, 'clear');

    builder.createFormArrayElements.and.returnValue(fields);

    array.init();
    array.resetEmpty();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
    expect(array.control.clear).toHaveBeenCalledTimes(1);
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

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(array.control, 'clear');

    builder.createFormArrayElements.and.returnValue(fields);

    array.init();
    array.resetDefault();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
    expect(array.control.clear).toHaveBeenCalledTimes(1);
  });

  it('validate calls validate of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const array = new DynamicFormArray(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    builder.createFormArrayElements.and.returnValue(fields);

    array.init();
    array.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
