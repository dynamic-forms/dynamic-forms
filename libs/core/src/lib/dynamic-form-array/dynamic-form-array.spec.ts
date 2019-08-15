import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';

describe('DynamicFormArray', () => {
  it('new instance', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {}, fields: [] };
    const formArray = new DynamicFormArray(form, form, definition);

    expect(formArray.path).toBe('key');
    expect(formArray.root).toBe(form);
    expect(formArray.parent).toBe(form);
    expect(formArray.definition).toBe(definition);
    expect(formArray.model).toEqual([]);
    expect(formArray.control).toBeDefined();
    expect(formArray.fields).toBeDefined();
    expect(formArray.template).toBe(definition.template);

    expect(form.model).toEqual({ key: [] });
  });

  it('sets fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {}, fields: [] };
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [ <DynamicFormField>{} ];

    formArray.setFields(fields);

    expect(formArray.fields).toBe(fields);
  });

  it('sets fields to empty array', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {}, fields: [] };
    const formArray = new DynamicFormArray(form, form, definition);

    formArray.setFields(null);

    expect(formArray.fields).toEqual([]);
  });

  it('check calls check of all fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {}, fields: [] };
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ check: () => {} },
      <DynamicFormField>{ check: () => {} }
    ];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    formArray.setFields(fields);
    formArray.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const template = <DynamicFormArrayDefinition>{ key: 'key', template: {}, fields: [] };
    const formArray = new DynamicFormArray(form, form, template);
    const fields = [
      <DynamicFormField>{ destroy: () => {} },
      <DynamicFormField>{ destroy: () => {} }
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formArray.setFields(fields);
    formArray.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const template = <DynamicFormArrayDefinition>{ key: 'key', template: {}, fields: [] };
    const formArray = new DynamicFormArray(form, form, template);
    const fields = [
      <DynamicFormField>{ reset: () => {} },
      <DynamicFormField>{ reset: () => {} }
    ];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    formArray.setFields(fields);
    formArray.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls resetDefault of all fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const template = <DynamicFormArrayDefinition>{ key: 'key', template: {}, fields: [] };
    const formArray = new DynamicFormArray(form, form, template);
    const fields = [
      <DynamicFormField>{ resetDefault: () => {} },
      <DynamicFormField>{ resetDefault: () => {} }
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formArray.setFields(fields);
    formArray.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(1);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(1);
  });

  it('validate calls validate of all fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ fields: [] } , {});
    const template = <DynamicFormArrayDefinition>{ key: 'key', template: {}, fields: [] };
    const formArray = new DynamicFormArray(form, form, template);
    const fields = [
      <DynamicFormField>{ validate: () => {} },
      <DynamicFormField>{ validate: () => {} }
    ];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    formArray.setFields(fields);
    formArray.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
