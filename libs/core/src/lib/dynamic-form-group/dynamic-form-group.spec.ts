import { FormControl, FormGroup } from '@angular/forms';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
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
    const definition = { key: 'key', index: 1, type: 'type', template: {}, children: [] } as DynamicFormGroupDefinition;
    const type = { type: 'type' } as DynamicFormFieldType;
    const group = new DynamicFormGroup(builder, form, form, definition, type);

    expect(group.root).toBe(form);
    expect(group.parent).toBe(form);
    expect(group.parentField).toBe(form);

    expect(group.definition).toBe(definition);
    expect(group.template).toBe(definition.template);
    expect(group.type).toBe(type);

    expect(group.settings).toBeTruthy();

    expect(group.key).toBe('key');
    expect(group.index).toBe(1);
    expect(group.path).toBe('key');
    expect(group.classType).toBe('field');
    expect(group.fieldClassType).toBe('group');

    expect(group.model).toEqual({});
    expect(group.value).toEqual({});
    expect(group.valid).toBeTrue();
    expect(group.status).toBe('VALID');
    expect(group.control).toBeInstanceOf(FormGroup);

    expect(group.children).toEqual([]);
    expect(group.fields).toEqual([]);
    expect(group.footerActions).toEqual([]);

    expect(form.model).toEqual({ key: {} });
  });

  it('sets model to default value', () => {
    const defaultValue = { value: 0 };
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [], defaultValue } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);

    expect(group.model).toEqual(defaultValue);
  });

  it('init calls calls initId, initExpressions, initChildren, initValidators, initHeaderActions and initFooterActions', () => {
    const root = { classType: 'field', model: {} } as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { key: 'key', template: {}, children: [], headerActions: [], footerActions: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, root, parent, definition, {} as DynamicFormFieldType);

    const initIdSpy = spyOn(group as any, 'initId').and.callThrough();
    const initExpressionsSpy = spyOn(group as any, 'initExpressions').and.callThrough();
    const getExpressionsSpy = spyOn(group as any, 'getExpressions').and.callThrough();
    const initChildrenSpy = spyOn(group as any, 'initChildren').and.callThrough();
    const getChildrenSpy = spyOn(group as any, 'getChildren').and.callThrough();
    const initValidatorsSpy = spyOn(group as any, 'initValidators').and.callThrough();
    const getValidatorsSpy = spyOn(group as any, 'getValidators').and.callThrough();
    const initHeaderActionsSpy = spyOn(group as any, 'initHeaderActions').and.callThrough();
    const getHeaderActionsSpy = spyOn(group as any, 'getHeaderActions').and.callThrough();
    const initFooterActionsSpy = spyOn(group as any, 'initFooterActions').and.callThrough();
    const getFooterActionsSpy = spyOn(group as any, 'getFooterActions').and.callThrough();

    group.init();

    expect(initIdSpy).toHaveBeenCalledTimes(1);
    expect(builder.getFieldId).toHaveBeenCalledOnceWith(group);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFieldExpressions).toHaveBeenCalledOnceWith(group);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormElements).toHaveBeenCalledOnceWith(root, group, definition.children);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createGroupValidators).toHaveBeenCalledOnceWith(group);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, group, definition.headerActions);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, group, definition.footerActions);
  });

  it('inits children and fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const children = [
      { classType: 'element' } as DynamicFormElement,
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl() } as unknown as DynamicFormField,
      {
        classType: 'element',
        children: [
          {
            classType: 'element',
            children: [
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

    group.init();

    expect(group.children).toBe(children);
    expect(group.fields).toEqual(fields);
  });

  it('inits children and fields with empty array', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);

    builder.createFormElements.and.returnValue(null);

    group.init();

    expect(group.children).toEqual([]);
    expect(group.fields).toEqual([]);
  });

  it('inits validators', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const validators = [{}] as DynamicFormGroupValidator[];

    builder.createGroupValidators.and.returnValue(validators);

    group.init();

    expect(group.validators).toBe(validators);
  });

  it('check calls check of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), check: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), check: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'check');
    spyOn(fields[1], 'check');

    builder.createFormElements.and.returnValue(fields);

    group.init();
    group.check();

    expect(fields[0].check).toHaveBeenCalledTimes(1);
    expect(fields[1].check).toHaveBeenCalledTimes(1);
  });

  it('check sets disabled of control', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);

    expect(group.control.disabled).toBe(false);

    definition.template.disabled = true;
    group.check();

    expect(group.control.disabled).toBe(true);

    definition.template.disabled = false;
    group.check();
    expect(group.control.disabled).toBe(false);
  });

  it('destroy calls destroy of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), destroy: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), destroy: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'destroy');
    spyOn(fields[1], 'destroy');

    builder.createFormElements.and.returnValue(fields);

    group.init();
    group.destroy();

    expect(fields[0].destroy).toHaveBeenCalledTimes(1);
    expect(fields[1].destroy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of form field', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), reset: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), reset: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'reset');
    spyOn(fields[1], 'reset');

    builder.createFormElements.and.returnValue(fields);

    group.init();
    group.reset();

    expect(fields[0].reset).toHaveBeenCalledTimes(1);
    expect(fields[1].reset).toHaveBeenCalledTimes(1);
  });

  it('resetEmpty calls reset of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), resetEmpty: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), resetEmpty: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'resetEmpty');
    spyOn(fields[1], 'resetEmpty');

    builder.createFormElements.and.returnValue(fields);

    group.init();
    group.resetEmpty();

    expect(fields[0].resetEmpty).toHaveBeenCalledTimes(1);
    expect(fields[1].resetEmpty).toHaveBeenCalledTimes(1);
  });

  it('resetDefault calls patchValue of field if default value', () => {
    const defaultValue = {};
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [], defaultValue } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), resetDefault: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), resetDefault: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    builder.createFormElements.and.returnValue(fields);

    group.init();
    group.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(0);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(0);
  });

  it('resetDefault calls resetDefault of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), resetDefault: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), resetDefault: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'resetDefault');
    spyOn(fields[1], 'resetDefault');

    builder.createFormElements.and.returnValue(fields);

    group.init();
    group.resetDefault();

    expect(fields[0].resetDefault).toHaveBeenCalledTimes(1);
    expect(fields[1].resetDefault).toHaveBeenCalledTimes(1);
  });

  it('validate calls validate of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), validate: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), validate: () => {} },
    ] as unknown[] as DynamicFormField[];

    spyOn(fields[0], 'validate');
    spyOn(fields[1], 'validate');

    builder.createFormElements.and.returnValue(fields);

    group.init();
    group.validate();

    expect(fields[0].validate).toHaveBeenCalledTimes(1);
    expect(fields[1].validate).toHaveBeenCalledTimes(1);
  });
});
