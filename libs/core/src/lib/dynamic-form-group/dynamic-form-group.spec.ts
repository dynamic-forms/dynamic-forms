import { FormControl } from '@angular/forms';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

describe('DynamicFormGroup', () => {
  it('new instance', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', fields: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);

    expect(formGroup.path).toBe('key');
    expect(formGroup.root).toBe(form);
    expect(formGroup.parent).toBe(form);
    expect(formGroup.definition).toBe(definition);
    expect(formGroup.template).toBe(definition.template);
    expect(formGroup.model).toEqual({});
    expect(formGroup.control).toBeDefined();
    expect(formGroup.fields).toBeDefined();

    expect(form.model).toEqual({ key: {} });
  });

  it('sets fields', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , { key: {} });
    const template = <DynamicFormGroupTemplate>{ key: 'key', fields: [] };
    const formGroup = new DynamicFormGroup(form, form, template);
    const fields = [
      <DynamicFormField>{ template: { key: 'key' }, control: new FormControl() }
    ];

    formGroup.setFields(fields);

    expect(formGroup.fields).toBe(fields);
  });

  it('sets fields to empty array', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormGroupTemplate>{ key: 'key', fields: [] };
    const formGroup = new DynamicFormGroup(form, form, template);

    formGroup.setFields(null);

    expect(formGroup.fields).toEqual([]);
  });

  it('check calls check of all fields', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , { key: {} });
    const template = <DynamicFormGroupTemplate>{ key: 'key', fields: [] };
    const formGroup = new DynamicFormGroup(form, form, template);
    const fields = [
      <DynamicFormField>{ template: { key: 'key1' }, control: new FormControl(), check: () => {} },
      <DynamicFormField>{ template: { key: 'key2' }, control: new FormControl(), check: () => {} }
    ];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    formGroup.setFields(fields);
    formGroup.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormGroupTemplate>{ key: 'key', fields: [] };
    const formGroup = new DynamicFormGroup(form, form, template);
    const fields = [
      <DynamicFormField>{ template: { key: 'key1' }, control: new FormControl(), destroy: () => {} },
      <DynamicFormField>{ template: { key: 'key2' }, control: new FormControl(), destroy: () => {} }
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formGroup.setFields(fields);
    formGroup.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('check sets disabled of control', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormGroupTemplate>{ key: 'key', fields: [] };
    const formGroup = new DynamicFormGroup(form, form, template);

    expect(formGroup.control.disabled).toBe(false);

    template.disabled = true;
    formGroup.check();

    expect(formGroup.control.disabled).toBe(true);

    template.disabled = false;
    formGroup.check();
    expect(formGroup.control.disabled).toBe(false);
  });
});
