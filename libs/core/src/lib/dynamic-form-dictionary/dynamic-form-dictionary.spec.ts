import { FormControl } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormDictionary } from './dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';

describe('DynamicFormDictionary', () => {
  it('creates instance', () => {
    const definition = <DynamicFormDictionaryDefinition>{ id: 'id', key: 'key', index: 1, type: 'componentType', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] }, {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);

    expect(formDictionary.root).toBe(form);
    expect(formDictionary.parent).toBe(form);
    expect(formDictionary.settings).toBeTruthy();

    expect(formDictionary.definition).toBe(definition);
    expect(formDictionary.template).toBe(definition.template);

    expect(formDictionary.id).toBe('id');
    expect(formDictionary.key).toBe('key');
    expect(formDictionary.index).toBe(1);
    expect(formDictionary.classType).toBe('field');
    expect(formDictionary.fieldClassType).toBe('dictionary');
    expect(formDictionary.componentType).toBe('componentType');

    expect(formDictionary.model).toEqual({});
    expect(formDictionary.control).toBeTruthy();
    expect(formDictionary.status).toBe('VALID');

    expect(formDictionary.elements).toEqual([]);
    expect(formDictionary.fields).toEqual([]);
    expect(formDictionary.footerActions).toEqual([]);

    expect(form.model).toEqual({ key: {} });
  });

  it('sets model to default value', () => {
    const defaultValue = { value1: 0, value2: 1 };
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {}, defaultValue };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);

    expect(formDictionary.model).toEqual(defaultValue);
  });

  it('sets model to default length', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {}, defaultKeys: [ 'value1', 'value2' ] };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);

    expect(formDictionary.model).toEqual({ value1: undefined, value2: undefined });
  });

  it('returns expression data with id, key, index and model', () => {
    const definition = <DynamicFormDictionaryDefinition>{  id: 'id', key: 'key', index: 1, type: 'componentType', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] }, {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);

    expect(formDictionary.expressionData.id).toBe('id');
    expect(formDictionary.expressionData.key).toBe('key');
    expect(formDictionary.expressionData.index).toBe(1);
    expect(formDictionary.expressionData.model).toEqual({});
    expect(formDictionary.expressionData.length).toEqual(0);
  });

  it('inits elements and fields', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl() },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl() }
    ];

    formDictionary.initElements(fields);

    expect(formDictionary.length).toBe(2);
    expect(formDictionary.elements).toEqual(fields as DynamicFormElement[]);
    expect(formDictionary.elements).not.toBe(fields as DynamicFormElement[]);
    expect(formDictionary.elements).toBe(formDictionary.fields as DynamicFormElement[]);
    expect(formDictionary.fields).toEqual(fields);
    expect(formDictionary.fields).not.toBe(fields);
    expect(formDictionary.fields[0]).toBe(fields[0]);
    expect(formDictionary.fields[1]).toBe(fields[1]);
  });

  it('inits elements and fields with empty array', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);

    formDictionary.initElements(null);

    expect(formDictionary.length).toBe(0);
    expect(formDictionary.elements).toEqual([]);
    expect(formDictionary.fields).toEqual([]);
  });

  it('registers field by pushing field', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);
    const fields = [
      <DynamicFormField>{ key: 'item1', classType: 'field', definition: {}, control: new FormControl() },
      <DynamicFormField>{ key: 'item2', classType: 'field', definition: {}, control: new FormControl() }
    ];
    const field = <DynamicFormField>{ key: 'item3',  classType: 'field', definition: {}, control: new FormControl() };

    spyOn(formDictionary.control, 'registerControl');
    spyOn(formDictionary.control, 'markAsTouched');

    formDictionary.initElements(fields);
    formDictionary.registerField(field);

    expect(formDictionary.length).toBe(3);
    expect(formDictionary.elements).toBe(formDictionary.fields as DynamicFormElement[]);
    expect(formDictionary.fields.length).toEqual(3);
    expect(formDictionary.fields[0]).toBe(fields[0]);
    expect(formDictionary.fields[1]).toBe(fields[1]);
    expect(formDictionary.fields[2]).toBe(field);
    expect(formDictionary.control.registerControl).toHaveBeenCalledWith('item3', field.control);
    expect(formDictionary.control.markAsTouched).toHaveBeenCalled();
  });

  it('registers field by replacing field', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);
    const fields = [
      <DynamicFormField>{ key: 'item1', classType: 'field', definition: {}, control: new FormControl() },
      <DynamicFormField>{ key: 'item2', classType: 'field', definition: {}, control: new FormControl() },
      <DynamicFormField>{ key: 'item3', classType: 'field', definition: {}, control: new FormControl() }
    ];
    const field = <DynamicFormField>{ key: 'item2', classType: 'field', definition: {}, control: new FormControl() };

    spyOn(formDictionary.control, 'registerControl');
    spyOn(formDictionary.control, 'markAsTouched');

    formDictionary.initElements(fields);
    formDictionary.registerField(field);

    expect(formDictionary.length).toBe(3);
    expect(formDictionary.elements).toBe(formDictionary.fields as DynamicFormElement[]);
    expect(formDictionary.fields.length).toEqual(3);
    expect(formDictionary.fields[0]).toBe(fields[0]);
    expect(formDictionary.fields[1]).toBe(field);
    expect(formDictionary.fields[2]).toBe(fields[2]);
    expect(formDictionary.control.registerControl).toHaveBeenCalledWith('item2', field.control);
    expect(formDictionary.control.markAsTouched).toHaveBeenCalled();
  });

  it('removes field', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);
    const fields = [
      <DynamicFormField>{ key: 'key-1', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} },
      <DynamicFormField>{ key: 'key-2', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} },
      <DynamicFormField>{ key: 'key-3', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} },
      <DynamicFormField>{ key: 'key-4', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} }
    ];

    spyOn(formDictionary.control, 'removeControl');
    spyOn(formDictionary.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(fields[2], 'destroy');
    spyOn(fields[3], 'destroy');

    formDictionary.initElements(fields);
    formDictionary.removeField('key-2');

    expect(formDictionary.length).toBe(3);
    expect(formDictionary.elements).toBe(formDictionary.fields as DynamicFormElement[]);
    expect(formDictionary.fields.length).toBe(3);
    expect(formDictionary.fields[0]).toBe(fields[0]);
    expect(formDictionary.fields[1]).toBe(fields[2]);
    expect(formDictionary.fields[2]).toBe(fields[3]);
    expect(formDictionary.control.removeControl).toHaveBeenCalledWith('key-2');
    expect(formDictionary.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).not.toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
    expect(fields[2].destroy).not.toHaveBeenCalled();
    expect(fields[3].destroy).not.toHaveBeenCalled();
  });

  it('does not remove field if index is invalid', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);

    spyOn(formDictionary.fields, 'splice');
    spyOn(formDictionary.control, 'removeControl');
    spyOn(formDictionary.control, 'markAsTouched');

    formDictionary.removeField('key');

    expect(formDictionary.fields.splice).not.toHaveBeenCalled();
    expect(formDictionary.control.removeControl).not.toHaveBeenCalled();
    expect(formDictionary.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('clears fields', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);
    const fields = [
      <DynamicFormField>{ key: 'key-1', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} },
      <DynamicFormField>{ key: 'key-2', classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} }
    ];

    spyOn(formDictionary.control, 'removeControl');
    spyOn(formDictionary.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formDictionary.initElements(fields);
    formDictionary.clearFields();

    expect(formDictionary.length).toBe(0);
    expect(formDictionary.elements).toBe(formDictionary.fields as DynamicFormElement[]);
    expect(formDictionary.fields).toEqual([]);
    expect(formDictionary.control.removeControl).toHaveBeenCalledWith('key-1');
    expect(formDictionary.control.removeControl).toHaveBeenCalledWith('key-2');
    expect(formDictionary.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
  });

  it('does not clear fields if length is zero', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormDictionary(form, form, definition);

    spyOn(formArray.control, 'removeControl');
    spyOn(formArray.control, 'markAsTouched');

    formArray.clearFields();

    expect(formArray.control.removeControl).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('check calls check of all fields', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), check: () => {} }
    ];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    formDictionary.initElements(fields);
    formDictionary.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} }
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formDictionary.initElements(fields);
    formDictionary.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), reset: () => {} }
    ];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    formDictionary.initElements(fields);
    formDictionary.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls resetDefault of all fields', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} }
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formDictionary.initElements(fields);
    formDictionary.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(1);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls patchValue of field if default value', () => {
    const defaultValue = [ { value: 0 }, { value: 1 } ];
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {}, defaultValue };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} }
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formDictionary.initElements(fields);
    formDictionary.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(0);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(0);
  });

  it('validate calls validate of all fields', () => {
    const definition = <DynamicFormDictionaryDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formDictionary = new DynamicFormDictionary(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), validate: () => {} }
    ];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    formDictionary.initElements(fields);
    formDictionary.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
