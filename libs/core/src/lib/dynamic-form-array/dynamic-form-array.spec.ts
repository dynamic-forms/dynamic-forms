import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

describe('DynamicFormArray', () => {
  it('new instance', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormArrayTemplate>{ key: 'key', fields: [] };
    const formArray = new DynamicFormArray(form, form, template);

    expect(formArray.path).toBe('key');
    expect(formArray.root).toBe(form);
    expect(formArray.parent).toBe(form);
    expect(formArray.template).toBe(template);
    expect(formArray.model).toEqual([]);
    expect(formArray.control).toBeDefined();
    expect(formArray.fields).toBeDefined();

    expect(form.model).toEqual({ key: [] });
  });

  it('sets fields', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormArrayTemplate>{ key: 'key', fields: [] };
    const formArray = new DynamicFormArray(form, form, template);
    const fields = [ <DynamicFormField>{} ];

    formArray.setFields(fields);

    expect(formArray.fields).toBe(fields);
  });

  it('sets fields to empty array', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormArrayTemplate>{ key: 'key', fields: [] };
    const formArray = new DynamicFormArray(form, form, template);

    formArray.setFields(null);

    expect(formArray.fields).toEqual([]);
  });

  it('check calls check of all fields', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormArrayTemplate>{ key: 'key', fields: [] };
    const formArray = new DynamicFormArray(form, form, template);
    const fields = [<DynamicFormField>{ check: () => {} }, <DynamicFormField>{ check: () => {} }];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    formArray.setFields(fields);
    formArray.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const form = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormArrayTemplate>{ key: 'key', fields: [] };
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
