import { FormControl } from '@angular/forms';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';

describe('DynamicFormArray', () => {
  it('creates instance', () => {
    const definition = { id: 'id', key: 'key', index: 1, type: 'componentType', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);

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
    expect(formArray.control).toBeTruthy();

    expect(formArray.children).toEqual([]);
    expect(formArray.headerActions).toEqual([]);
    expect(formArray.footerActions).toEqual([]);

    expect(form.model).toEqual({ key: [] });
  });

  it('sets model to default value', () => {
    const defaultValue = [ { value: 0 }, { value: 1 } ];
    const definition = { key: 'key', template: {}, defaultValue } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);

    expect(formArray.model).toEqual(defaultValue);
  });

  it('sets model to default length', () => {
    const definition = { key: 'key', template: {}, defaultLength: 2 } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);

    expect(formArray.model).toEqual([ undefined, undefined ]);
  });

  it('returns expression data with id, key, index and model', () => {
    const definition = { id: 'id', key: 'key', index: 1, type: 'componentType', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);

    expect(formArray.expressionData.id).toBe('id');
    expect(formArray.expressionData.key).toBe('key');
    expect(formArray.expressionData.index).toBe(1);
    expect(formArray.expressionData.model).toEqual([]);
    expect(formArray.expressionData.length).toEqual(0);
  });

  it('inits children and fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField
    ];

    formArray.initChildren(fields);

    expect(formArray.length).toBe(2);
    expect(formArray.children).toBe(fields);
  });

  it('inits children and fields with empty array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);

    formArray.initChildren(null);

    expect(formArray.length).toBe(0);
    expect(formArray.children).toEqual([]);
  });

  it('pushes field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField
    ];
    const field = { classType: 'field', definition: {}, control: new FormControl() }  as DynamicFormField;

    spyOn(formArray.control, 'push');

    formArray.initChildren([ ...fields ]);
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
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField
    ];

    spyOn(formArray.control, 'removeAt');
    spyOn(formArray.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formArray.initChildren([ ...fields ]);
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
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);

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
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField
    ];

    spyOn(formArray.control, 'removeAt');
    spyOn(formArray.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(fields[2], 'destroy');
    spyOn(fields[3], 'destroy');

    formArray.initChildren([ ...fields ]);
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
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);

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
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField
    ];

    spyOn(formArray.control, 'clear');
    spyOn(formArray.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formArray.initChildren([ ...fields ]);
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
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);

    spyOn(formArray.control, 'clear');
    spyOn(formArray.control, 'markAsTouched');

    formArray.clearFields();

    expect(formArray.control.clear).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('moves field down', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() } as DynamicFormField,
      { classType: 'field', definition: { index: 1 }, control: new FormControl() } as DynamicFormField
    ];

    formArray.initChildren([ ...fields ]);

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
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() } as DynamicFormField,
    ];

    formArray.initChildren(fields);

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
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() } as DynamicFormField,
      { classType: 'field', definition: { index: 1 }, control: new FormControl() } as DynamicFormField
    ];

    formArray.initChildren([ ...fields ]);

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
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: { index: 0 }, control: new FormControl() } as DynamicFormField,
    ];

    formArray.initChildren(fields);

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
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    formArray.initChildren(fields);
    formArray.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formArray.initChildren(fields);
    formArray.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    formArray.initChildren(fields);
    formArray.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls resetDefault of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formArray.initChildren(fields);
    formArray.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(1);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls patchValue of field if default value', () => {
    const defaultValue = [ { value: 0 }, { value: 1 } ];
    const definition = { key: 'key', template: {}, defaultValue } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formArray.initChildren(fields);
    formArray.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(0);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(0);
  });

  it('validate calls validate of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormArrayDefinition;
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    formArray.initChildren(fields);
    formArray.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
