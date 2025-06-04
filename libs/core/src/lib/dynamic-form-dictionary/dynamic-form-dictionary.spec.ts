import { FormControl, FormRecord } from '@angular/forms';
import { MockService } from 'ng-mocks';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';
import { DynamicFormDictionaryValidator } from './dynamic-form-dictionary-validator';

describe('DynamicFormDictionary', () => {
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder, { getFieldId: () => 'fieldId' });
  });

  it('creates instance', () => {
    const definition = { id: 'id', key: 'key', index: 1, type: 'type', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const type = { type: 'type' } as DynamicFormFieldType;
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, type);

    expect(dictionary.root).toBe(form);
    expect(dictionary.parent).toBe(form);
    expect(dictionary.parentField).toBe(form);

    expect(dictionary.definition).toBe(definition);
    expect(dictionary.template).toBe(definition.template);
    expect(dictionary.type).toBe(type);

    expect(dictionary.settings).toBeTruthy();

    expect(dictionary.id).toBe('id');
    expect(dictionary.key).toBe('key');
    expect(dictionary.index).toBe(1);
    expect(dictionary.classType).toBe('field');
    expect(dictionary.fieldClassType).toBe('dictionary');

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
    const definition = { key: 'key', template: {}, defaultKeys: ['value1', 'value2'] } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);

    expect(dictionary.model).toEqual({ value1: undefined, value2: undefined });
  });

  it('returns expression data with id, key, index and model', () => {
    const definition = { id: 'id', key: 'key', index: 1, type: 'componentType', template: {} } as DynamicFormDictionaryDefinition;
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

    const getFieldIdSpy = spyOn(builder, 'getFieldId').and.callThrough();
    const createExpressionsSpy = spyOn(builder, 'createFieldExpressions').and.callThrough();
    const createElementsSpy = spyOn(builder, 'createFormDictionaryElements').and.callThrough();
    const createValidatorsSpy = spyOn(builder, 'createDictionaryValidators').and.callThrough();
    const createActionsSpy = spyOn(builder, 'createFormActions').and.callThrough();

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
    expect(getFieldIdSpy).toHaveBeenCalledOnceWith(dictionary);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(createExpressionsSpy).toHaveBeenCalledOnceWith(dictionary);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(createElementsSpy).toHaveBeenCalledOnceWith(dictionary);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(createValidatorsSpy).toHaveBeenCalledOnceWith(dictionary);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(createActionsSpy).toHaveBeenCalledWith(root, dictionary, definition.headerActions);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(createActionsSpy).toHaveBeenCalledWith(root, dictionary, definition.footerActions);
  });

  it('inits children and fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl() },
      { classType: 'field', definition: {}, control: new FormControl() },
    ] as unknown[] as DynamicFormField[];

    spyOn(builder, 'createFormDictionaryElements').and.returnValue(fields);

    dictionary.init();

    expect(dictionary.length).toBe(2);
    expect(dictionary.children).toBe(fields);
  });

  it('inits children and fields with empty array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);

    spyOn(builder, 'createFormDictionaryElements').and.returnValue(null);

    dictionary.init();

    expect(dictionary.length).toBe(0);
    expect(dictionary.children).toEqual([]);
  });

  it('inits validators', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const validators = [{}] as DynamicFormDictionaryValidator[];

    spyOn(builder, 'createDictionaryValidators').and.returnValue(validators);

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
    const field = { key: 'item3', classType: 'field', definition: {}, control: new FormControl() } as unknown as DynamicFormField;

    const registerControlSpy = spyOn(dictionary.control, 'registerControl');
    const touchControlSpy = spyOn(dictionary.control, 'markAsTouched');

    spyOn(builder, 'createFormDictionaryElements').and.returnValue(fields);

    dictionary.init();
    dictionary.registerField(field);

    expect(dictionary.length).toBe(3);
    expect(dictionary.children.length).toEqual(3);
    expect(dictionary.children[0]).toBe(fields[0]);
    expect(dictionary.children[1]).toBe(fields[1]);
    expect(dictionary.children[2]).toBe(field);
    expect(registerControlSpy).toHaveBeenCalledWith('item3', field.control);
    expect(touchControlSpy).toHaveBeenCalled();
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

    const registerControlSpy = spyOn(dictionary.control, 'registerControl');
    const touchControlSpy = spyOn(dictionary.control, 'markAsTouched');

    spyOn(builder, 'createFormDictionaryElements').and.returnValue(fields);

    dictionary.init();
    dictionary.registerField(field);

    expect(dictionary.length).toBe(3);
    expect(dictionary.children.length).toEqual(3);
    expect(dictionary.children[0]).toBe(fields[0]);
    expect(dictionary.children[1]).toBe(field);
    expect(dictionary.children[2]).toBe(fields[2]);
    expect(registerControlSpy).toHaveBeenCalledWith('item2', field.control);
    expect(touchControlSpy).toHaveBeenCalled();
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

    const removeControlSpy = spyOn(dictionary.control, 'removeControl');
    const touchControlSpy = spyOn(dictionary.control, 'markAsTouched');
    const destroyField0Spy = spyOn(fields[0], 'destroy');
    const destroyField1Spy = spyOn(fields[1], 'destroy');
    const destroyField2Spy = spyOn(fields[2], 'destroy');
    const destroyField3Spy = spyOn(fields[3], 'destroy');

    spyOn(builder, 'createFormDictionaryElements').and.returnValue([...fields]);

    dictionary.init();
    dictionary.removeField('key-2');

    expect(dictionary.length).toBe(3);
    expect(dictionary.children.length).toBe(3);
    expect(dictionary.children[0]).toBe(fields[0]);
    expect(dictionary.children[1]).toBe(fields[2]);
    expect(dictionary.children[2]).toBe(fields[3]);
    expect(removeControlSpy).toHaveBeenCalledWith('key-2');
    expect(touchControlSpy).toHaveBeenCalled();
    expect(destroyField0Spy).not.toHaveBeenCalled();
    expect(destroyField1Spy).toHaveBeenCalled();
    expect(destroyField2Spy).not.toHaveBeenCalled();
    expect(destroyField3Spy).not.toHaveBeenCalled();
  });

  it('does not remove field if index is invalid', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);

    spyOn(dictionary.children, 'splice');
    const removeControlSpy = spyOn(dictionary.control, 'removeControl');
    const touchControlSpy = spyOn(dictionary.control, 'markAsTouched');

    dictionary.removeField('key');

    expect(dictionary.children.splice).not.toHaveBeenCalled();
    expect(removeControlSpy).not.toHaveBeenCalled();
    expect(touchControlSpy).not.toHaveBeenCalled();
  });

  it('clears fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { key: 'key-1', classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { key: 'key-2', classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    const removeControlSpy = spyOn(dictionary.control, 'removeControl');
    const touchControlSpy = spyOn(dictionary.control, 'markAsTouched');
    const destroyField0Spy = spyOn(fields[0], 'destroy');
    const destroyField1Spy = spyOn(fields[1], 'destroy');

    spyOn(builder, 'createFormDictionaryElements').and.returnValue(fields);

    dictionary.init();
    dictionary.clearFields();

    expect(dictionary.length).toBe(0);
    expect(dictionary.children).toEqual([]);
    expect(removeControlSpy).toHaveBeenCalledWith('key-1');
    expect(removeControlSpy).toHaveBeenCalledWith('key-2');
    expect(touchControlSpy).toHaveBeenCalled();
    expect(destroyField0Spy).toHaveBeenCalled();
    expect(destroyField1Spy).toHaveBeenCalled();
  });

  it('does not clear fields if length is zero', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);

    const removeControlSpy = spyOn(dictionary.control, 'removeControl');
    const touchControlSpy = spyOn(dictionary.control, 'markAsTouched');

    dictionary.clearFields();

    expect(removeControlSpy).not.toHaveBeenCalled();
    expect(touchControlSpy).not.toHaveBeenCalled();
  });

  it('check calls check of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
    ] as unknown[] as DynamicFormField[];

    const checkField0Spy = spyOn(fields[0], 'check');
    const checkField1Spy = spyOn(fields[1], 'check');

    spyOn(builder, 'createFormDictionaryElements').and.returnValue(fields);

    dictionary.init();
    dictionary.check();

    expect(checkField0Spy).toHaveBeenCalledTimes(1);
    expect(checkField1Spy).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    const destroyField0Spy = spyOn(fields[0], 'destroy');
    const destroyField1Spy = spyOn(fields[1], 'destroy');

    spyOn(builder, 'createFormDictionaryElements').and.returnValue(fields);

    dictionary.init();
    dictionary.destroy();

    expect(destroyField0Spy).toHaveBeenCalledTimes(1);
    expect(destroyField1Spy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
    ] as unknown[] as DynamicFormField[];

    const resetField0Spy = spyOn(fields[0], 'reset');
    const resetField1Spy = spyOn(fields[1], 'reset');

    spyOn(builder, 'createFormDictionaryElements').and.returnValue(fields);

    dictionary.init();
    dictionary.reset();

    expect(resetField0Spy).toHaveBeenCalledTimes(1);
    expect(resetField1Spy).toHaveBeenCalledTimes(1);
  });

  it('resetEmpty calls destroy of all fields and removeControl for all form group controls', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    const destroyField0Spy = spyOn(fields[0], 'destroy');
    const destroyField1Spy = spyOn(fields[1], 'destroy');
    const removeControlSpy = spyOn(dictionary.control, 'removeControl');

    spyOn(builder, 'createFormDictionaryElements').and.returnValues(fields);

    dictionary.init();
    dictionary.resetEmpty();

    expect(destroyField0Spy).toHaveBeenCalledTimes(1);
    expect(destroyField1Spy).toHaveBeenCalledTimes(1);
    expect(removeControlSpy).toHaveBeenCalledWith('key1');
    expect(removeControlSpy).toHaveBeenCalledWith('key2');
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

    const destroyField0Spy = spyOn(fields[0], 'destroy');
    const destroyField1Spy = spyOn(fields[1], 'destroy');
    const removeControlSpy = spyOn(dictionary.control, 'removeControl');

    spyOn(builder, 'createFormDictionaryElements').and.returnValue(fields);

    dictionary.init();
    dictionary.resetDefault();

    expect(destroyField0Spy).toHaveBeenCalledTimes(1);
    expect(destroyField1Spy).toHaveBeenCalledTimes(1);
    expect(removeControlSpy).toHaveBeenCalledWith('key1');
    expect(removeControlSpy).toHaveBeenCalledWith('key2');
  });

  it('validate calls validate of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const dictionary = new DynamicFormDictionary(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
      { classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
    ] as unknown[] as DynamicFormField[];

    const validateField0Spy = spyOn(fields[0], 'validate');
    const validateField1Spy = spyOn(fields[1], 'validate');

    spyOn(builder, 'createFormDictionaryElements').and.returnValue(fields);

    dictionary.init();
    dictionary.validate();

    expect(validateField0Spy).toHaveBeenCalledTimes(1);
    expect(validateField1Spy).toHaveBeenCalledTimes(1);
  });
});
