import { FormControl } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';

describe('DynamicFormArray', () => {
  it('new instance', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] }, {});
    const formArray = new DynamicFormArray(form, form, definition);

    expect(formArray.type).toBe('field');
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

  it('sets elements and fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const elements = [
      <DynamicFormElement>{ type: 'element', elements: [
          <DynamicFormElement>{ type: 'element', elements: [
            <DynamicFormElement>{ type: 'element' },
            <DynamicFormField>{ type: 'field', control: new FormControl() }
          ]},
          <DynamicFormField>{ type: 'field', control: new FormControl() }
        ]
      }
    ];
    const fields = <DynamicFormField[]>[
      elements[0].elements[0].elements[1],
      elements[0].elements[1]
    ];

    formArray.setElements(elements);

    expect(formArray.elements).toEqual(elements);
    expect(formArray.fields).toEqual(fields);
  });

  it('sets elements and fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const elements = [
      <DynamicFormElement>{ type: 'element' }
    ];

    formArray.setElements(elements);

    expect(formArray.elements).toEqual(elements);
    expect(formArray.fields).toEqual([]);
  });

  it('sets elements and fields to empty array', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);

    formArray.setElements(null);

    expect(formArray.elements).toEqual([]);
    expect(formArray.fields).toEqual([]);
  });

  it('check calls check of all fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ type: 'field', check: () => {}, control: new FormControl() },
      <DynamicFormField>{ type: 'field', check: () => {}, control: new FormControl() }
    ];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    formArray.setElements(fields);
    formArray.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('destroy calls destroy of all fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ type: 'field', destroy: () => {}, control: new FormControl() },
      <DynamicFormField>{ type: 'field', destroy: () => {}, control: new FormControl() }
    ];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    formArray.setElements(fields);
    formArray.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of all fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ type: 'field', reset: () => {}, control: new FormControl() },
      <DynamicFormField>{ type: 'field', reset: () => {}, control: new FormControl() }
    ];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    formArray.setElements(fields);
    formArray.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls resetDefault of all fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ type: 'field', resetDefault: () => {}, control: new FormControl() },
      <DynamicFormField>{ type: 'field', resetDefault: () => {}, control: new FormControl() }
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formArray.setElements(fields);
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
      <DynamicFormField>{ type: 'field', resetDefault: () => {}, control: new FormControl() },
      <DynamicFormField>{ type: 'field', resetDefault: () => {}, control: new FormControl() }
    ];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    formArray.setElements(fields);
    formArray.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(0);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(0);
  });

  it('validate calls validate of all fields', () => {
    const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {} };
    const form = new DynamicForm(<DynamicFormDefinition>{ elements: [] } , {});
    const formArray = new DynamicFormArray(form, form, definition);
    const fields = [
      <DynamicFormField>{ type: 'field', validate: () => {}, control: new FormControl() },
      <DynamicFormField>{ type: 'field', validate: () => {}, control: new FormControl() }
    ];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    formArray.setElements(fields);
    formArray.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
