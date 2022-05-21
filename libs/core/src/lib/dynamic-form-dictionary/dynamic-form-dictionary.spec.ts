import { UntypedFormControl } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
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

  it('init calls calls initId, initExpressions, initChildren, initValidators, initHeaderActions and initFooterActions', () => {
    const root = { classType: 'field', model: {} } as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { key: 'key', template: {}, children: [], headerActions: [], footerActions: [] } as DynamicFormDictionaryDefinition;
    const formDictionary = new DynamicFormDictionary(builder, root, parent, definition);

    const initIdSpy = spyOn(formDictionary as any, 'initId').and.callThrough();
    const initExpressionsSpy = spyOn(formDictionary as any, 'initExpressions').and.callThrough();
    const getExpressionsSpy = spyOn(formDictionary as any, 'getExpressions').and.callThrough();
    const initChildrenSpy = spyOn(formDictionary as any, 'initChildren').and.callThrough();
    const getChildrenSpy = spyOn(formDictionary as any, 'getChildren').and.callThrough();
    const initValidatorsSpy = spyOn(formDictionary as any, 'initValidators').and.callThrough();
    const getValidatorsSpy = spyOn(formDictionary as any, 'getValidators').and.callThrough();
    const initHeaderActionsSpy = spyOn(formDictionary as any, 'initHeaderActions').and.callThrough();
    const getHeaderActionsSpy = spyOn(formDictionary as any, 'getHeaderActions').and.callThrough();
    const initFooterActionsSpy = spyOn(formDictionary as any, 'initFooterActions').and.callThrough();
    const getFooterActionsSpy = spyOn(formDictionary as any, 'getFooterActions').and.callThrough();

    formDictionary.init();

    expect(initIdSpy).toHaveBeenCalledTimes(1);
    expect(builder.getFieldId).toHaveBeenCalledOnceWith(formDictionary);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFieldExpressions).toHaveBeenCalledOnceWith(formDictionary);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormDictionaryElements).toHaveBeenCalledOnceWith(formDictionary);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createDictionaryValidators).toHaveBeenCalledOnceWith(formDictionary);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, formDictionary, definition.headerActions);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, formDictionary, definition.footerActions);
  });

  it('inits children and fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new UntypedFormControl() } as DynamicFormField,
      { classType: 'field', definition: {}, control: new UntypedFormControl() } as DynamicFormField
    ];

    builder.createFormDictionaryElements.and.returnValue(fields);

    formDictionary.init();

    expect(formDictionary.length).toBe(2);
    expect(formDictionary.children).toBe(fields);
  });

  it('inits children and fields with empty array', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);

    builder.createFormDictionaryElements.and.returnValue(null);

    formDictionary.init();

    expect(formDictionary.length).toBe(0);
    expect(formDictionary.children).toEqual([]);
  });

  it('inits validators', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const validators = [{}] as DynamicFormDictionaryValidator[];

    builder.createDictionaryValidators.and.returnValue(validators);

    formDictionary.init();

    expect(formDictionary.validators).toBe(validators);
  });

  it('registers field by pushing field', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { key: 'item1', classType: 'field', definition: {}, control: new UntypedFormControl() } as DynamicFormField,
      { key: 'item2', classType: 'field', definition: {}, control: new UntypedFormControl() } as DynamicFormField
    ];
    const field = { key: 'item3',  classType: 'field', definition: {}, control: new UntypedFormControl() } as DynamicFormField;

    spyOn(formDictionary.control, 'registerControl');
    spyOn(formDictionary.control, 'markAsTouched');

    builder.createFormDictionaryElements.and.returnValue(fields);

    formDictionary.init();
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
      { key: 'item1', classType: 'field', definition: {}, control: new UntypedFormControl() } as DynamicFormField,
      { key: 'item2', classType: 'field', definition: {}, control: new UntypedFormControl() } as DynamicFormField,
      { key: 'item3', classType: 'field', definition: {}, control: new UntypedFormControl() } as DynamicFormField
    ];
    const field = { key: 'item2', classType: 'field', definition: {}, control: new UntypedFormControl() } as DynamicFormField;

    spyOn(formDictionary.control, 'registerControl');
    spyOn(formDictionary.control, 'markAsTouched');

    builder.createFormDictionaryElements.and.returnValue(fields);

    formDictionary.init();
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
      { key: 'key-1', classType: 'field', definition: {}, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField,
      { key: 'key-2', classType: 'field', definition: {}, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField,
      { key: 'key-3', classType: 'field', definition: {}, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField,
      { key: 'key-4', classType: 'field', definition: {}, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField
    ];

    spyOn(formDictionary.control, 'removeControl');
    spyOn(formDictionary.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(fields[2], 'destroy');
    spyOn(fields[3], 'destroy');

    builder.createFormDictionaryElements.and.returnValue([ ...fields ]);

    formDictionary.init();
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
      { key: 'key-1', classType: 'field', definition: {}, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField,
      { key: 'key-2', classType: 'field', definition: {}, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField
    ];

    spyOn(formDictionary.control, 'removeControl');
    spyOn(formDictionary.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormDictionaryElements.and.returnValue(fields);

    formDictionary.init();
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
      { classType: 'field', definition: {}, control: new UntypedFormControl(), check: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new UntypedFormControl(), check: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    builder.createFormDictionaryElements.and.returnValue(fields);

    formDictionary.init();
    formDictionary.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormDictionaryElements.and.returnValue(fields);

    formDictionary.init();
    formDictionary.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new UntypedFormControl(), reset: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new UntypedFormControl(), reset: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    builder.createFormDictionaryElements.and.returnValue(fields);

    formDictionary.init();
    formDictionary.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetEmpty calls destroy of all fields and removeControl for all form group controls', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField,
      { classType: 'field', definition: { key: 'key2' }, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(formDictionary.control, 'removeControl');

    builder.createFormDictionaryElements.and.returnValues(fields);

    formDictionary.init();
    formDictionary.resetEmpty();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
    expect(formDictionary.control.removeControl).toHaveBeenCalledWith('key1');
    expect(formDictionary.control.removeControl).toHaveBeenCalledWith('key2');
    expect(formDictionary.children).toEqual([]);
  });

  it('resetDefault calls destroy of all fields and removeControl for all form group controls', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField,
      { classType: 'field', definition: { key: 'key2' }, control: new UntypedFormControl(), destroy: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(formDictionary.control, 'removeControl');

    builder.createFormDictionaryElements.and.returnValue(fields);

    formDictionary.init();
    formDictionary.resetDefault();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
    expect(formDictionary.control.removeControl).toHaveBeenCalledWith('key1');
    expect(formDictionary.control.removeControl).toHaveBeenCalledWith('key2');
  });

  it('validate calls validate of all fields', () => {
    const definition = { key: 'key', template: {} } as DynamicFormDictionaryDefinition;
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const formDictionary = new DynamicFormDictionary(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: {}, control: new UntypedFormControl(), validate: () => {} } as DynamicFormField,
      { classType: 'field', definition: {}, control: new UntypedFormControl(), validate: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    builder.createFormDictionaryElements.and.returnValue(fields);

    formDictionary.init();
    formDictionary.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
