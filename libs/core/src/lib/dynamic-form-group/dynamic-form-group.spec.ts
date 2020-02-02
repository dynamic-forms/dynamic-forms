import { FormControl } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';

describe('DynamicFormGroup', () => {
  it('new instance', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);

    expect(formGroup.type).toBe('field');
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

  it('sets model to default value', () => {
    const defaultValue = { value: 0 };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] }, {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [], defaultValue };
    const formGroup = new DynamicFormGroup(form, form, definition);

    expect(formGroup.model).toEqual(defaultValue);
  });

  it('sets elements and fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , { key: {} });
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);
    const elements = [
      <DynamicFormElement>{ type: 'element' },
      <DynamicFormField>{ type: 'field', definition: { key: 'key1' }, control: new FormControl() },
      <DynamicFormElement>{ type: 'element', elements: [
          <DynamicFormElement>{ type: 'element', elements: [
              <DynamicFormElement>{ type: 'element' },
              <DynamicFormField>{ type: 'field', definition: { key: 'key2' }, control: new FormControl() },
              <DynamicFormField>{ type: 'field', definition: { key: 'key3' }, control: new FormControl() }
            ]
          },
          <DynamicFormField>{ type: 'field', definition: { key: 'key4' }, control: new FormControl() },
          <DynamicFormElement>{ type: 'element' },
          <DynamicFormField>{ type: 'field', definition: { key: 'key4' }, control: new FormControl() }
        ]
      }
    ];
    const fields = <DynamicFormField[]>[
      elements[1],
      elements[2].elements[0].elements[1],
      elements[2].elements[0].elements[2],
      elements[2].elements[1],
      elements[2].elements[3]
    ];

    formGroup.setElements(elements);

    expect(formGroup.elements).toEqual(elements);
    expect(formGroup.fields).toEqual(fields);
  });

  it('sets elements and fields to empty array', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);

    formGroup.setElements(null);

    expect(formGroup.elements).toEqual([]);
    expect(formGroup.fields).toEqual([]);
  });

  it('check calls check of all fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , { key: {} });
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      <DynamicFormField>{ type: 'field', definition: { key: 'key1' }, control: new FormControl(), check: () => {} },
      <DynamicFormField>{ type: 'field', definition: { key: 'key2' }, control: new FormControl(), check: () => {} }
    ];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    formGroup.setElements(fields);
    formGroup.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('check sets disabled of control', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [] };
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
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      <DynamicFormField>{ type: 'field', definition: { key: 'key1' }, control: new FormControl(), destroy: () => {} },
      <DynamicFormField>{ type: 'field', definition: { key: 'key2' }, control: new FormControl(), destroy: () => {} }
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formGroup.setElements(fields);
    formGroup.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      <DynamicFormField>{ type: 'field', definition: { key: 'key1' }, control: new FormControl(), reset: () => {} },
      <DynamicFormField>{ type: 'field', definition: { key: 'key2' }, control: new FormControl(), reset: () => {} }
    ];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    formGroup.setElements(fields);
    formGroup.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls patchValue of field if default value', () => {
    const defaultValue = {};
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [], defaultValue };
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      <DynamicFormField>{ type: 'field', definition: { key: 'key1' }, control: new FormControl(), resetDefault: () => {} },
      <DynamicFormField>{ type: 'field', definition: { key: 'key2' }, control: new FormControl(), resetDefault: () => {} }
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formGroup.setElements(fields);
    formGroup.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(0);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(0);
  });

  it('resetDefault calls resetDefault of all fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      <DynamicFormField>{ type: 'field', definition: { key: 'key1' }, control: new FormControl(), resetDefault: () => {} },
      <DynamicFormField>{ type: 'field', definition: { key: 'key2' }, control: new FormControl(), resetDefault: () => {} }
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formGroup.setElements(fields);
    formGroup.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(1);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(1);
  });

  it('validate calls validate of all fields', () => {
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [] };
    const formGroup = new DynamicFormGroup(form, form, definition);
    const fields = [
      <DynamicFormField>{ type: 'field', definition: { key: 'key1' }, control: new FormControl(), validate: () => {} },
      <DynamicFormField>{ type: 'field', definition: { key: 'key2' }, control: new FormControl(), validate: () => {} }
    ];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    formGroup.setElements(fields);
    formGroup.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
