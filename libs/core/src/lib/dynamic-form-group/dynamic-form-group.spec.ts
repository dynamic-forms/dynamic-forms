import { FormControl } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';

describe('DynamicFormGroup', () => {
  it('creates instance', () => {
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', index: 1, type: 'componentType', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(form, form, definition);

    expect(formGroup.root).toBe(form);
    expect(formGroup.parent).toBe(form);
    expect(formGroup.parentField).toBe(form);

    expect(formGroup.definition).toBe(definition);
    expect(formGroup.template).toBe(definition.template);

    expect(formGroup.settings).toBeTruthy();

    expect(formGroup.key).toBe('key');
    expect(formGroup.index).toBe(1);
    expect(formGroup.path).toBe('key');
    expect(formGroup.classType).toBe('field');
    expect(formGroup.fieldClassType).toBe('group');
    expect(formGroup.componentType).toBe('componentType');

    expect(formGroup.model).toEqual({});
    expect(formGroup.value).toEqual({});
    expect(formGroup.valid).toBeTrue();
    expect(formGroup.status).toBe('VALID');
    expect(formGroup.control).toBeTruthy();

    expect(formGroup.children).toEqual([]);
    expect(formGroup.fields).toEqual([]);
    expect(formGroup.footerActions).toEqual([]);

    expect(form.model).toEqual({ key: {} });
  });

  it('sets model to default value', () => {
    const defaultValue = { value: 0 };
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [], defaultValue } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(form, form, definition);

    expect(formGroup.model).toEqual(defaultValue);
  });

  it('inits children and fields', () => {
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(form, form, definition);
    const children = [
      { classType: 'element' } as DynamicFormElement,
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl() }  as DynamicFormField,
      { classType: 'element', children: [
          { classType: 'element', children: [
              { classType: 'element' } as DynamicFormElement,
              { classType: 'field', definition: { key: 'key2' }, control: new FormControl() } as DynamicFormField,
              { classType: 'field', definition: { key: 'key3' }, control: new FormControl() } as DynamicFormField
            ]
          } as DynamicFormElement,
          { classType: 'field', definition: { key: 'key4' }, control: new FormControl() } as DynamicFormField,
          { classType: 'element' } as DynamicFormElement,
          { classType: 'field', definition: { key: 'key4' }, control: new FormControl() } as DynamicFormField
        ]
      } as DynamicFormElement
    ];
    const fields = [
      children[1],
      children[2].children[0].children[1],
      children[2].children[0].children[2],
      children[2].children[1],
      children[2].children[3]
    ] as DynamicFormField[];

    formGroup.initChildren(children);

    expect(formGroup.children).toBe(children);
    expect(formGroup.fields).toEqual(fields);
  });

  it('inits children and fields with empty array', () => {
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(form, form, definition);

    formGroup.initChildren(null);

    expect(formGroup.children).toEqual([]);
    expect(formGroup.fields).toEqual([]);
  });

  it('check calls check of all fields', () => {
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), check: () => {} } as DynamicFormField,
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), check: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    formGroup.initChildren(fields);
    formGroup.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('check sets disabled of control', () => {
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(form, form, definition);

    expect(formGroup.control.disabled).toBe(false);

    definition.template.disabled = true;
    formGroup.check();

    expect(formGroup.control.disabled).toBe(true);

    definition.template.disabled = false;
    formGroup.check();
    expect(formGroup.control.disabled).toBe(false);
  });

  it('destroy calls destroy of all fields', () => {
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), destroy: () => {} } as DynamicFormField,
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), destroy: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formGroup.initChildren(fields);
    formGroup.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), reset: () => {} } as DynamicFormField,
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), reset: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    formGroup.initChildren(fields);
    formGroup.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls patchValue of field if default value', () => {
    const defaultValue = {};
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [], defaultValue } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), resetDefault: () => {} } as DynamicFormField,
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), resetDefault: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formGroup.initChildren(fields);
    formGroup.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(0);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(0);
  });

  it('resetDefault calls resetDefault of all fields', () => {
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), resetDefault: () => {} } as DynamicFormField,
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), resetDefault: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formGroup.initChildren(fields);
    formGroup.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(1);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(1);
  });

  it('validate calls validate of all fields', () => {
    const form = new DynamicForm({ children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), validate: () => {} } as DynamicFormField,
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), validate: () => {} } as DynamicFormField
    ];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    formGroup.initChildren(fields);
    formGroup.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
