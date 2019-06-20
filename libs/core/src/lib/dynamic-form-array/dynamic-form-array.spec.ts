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
    const fields = [<DynamicFormField>{ check: () => {} }, <DynamicFormField>{ check: () => {} }];

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
    const fields = [<DynamicFormField>{ destroy: () => {} }, <DynamicFormField>{ destroy: () => {} }];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formArray.setFields(fields);
    formArray.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });
});
