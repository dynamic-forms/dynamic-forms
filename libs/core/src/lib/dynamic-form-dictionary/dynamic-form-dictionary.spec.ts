import { FormControl, FormRecord } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../testing';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';
import { DynamicFormDictionaryValidator } from './dynamic-form-dictionary-validator';

describe('DynamicFormDictionary', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
    builder.getFieldId.and.returnValue('fieldId');
  });

  it('creates instance', () => {
    const definition = { id: 'id', key: 'key', index: 1, type: 'componentType', template: {} }  as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const type = {} as DynamicFormFieldType;
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, type);

    expect(dictionary.root).toBe(form);
    expect(dictionary.parent).toBe(form);
    expect(dictionary.parentField).toBe(form);

    expect(dictionary.definition).toBe(definition);
    expect(dictionary.template).toBe(definition.template);

    expect(dictionary.settings).toBeTruthy();

    expect(dictionary.id).toBe('id');
    expect(dictionary.key).toBe('key');
    expect(dictionary.index).toBe(1);
    expect(dictionary.classType).toBe('field');
    expect(dictionary.fieldClassType).toBe('dictionary');
    expect(dictionary.componentType).toBe('componentType');

    expect(dictionary.model).toEqual({});
    expect(dictionary.value).toEqual({});
    expect(dictionary.valid).toBeTrue();
    expect(dictionary.status).toBe('VALID');
    expect(dictionary.control).toBeInstanceOf(FormRecord);

    expect(dictionary.children).toEqual([]);
    expect(dictionary.headerActions).toEqual([]);
    expect(dictionary.footerActions).toEqual([]);

    expect(form.model).toEqual({ key: {} });
  });

  it('sets model to default value', () => {
    const defaultValue = { value1: 0, value2: 1 } as any;
    const definition = { key: 'key', template: {}, defaultValue } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);

    expect(dictionary.model).toEqual(defaultValue);
  });

  it('sets model to default length', () => {
    const definition = { key: 'key', template: {}, defaultKeys: [ 'value1', 'value2' ] } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);

    expect(dictionary.model).toEqual({ value1: undefined, value2: undefined });
  });

  it('returns expression data with id, key, index and model', () => {
    const definition = {  id: 'id', key: 'key', index: 1, type: 'componentType', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);

    expect(dictionary.expressionData.id).toBe('id');
    expect(dictionary.expressionData.key).toBe('key');
    expect(dictionary.expressionData.index).toBe(1);
    expect(dictionary.expressionData.model).toEqual({});
    expect(dictionary.expressionData.length).toEqual(0);
  });

  it('init calls calls initId, initExpressions, initChildren, initValidators, initHeaderActions and initFooterActions', () => {
    const root = { classType: 'field', model: {} } as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { key: 'key', template: {}, children: [], headerActions: [], footerActions: [] } as DynamicFormDictionaryDefinition;
    const dictionary = new DynamicFormDictionary(builder, root, parent, definition, {} as DynamicFormFieldType);

    const initIdSpy = spyOn(dictionary as any, 'initId').and.callThrough();
    const initExpressionsSpy = spyOn(dictionary as any, 'initExpressions').and.callThrough();
    const getExpressionsSpy = spyOn(dictionary as any, 'getExpressions').and.callThrough();
    const initChildrenSpy = spyOn(dictionary as any, 'initChildren').and.callThrough();
    const getChildrenSpy = spyOn(dictionary as any, 'getChildren').and.callThrough();
    const initValidatorsSpy = spyOn(dictionary as any, 'initValidators').and.callThrough();
    const getValidatorsSpy = spyOn(dictionary as any, 'getValidators').and.callThrough();
    const initHeaderActionsSpy = spyOn(dictionary as any, 'initHeaderActions').and.callThrough();
    const getHeaderActionsSpy = spyOn(dictionary as any, 'getHeaderActions').and.callThrough();
    const initFooterActionsSpy = spyOn(dictionary as any, 'initFooterActions').and.callThrough();
    const getFooterActionsSpy = spyOn(dictionary as any, 'getFooterActions').and.callThrough();

    dictionary.init();

    expect(initIdSpy).toHaveBeenCalledTimes(1);
    expect(builder.getFieldId).toHaveBeenCalledOnceWith(dictionary);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFieldExpressions).toHaveBeenCalledOnceWith(dictionary);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormDictionaryElements).toHaveBeenCalledOnceWith(dictionary);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createDictionaryValidators).toHaveBeenCalledOnceWith(dictionary);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, dictionary, definition.headerActions);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, dictionary, definition.footerActions);
  });

  it('inits children and fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl() },
      { classType: 'field', definition: {}, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    builder.createFormDictionaryElements.and.returnValue(fields);

    dictionary.init();

    expect(dictionary.length).toBe(2);
    expect(dictionary.children).toBe(fields);
  });

  it('inits children and fields with empty array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);

    builder.createFormDictionaryElements.and.returnValue(null);

    dictionary.init();

    expect(dictionary.length).toBe(0);
    expect(dictionary.children).toEqual([]);
  });

  it('inits validators', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const validators = [{}] as DynamicFormDictionaryValidator[];

    builder.createDictionaryValidators.and.returnValue(validators);

    dictionary.init();

    expect(dictionary.validators).toBe(validators);
  });

  it('registers field by pushing field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { key: 'item1', classType: 'field', definition: {}, control: new FormControl() },
      { key: 'item2', classType: 'field', definition: {}, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];
    const field = { key: 'item3',  classType: 'field', definition: {}, control: new FormControl() } as unknown as DynamicFormField;

    spyOn(dictionary.control, 'registerControl');
    spyOn(dictionary.control, 'markAsTouched');

    builder.createFormDictionaryElements.and.returnValue(fields);

    dictionary.init();
    dictionary.registerField(field);

    expect(dictionary.length).toBe(3);
    expect(dictionary.children.length).toEqual(3);
    expect(dictionary.children[0]).toBe(fields[0]);
    expect(dictionary.children[1]).toBe(fields[1]);
    expect(dictionary.children[2]).toBe(field);
    expect(dictionary.control.registerControl).toHaveBeenCalledWith('item3', field.control);
    expect(dictionary.control.markAsTouched).toHaveBeenCalled();
  });

  it('registers field by replacing field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { key: 'item1', classType: 'field', definition: {}, control: new FormControl() },
      { key: 'item2', classType: 'field', definition: {}, control: new FormControl() },
      { key: 'item3', classType: 'field', definition: {}, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];
    const field = { key: 'item2', classType: 'field', definition: {}, control: new FormControl() } as unknown as DynamicFormField;

    spyOn(dictionary.control, 'registerControl');
    spyOn(dictionary.control, 'markAsTouched');

    builder.createFormDictionaryElements.and.returnValue(fields);

    dictionary.init();
    dictionary.registerField(field);

    expect(dictionary.length).toBe(3);
    expect(dictionary.children.length).toEqual(3);
    expect(dictionary.children[0]).toBe(fields[0]);
    expect(dictionary.children[1]).toBe(field);
    expect(dictionary.children[2]).toBe(fields[2]);
    expect(dictionary.control.registerControl).toHaveBeenCalledWith('item2', field.control);
    expect(dictionary.control.markAsTouched).toHaveBeenCalled();
  });

  it('removes field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { key: 'key-1', classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { key: 'key-2', classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { key: 'key-3', classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { key: 'key-4', classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(dictionary.control, 'removeControl');
    spyOn(dictionary.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(fields[2], 'destroy');
    spyOn(fields[3], 'destroy');

    builder.createFormDictionaryElements.and.returnValue([ ...fields ]);

    dictionary.init();
    dictionary.removeField('key-2');

    expect(dictionary.length).toBe(3);
    expect(dictionary.children.length).toBe(3);
    expect(dictionary.children[0]).toBe(fields[0]);
    expect(dictionary.children[1]).toBe(fields[2]);
    expect(dictionary.children[2]).toBe(fields[3]);
    expect(dictionary.control.removeControl).toHaveBeenCalledWith('key-2');
    expect(dictionary.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).not.toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
    expect(fields[2].destroy).not.toHaveBeenCalled();
    expect(fields[3].destroy).not.toHaveBeenCalled();
  });

  it('does not remove field if index is invalid', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);

    spyOn(dictionary.children, 'splice');
    spyOn(dictionary.control, 'removeControl');
    spyOn(dictionary.control, 'markAsTouched');

    dictionary.removeField('key');

    expect(dictionary.children.splice).not.toHaveBeenCalled();
    expect(dictionary.control.removeControl).not.toHaveBeenCalled();
    expect(dictionary.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('clears fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { key: 'key-1', classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { key: 'key-2', classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(dictionary.control, 'removeControl');
    spyOn(dictionary.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormDictionaryElements.and.returnValue(fields);

    dictionary.init();
    dictionary.clearFields();

    expect(dictionary.length).toBe(0);
    expect(dictionary.children).toEqual([]);
    expect(dictionary.control.removeControl).toHaveBeenCalledWith('key-1');
    expect(dictionary.control.removeControl).toHaveBeenCalledWith('key-2');
    expect(dictionary.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
  });

  it('does not clear fields if length is zero', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);

    spyOn(dictionary.control, 'removeControl');
    spyOn(dictionary.control, 'markAsTouched');

    dictionary.clearFields();

    expect(dictionary.control.removeControl).not.toHaveBeenCalled();
    expect(dictionary.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('check calls check of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    builder.createFormDictionaryElements.and.returnValue(fields);

    dictionary.init();
    dictionary.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormDictionaryElements.and.returnValue(fields);

    dictionary.init();
    dictionary.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    builder.createFormDictionaryElements.and.returnValue(fields);

    dictionary.init();
    dictionary.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetEmpty calls destroy of all fields and removeControl for all form group controls', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(dictionary.control, 'removeControl');

    builder.createFormDictionaryElements.and.returnValues(fields);

    dictionary.init();
    dictionary.resetEmpty();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
    expect(dictionary.control.removeControl).toHaveBeenCalledWith('key1');
    expect(dictionary.control.removeControl).toHaveBeenCalledWith('key2');
    expect(dictionary.children).toEqual([]);
  });

  it('resetDefault calls destroy of all fields and removeControl for all form group controls', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(dictionary.control, 'removeControl');

    builder.createFormDictionaryElements.and.returnValue(fields);

    dictionary.init();
    dictionary.resetDefault();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
    expect(dictionary.control.removeControl).toHaveBeenCalledWith('key1');
    expect(dictionary.control.removeControl).toHaveBeenCalledWith('key2');
  });

  it('validate calls validate of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    builder.createFormDictionaryElements.and.returnValue(fields);

    dictionary.init();
    dictionary.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
