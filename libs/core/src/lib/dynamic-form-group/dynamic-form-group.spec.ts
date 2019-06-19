import { FormControl } from '@angular/forms';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';

describe('DynamicFormGroup', () => {
  it('new instance', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, fields: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);

    expect(formGroup.path).toBe('key');
    expect(formGroup.root).toBe(form);
    expect(formGroup.parent).toBe(form);
    expect(formGroup.definition).toBe(definition);
    expect(formGroup.model).toEqual({});
    expect(formGroup.control).toBeDefined();
    expect(formGroup.template).toBe(definition.template);
    expect(formGroup.fields).toBeDefined();

    expect(form.model).toEqual({ key: {} });
  });

  it('sets fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , { key: {} });
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, fields: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      <DynamicFormField>{ definition: { key: 'key' }, control: new FormControl() }
    ];

    formGroup.setFields(fields);

    expect(formGroup.fields).toBe(fields);
  });

  it('sets fields to empty array', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, fields: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);

    formGroup.setFields(null);

    expect(formGroup.fields).toEqual([]);
  });

  it('check calls check of all fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , { key: {} });
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, fields: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      <DynamicFormField>{ definition: { key: 'key1' }, control: new FormControl(), check: () => {} },
      <DynamicFormField>{ definition: { key: 'key2' }, control: new FormControl(), check: () => {} }
    ];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    formGroup.setFields(fields);
    formGroup.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, fields: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      <DynamicFormField>{ definition: { key: 'key1' }, control: new FormControl(), destroy: () => {} },
      <DynamicFormField>{ definition: { key: 'key2' }, control: new FormControl(), destroy: () => {} }
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formGroup.setFields(fields);
    formGroup.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('check sets disabled of control', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, fields: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);

    expect(formGroup.control.disabled).toBe(false);

    definition.template.disabled = true;
    formGroup.check();

    expect(formGroup.control.disabled).toBe(true);

    definition.template.disabled = false;
    formGroup.check();
    expect(formGroup.control.disabled).toBe(false);
  });
});
