import { FormControl } from '@angular/forms';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';

describe('DynamicFormDictionary', () => {
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = {} as any;
  });

  it('creates instance', () => {
    const definition = { id: 'id', key: 'key', index: 1, type: 'componentType', template: {} }  as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);

    expect(formDictionary.root).toBe(form);
    expect(formDictionary.parent).toBe(form);
    expect(formDictionary.parentField).toBe(form);

    expect(formDictionary.definition).toBe(definition);
    expect(formDictionary.template).toBe(definition.template);

    expect(formDictionary.settings).toBeTruthy();

    expect(formDictionary.id).toBe('id');
    expect(formDictionary.key).toBe('key');
    expect(formDictionary.index).toBe(1);
    expect(formDictionary.classType).toBe('field');
    expect(formDictionary.fieldClassType).toBe('dictionary');
    expect(formDictionary.componentType).toBe('componentType');

    expect(formDictionary.model).toEqual({});
    expect(formDictionary.value).toEqual({});
    expect(formDictionary.valid).toBeTrue();
    expect(formDictionary.status).toBe('VALID');
    expect(formDictionary.control).toBeTruthy();

    expect(formDictionary.children).toEqual([]);
    expect(formDictionary.headerActions).toEqual([]);
    expect(formDictionary.footerActions).toEqual([]);

    expect(form.model).toEqual({ key: {} });
  });

  it('sets model to default value', () => {
    const defaultValue = { value1: 0, value2: 1 };
    const definition = { key: 'key', template: {}, defaultValue } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);

    expect(formDictionary.model).toEqual(defaultValue);
  });

  it('sets model to default length', () => {
    const definition = { key: 'key', template: {}, defaultKeys: [ 'value1', 'value2' ] } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);

    expect(formDictionary.model).toEqual({ value1: undefined, value2: undefined });
  });

  it('returns expression data with id, key, index and model', () => {
    const definition = {  id: 'id', key: 'key', index: 1, type: 'componentType', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);

    expect(formDictionary.expressionData.id).toBe('id');
    expect(formDictionary.expressionData.key).toBe('key');
    expect(formDictionary.expressionData.index).toBe(1);
    expect(formDictionary.expressionData.model).toEqual({});
    expect(formDictionary.expressionData.length).toEqual(0);
  });

  it('inits children and fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField
    ];

    formDictionary.initChildren(fields);

    expect(formDictionary.length).toBe(2);
    expect(formDictionary.children).toBe(fields);
  });

  it('inits children and fields with empty array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);

    formDictionary.initChildren(null);

    expect(formDictionary.length).toBe(0);
    expect(formDictionary.children).toEqual([]);
  });

  it('registers field by pushing field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { key: 'item1', classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField,
      { key: 'item2', classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField
    ];
    const field = { key: 'item3',  classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField;

    spyOn(formDictionary.control, 'registerControl');
    spyOn(formDictionary.control, 'markAsTouched');

    formDictionary.initChildren(fields);
    formDictionary.registerField(field);

    expect(formDictionary.length).toBe(3);
    expect(formDictionary.children.length).toEqual(3);
    expect(formDictionary.children[0]).toBe(fields[0]);
    expect(formDictionary.children[1]).toBe(fields[1]);
    expect(formDictionary.children[2]).toBe(field);
    expect(formDictionary.control.registerControl).toHaveBeenCalledWith('item3', field.control);
    expect(formDictionary.control.markAsTouched).toHaveBeenCalled();
  });

  it('registers field by replacing field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { key: 'item1', classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField,
      { key: 'item2', classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField,
      { key: 'item3', classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField
    ];
    const field = { key: 'item2', classType: 'field', definition: {}, control: new FormControl() } as DynamicFormField;

    spyOn(formDictionary.control, 'registerControl');
    spyOn(formDictionary.control, 'markAsTouched');

    formDictionary.initChildren(fields);
    formDictionary.registerField(field);

    expect(formDictionary.length).toBe(3);
    expect(formDictionary.children.length).toEqual(3);
    expect(formDictionary.children[0]).toBe(fields[0]);
    expect(formDictionary.children[1]).toBe(field);
    expect(formDictionary.children[2]).toBe(fields[2]);
    expect(formDictionary.control.registerControl).toHaveBeenCalledWith('item2', field.control);
    expect(formDictionary.control.markAsTouched).toHaveBeenCalled();
  });

  it('removes field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { key: 'key-1', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField,
      { key: 'key-2', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField,
      { key: 'key-3', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField,
      { key: 'key-4', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField
    ];

    spyOn(formDictionary.control, 'removeControl');
    spyOn(formDictionary.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(fields[2], 'destroy');
    spyOn(fields[3], 'destroy');

    formDictionary.initChildren([ ...fields ]);
    formDictionary.removeField('key-2');

    expect(formDictionary.length).toBe(3);
    expect(formDictionary.children.length).toBe(3);
    expect(formDictionary.children[0]).toBe(fields[0]);
    expect(formDictionary.children[1]).toBe(fields[2]);
    expect(formDictionary.children[2]).toBe(fields[3]);
    expect(formDictionary.control.removeControl).toHaveBeenCalledWith('key-2');
    expect(formDictionary.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).not.toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
    expect(fields[2].destroy).not.toHaveBeenCalled();
    expect(fields[3].destroy).not.toHaveBeenCalled();
  });

  it('does not remove field if index is invalid', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);

    spyOn(formDictionary.children, 'splice');
    spyOn(formDictionary.control, 'removeControl');
    spyOn(formDictionary.control, 'markAsTouched');

    formDictionary.removeField('key');

    expect(formDictionary.children.splice).not.toHaveBeenCalled();
    expect(formDictionary.control.removeControl).not.toHaveBeenCalled();
    expect(formDictionary.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('clears fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { key: 'key-1', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField,
      { key: 'key-2', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} } as DynamicFormField
    ];

    spyOn(formDictionary.control, 'removeControl');
    spyOn(formDictionary.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formDictionary.initChildren(fields);
    formDictionary.clearFields();

    expect(formDictionary.length).toBe(0);
    expect(formDictionary.children).toEqual([]);
    expect(formDictionary.control.removeControl).toHaveBeenCalledWith('key-1');
    expect(formDictionary.control.removeControl).toHaveBeenCalledWith('key-2');
    expect(formDictionary.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
  });

  it('does not clear fields if length is zero', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formArray = new DynamicFormDictionary(builder, form, form, definition);

    spyOn(formArray.control, 'removeControl');
    spyOn(formArray.control, 'markAsTouched');

    formArray.clearFields();

    expect(formArray.control.removeControl).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('check calls check of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    formDictionary.initChildren(fields);
    formDictionary.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formDictionary.initChildren(fields);
    formDictionary.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    formDictionary.initChildren(fields);
    formDictionary.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls resetDefault of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formDictionary.initChildren(fields);
    formDictionary.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(1);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls patchValue of field if default value', () => {
    const defaultValue = [ { value: 0 }, { value: 1 } ];
    const definition = { key: 'key', template: {}, defaultValue } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formDictionary.initChildren(fields);
    formDictionary.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(0);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(0);
  });

  it('validate calls validate of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    formDictionary.initChildren(fields);
    formDictionary.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
