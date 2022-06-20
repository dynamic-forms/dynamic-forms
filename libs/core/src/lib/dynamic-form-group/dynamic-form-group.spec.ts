import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../testing';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupValidator } from './dynamic-form-group-validator';

describe('DynamicFormGroup', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
    builder.getFieldId.and.returnValue('fieldId');
  });

  it('creates instance', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', index: 1, type: 'componentType', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);

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
    expect(formGroup.control).toBeInstanceOf(FormGroup);

    expect(formGroup.children).toEqual([]);
    expect(formGroup.fields).toEqual([]);
    expect(formGroup.footerActions).toEqual([]);

    expect(form.model).toEqual({ key: {} });
  });

  it('sets model to default value', () => {
    const defaultValue = { value: 0 };
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [], defaultValue } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);

    expect(formGroup.model).toEqual(defaultValue);
  });

  it('init calls calls initId, initExpressions, initChildren, initValidators, initHeaderActions and initFooterActions', () => {
    const root = { classType: 'field', model: {} } as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { key: 'key', template: {}, children: [], headerActions: [], footerActions: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, root, parent, definition);

    const initIdSpy = spyOn(formGroup as any, 'initId').and.callThrough();
    const initExpressionsSpy = spyOn(formGroup as any, 'initExpressions').and.callThrough();
    const getExpressionsSpy = spyOn(formGroup as any, 'getExpressions').and.callThrough();
    const initChildrenSpy = spyOn(formGroup as any, 'initChildren').and.callThrough();
    const getChildrenSpy = spyOn(formGroup as any, 'getChildren').and.callThrough();
    const initValidatorsSpy = spyOn(formGroup as any, 'initValidators').and.callThrough();
    const getValidatorsSpy = spyOn(formGroup as any, 'getValidators').and.callThrough();
    const initHeaderActionsSpy = spyOn(formGroup as any, 'initHeaderActions').and.callThrough();
    const getHeaderActionsSpy = spyOn(formGroup as any, 'getHeaderActions').and.callThrough();
    const initFooterActionsSpy = spyOn(formGroup as any, 'initFooterActions').and.callThrough();
    const getFooterActionsSpy = spyOn(formGroup as any, 'getFooterActions').and.callThrough();

    formGroup.init();

    expect(initIdSpy).toHaveBeenCalledTimes(1);
    expect(builder.getFieldId).toHaveBeenCalledOnceWith(formGroup);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFieldExpressions).toHaveBeenCalledOnceWith(formGroup);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormElements).toHaveBeenCalledOnceWith(root, formGroup, definition.children);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createGroupValidators).toHaveBeenCalledOnceWith(formGroup);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, formGroup, definition.headerActions);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, formGroup, definition.footerActions);
  });

  it('inits children and fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);
    const children = [
      { classType: 'element' } as DynamicFormElement,
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl() } as unknown as DynamicFormField,
      { classType: 'element', children: [
          { classType: 'element', children: [
              { classType: 'element' } as DynamicFormElement,
              { classType: 'field', definition: { key: 'key2' }, control: new FormControl() } as unknown as DynamicFormField,
              { classType: 'field', definition: { key: 'key3' }, control: new FormControl() } as unknown as DynamicFormField,
            ],
          } as DynamicFormElement,
          { classType: 'field', definition: { key: 'key4' }, control: new FormControl() } as unknown as DynamicFormField,
          { classType: 'element' } as DynamicFormElement,
          { classType: 'field', definition: { key: 'key4' }, control: new FormControl() } as unknown as DynamicFormField,
        ],
      } as DynamicFormElement,
    ];
    const fields = [
      children[1],
      children[2].children[0].children[1],
      children[2].children[0].children[2],
      children[2].children[1],
      children[2].children[3],
    ] as DynamicFormField[];

    builder.createFormElements.and.returnValue(children);

    formGroup.init();

    expect(formGroup.children).toBe(children);
    expect(formGroup.fields).toEqual(fields);
  });

  it('inits children and fields with empty array', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);

    builder.createFormElements.and.returnValue(null);

    formGroup.init();

    expect(formGroup.children).toEqual([]);
    expect(formGroup.fields).toEqual([]);
  });

  it('inits validators', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);
    const validators = [{}] as DynamicFormGroupValidator[];

    builder.createGroupValidators.and.returnValue(validators);

    formGroup.init();

    expect(formGroup.validators).toBe(validators);
  });

  it('check calls check of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), check: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), check: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    builder.createFormElements.and.returnValue(fields);

    formGroup.init();
    formGroup.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('check sets disabled of control', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);

    expect(formGroup.control.disabled).toBe(false);

    definition.template.disabled = true;
    formGroup.check();

    expect(formGroup.control.disabled).toBe(true);

    definition.template.disabled = false;
    formGroup.check();
    expect(formGroup.control.disabled).toBe(false);
  });

  it('destroy calls destroy of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormElements.and.returnValue(fields);

    formGroup.init();
    formGroup.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of form field', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), reset: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), reset: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    builder.createFormElements.and.returnValue(fields);

    formGroup.init();
    formGroup.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetEmpty calls reset of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), resetEmpty: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), resetEmpty: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'resetEmpty');
    spyOn(fields[1], 'resetEmpty');

    builder.createFormElements.and.returnValue(fields);

    formGroup.init();
    formGroup.resetEmpty();

    expect(fields[0].resetEmpty).toHaveBeenCalledTimes(1);
    expect(fields[1].resetEmpty).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls patchValue of field if default value', () => {
    const defaultValue = {};
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [], defaultValue } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), resetDefault: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), resetDefault: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    builder.createFormElements.and.returnValue(fields);

    formGroup.init();
    formGroup.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(0);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(0);
  });

  it('resetDefault calls resetDefault of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), resetDefault: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), resetDefault: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    builder.createFormElements.and.returnValue(fields);

    formGroup.init();
    formGroup.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(1);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(1);
  });

  it('validate calls validate of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const formGroup = new DynamicFormGroup(builder, form, form, definition);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), validate: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), validate: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    builder.createFormElements.and.returnValue(fields);

    formGroup.init();
    formGroup.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
