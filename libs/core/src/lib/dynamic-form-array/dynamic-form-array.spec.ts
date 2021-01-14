import { FormControl } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';

describe('DynamicFormArray', () => {
  it('creates instance', () => {
    const definition = <DynamicFormArrayDefinition>{ id: 'id', key: 'key', index: 1, type: 'componentType', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] }, {});
    const formArray = new DynamicFormArray(form, form, definition);

    expect(formArray.root).toBe(form);
    expect(formArray.parent).toBe(form);
    expect(formArray.definition).toBe(definition);
    expect(formArray.template).toBe(definition.template);

    expect(formArray.id).toBe('id');
    expect(formArray.key).toBe('key');
    expect(formArray.index).toBe(1);
    expect(formArray.classType).toBe('field');
    expect(formArray.fieldClassType).toBe('array');
    expect(formArray.componentType).toBe('componentType');

    expect(formArray.model).toEqual([]);
    expect(formArray.control).toBeTruthy();
    expect(formArray.status).toBe('VALID');

    expect(formArray.elements).toEqual([]);
    expect(formArray.fields).toEqual([]);
    expect(formArray.footerActions).toEqual([]);

    expect(form.model).toEqual({ key: [] });
  });

  it('sets model to default value', () => {
    const defaultValue = [ { value: 0 }, { value: 1 } ];
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {}, defaultValue };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);

    expect(formArray.model).toEqual(defaultValue);
  });

  it('sets model to default length', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {}, defaultLength: 2 };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);

    expect(formArray.model).toEqual([ undefined, undefined ]);
  });

  it('returns expression data with id, key, index and model', () => {
    const definition = <DynamicFormArrayDefinition>{  id: 'id', key: 'key', index: 1, type: 'componentType', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] }, {});
    const formArray = new DynamicFormArray(form, form, definition);

    expect(formArray.expressionData.id).toBe('id');
    expect(formArray.expressionData.key).toBe('key');
    expect(formArray.expressionData.index).toBe(1);
    expect(formArray.expressionData.model).toEqual([]);
    expect(formArray.expressionData.length).toEqual(0);
  });

  it('inits elements and fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl() },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl() }
    ];

    formArray.initElements(fields);

    expect(formArray.length).toBe(2);
    expect(formArray.elements).toBe(fields as DynamicFormElement[]);
    expect(formArray.elements).toBe(formArray.fields as DynamicFormElement[]);
    expect(formArray.fields).toEqual(fields);
    expect(formArray.fields[0]).toBe(fields[0]);
    expect(formArray.fields[1]).toBe(fields[1]);
  });

  it('inits elements and fields with empty array', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);

    formArray.initElements(null);

    expect(formArray.length).toBe(0);
    expect(formArray.elements).toEqual([]);
    expect(formArray.fields).toEqual([]);
  });

  it('pushes field', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl() },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl() }
    ];
    const field = <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl() };

    spyOn(formArray.control, 'push');

    formArray.initElements([ ...fields ]);
    formArray.pushField(field);

    expect(formArray.length).toBe(3);
    expect(formArray.elements).toBe(formArray.fields as DynamicFormElement[]);
    expect(formArray.fields.length).toBe(3);
    expect(formArray.fields[0]).toBe(fields[0]);
    expect(formArray.fields[1]).toBe(fields[1]);
    expect(formArray.fields[2]).toBe(field);
    expect(formArray.control.push).toHaveBeenCalledWith(field.control);
  });

  it('pops field', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} }
    ];

    spyOn(formArray.control, 'removeAt');
    spyOn(formArray.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formArray.initElements([ ...fields ]);
    formArray.popField();

    expect(formArray.length).toBe(1);
    expect(formArray.elements).toBe(formArray.fields as DynamicFormElement[]);
    expect(formArray.fields.length).toBe(1);
    expect(formArray.fields[0]).toBe(fields[0]);
    expect(formArray.control.removeAt).toHaveBeenCalledWith(1);
    expect(formArray.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).not.toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
  });

  it('does not pop field if length is zero', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);

    spyOn(formArray.fields, 'pop');
    spyOn(formArray.model, 'pop');
    spyOn(formArray.control, 'removeAt');
    spyOn(formArray.control, 'markAsTouched');

    formArray.popField();

    expect(formArray.fields.pop).not.toHaveBeenCalled();
    expect(formArray.model.pop).not.toHaveBeenCalled();
    expect(formArray.control.removeAt).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('removes field', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} }
    ];

    spyOn(formArray.control, 'removeAt');
    spyOn(formArray.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');
    spyOn(fields[2], 'destroy');
    spyOn(fields[3], 'destroy');

    formArray.initElements([ ...fields ]);
    formArray.removeField(1);

    expect(formArray.length).toBe(3);
    expect(formArray.elements).toBe(formArray.fields as DynamicFormElement[]);
    expect(formArray.fields.length).toBe(3);
    expect(formArray.fields[0]).toBe(fields[0]);
    expect(formArray.fields[0].definition.index).toBe(0);
    expect(formArray.fields[1]).toBe(fields[2]);
    expect(formArray.fields[1].definition.index).toBe(1);
    expect(formArray.fields[2]).toBe(fields[3]);
    expect(formArray.fields[2].definition.index).toBe(2);
    expect(formArray.control.removeAt).toHaveBeenCalledWith(1);
    expect(formArray.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).not.toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
    expect(fields[2].destroy).not.toHaveBeenCalled();
    expect(fields[3].destroy).not.toHaveBeenCalled();
  });

  it('does not remove field if index is invalid', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);

    spyOn(formArray.fields, 'splice');
    spyOn(formArray.model, 'splice');
    spyOn(formArray.control, 'removeAt');
    spyOn(formArray.control, 'markAsTouched');

    formArray.removeField(1);

    expect(formArray.fields.splice).not.toHaveBeenCalled();
    expect(formArray.model.splice).not.toHaveBeenCalled();
    expect(formArray.control.removeAt).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('clears fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy(): void {} }
    ];

    spyOn(formArray.control, 'clear');
    spyOn(formArray.control, 'markAsTouched');
    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formArray.initElements([ ...fields ]);
    formArray.clearFields();

    expect(formArray.length).toBe(0);
    expect(formArray.elements).toBe(formArray.fields as DynamicFormElement[]);
    expect(formArray.fields).toEqual([]);
    expect(formArray.control.clear).toHaveBeenCalled();
    expect(formArray.control.markAsTouched).toHaveBeenCalled();
    expect(fields[0].destroy).toHaveBeenCalled();
    expect(fields[1].destroy).toHaveBeenCalled();
  });

  it('does not clear fields if length is zero', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);

    spyOn(formArray.control, 'clear');
    spyOn(formArray.control, 'markAsTouched');

    formArray.clearFields();

    expect(formArray.control.clear).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('moves field down', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: { index: 0 }, control: new FormControl() },
      <DynamicFormField>{ classType: 'field', definition: { index: 1 }, control: new FormControl() }
    ];

    formArray.initElements([ ...fields ]);

    spyOn(formArray.control, 'removeAt').and.callThrough();
    spyOn(formArray.control, 'insert').and.callThrough();
    spyOn(formArray.control, 'markAsTouched');

    formArray.moveFieldDown(0);

    expect(formArray.elements).toBe(formArray.fields as DynamicFormElement[]);
    expect(formArray.fields).toEqual([ fields[1], fields[0] ]);
    expect(formArray.fields[0].definition.index).toBe(0);
    expect(formArray.fields[1].definition.index).toBe(1);
    expect(formArray.control.removeAt).toHaveBeenCalledWith(0);
    expect(formArray.control.insert).toHaveBeenCalledWith(1, fields[0].control);
    expect(formArray.control.markAsTouched).toHaveBeenCalled();
  });

  it('does not move field down', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: { index: 0 }, control: new FormControl() },
    ];

    formArray.initElements(fields);

    spyOn(formArray.control, 'removeAt').and.callThrough();
    spyOn(formArray.control, 'insert').and.callThrough();
    spyOn(formArray.control, 'markAsTouched');

    formArray.moveFieldDown(0);

    expect(formArray.elements).toBe(formArray.fields as DynamicFormElement[]);
    expect(formArray.fields).toEqual([ fields[0] ]);
    expect(formArray.control.removeAt).not.toHaveBeenCalled();
    expect(formArray.control.insert).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('moves field up', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: { index: 0 }, control: new FormControl() },
      <DynamicFormField>{ classType: 'field', definition: { index: 1 }, control: new FormControl() }
    ];

    formArray.initElements([ ...fields ]);

    spyOn(formArray.control, 'removeAt').and.callThrough();
    spyOn(formArray.control, 'insert').and.callThrough();
    spyOn(formArray.control, 'markAsTouched');

    formArray.moveFieldUp(1);

    expect(formArray.elements).toBe(formArray.fields as DynamicFormElement[]);
    expect(formArray.fields).toEqual([ fields[1], fields[0] ]);
    expect(formArray.control.removeAt).toHaveBeenCalledWith(1);
    expect(formArray.control.insert).toHaveBeenCalledWith(0, fields[1].control);
    expect(formArray.control.markAsTouched).toHaveBeenCalled();
  });

  it('does not move field up', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: { index: 0 }, control: new FormControl() },
    ];

    formArray.initElements(fields);

    spyOn(formArray.control, 'removeAt').and.callThrough();
    spyOn(formArray.control, 'insert').and.callThrough();
    spyOn(formArray.control, 'markAsTouched');

    formArray.moveFieldUp(0);

    expect(formArray.elements).toBe(formArray.fields as DynamicFormElement[]);
    expect(formArray.fields).toEqual([ fields[0] ]);
    expect(formArray.control.removeAt).not.toHaveBeenCalled();
    expect(formArray.control.insert).not.toHaveBeenCalled();
    expect(formArray.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('check calls check of all fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), check: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), check: () => {} }
    ];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    formArray.initElements(fields);
    formArray.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), destroy: () => {} }
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formArray.initElements(fields);
    formArray.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), reset: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), reset: () => {} }
    ];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    formArray.initElements(fields);
    formArray.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls resetDefault of all fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} }
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formArray.initElements(fields);
    formArray.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(1);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls patchValue of field if default value', () => {
    const defaultValue = [ { value: 0 }, { value: 1 } ];
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {}, defaultValue };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), resetDefault: () => {} }
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formArray.initElements(fields);
    formArray.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(0);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(0);
  });

  it('validate calls validate of all fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), validate: () => {} },
      <DynamicFormField>{ classType: 'field', definition: {}, control: new FormControl(), validate: () => {} }
    ];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    formArray.initElements(fields);
    formArray.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
