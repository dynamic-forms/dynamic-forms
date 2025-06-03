import { FormControl, FormGroup } from '@angular/forms';
import { MockService } from 'ng-mocks';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupValidator } from './dynamic-form-group-validator';

describe('DynamicFormGroup', () => {
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder, { getFieldId: () => 'fieldId' });
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

    const getFieldIdSpy = spyOn(builder, 'getFieldId').and.callThrough();
    const createExpressionsSpy = spyOn(builder, 'createFieldExpressions').and.callThrough();
    const createElementsSpy = spyOn(builder, 'createFormElements').and.callThrough();
    const createValidatorsSpy = spyOn(builder, 'createGroupValidators').and.callThrough();
    const createActionsSpy = spyOn(builder, 'createFormActions').and.callThrough();

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
    expect(getFieldIdSpy).toHaveBeenCalledOnceWith(group);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(createExpressionsSpy).toHaveBeenCalledOnceWith(group);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(createElementsSpy).toHaveBeenCalledOnceWith(root, group, definition.children);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(createValidatorsSpy).toHaveBeenCalledOnceWith(group);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(createActionsSpy).toHaveBeenCalledWith(root, group, definition.headerActions);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(createActionsSpy).toHaveBeenCalledWith(root, group, definition.footerActions);
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

    spyOn(builder, 'createFormElements').and.returnValue(children);

    group.init();

    expect(group.children).toBe(children);
    expect(group.fields).toEqual(fields);
  });

  it('inits children and fields with empty array', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);

    spyOn(builder, 'createFormElements').and.returnValue(null);

    group.init();

    expect(group.children).toEqual([]);
    expect(group.fields).toEqual([]);
  });

  it('inits validators', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const validators = [{}] as DynamicFormGroupValidator[];

    spyOn(builder, 'createGroupValidators').and.returnValue(validators);

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

    const checkField0Spy = spyOn(fields[0], 'check');
    const checkField1Spy = spyOn(fields[1], 'check');

    spyOn(builder, 'createFormElements').and.returnValue(fields);

    group.init();
    group.check();

    expect(checkField0Spy).toHaveBeenCalledTimes(1);
    expect(checkField1Spy).toHaveBeenCalledTimes(1);
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

    const destroyField0Spy = spyOn(fields[0], 'destroy');
    const destroyField1Spy = spyOn(fields[1], 'destroy');

    spyOn(builder, 'createFormElements').and.returnValue(fields);

    group.init();
    group.destroy();

    expect(destroyField0Spy).toHaveBeenCalledTimes(1);
    expect(destroyField1Spy).toHaveBeenCalledTimes(1);
  });

  it('reset calls reset of form field', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), reset: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), reset: () => {} },
    ] as unknown[] as DynamicFormField[];

    const resetField0Spy = spyOn(fields[0], 'reset');
    const resetField1Spy = spyOn(fields[1], 'reset');

    spyOn(builder, 'createFormElements').and.returnValue(fields);

    group.init();
    group.reset();

    expect(resetField0Spy).toHaveBeenCalledTimes(1);
    expect(resetField1Spy).toHaveBeenCalledTimes(1);
  });

  it('resetEmpty calls reset of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), resetEmpty: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), resetEmpty: () => {} },
    ] as unknown[] as DynamicFormField[];

    const resetEmptyField0Spy = spyOn(fields[0], 'resetEmpty');
    const resetEmptyField1Spy = spyOn(fields[1], 'resetEmpty');

    spyOn(builder, 'createFormElements').and.returnValue(fields);

    group.init();
    group.resetEmpty();

    expect(resetEmptyField0Spy).toHaveBeenCalledTimes(1);
    expect(resetEmptyField1Spy).toHaveBeenCalledTimes(1);
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

    const resetDefaultField0Spy = spyOn(fields[0], 'resetDefault');
    const resetDefaultField1Spy = spyOn(fields[1], 'resetDefault');

    spyOn(builder, 'createFormElements').and.returnValue(fields);

    group.init();
    group.resetDefault();

    expect(resetDefaultField0Spy).toHaveBeenCalledTimes(0);
    expect(resetDefaultField1Spy).toHaveBeenCalledTimes(0);
  });

  it('resetDefault calls resetDefault of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), resetDefault: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), resetDefault: () => {} },
    ] as unknown[] as DynamicFormField[];

    const resetDefaultField0Spy = spyOn(fields[0], 'resetDefault');
    const resetDefaultField1Spy = spyOn(fields[1], 'resetDefault');

    spyOn(builder, 'createFormElements').and.returnValue(fields);

    group.init();
    group.resetDefault();

    expect(resetDefaultField0Spy).toHaveBeenCalledTimes(1);
    expect(resetDefaultField1Spy).toHaveBeenCalledTimes(1);
  });

  it('validate calls validate of all fields', () => {
    const form = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = new DynamicFormGroup(builder, form, form, definition, {} as DynamicFormFieldType);
    const fields = [
      { classType: 'field', definition: { key: 'key1' }, control: new FormControl(), validate: () => {} },
      { classType: 'field', definition: { key: 'key2' }, control: new FormControl(), validate: () => {} },
    ] as unknown[] as DynamicFormField[];

    const validateField0Spy = spyOn(fields[0], 'validate');
    const validateField1Spy = spyOn(fields[1], 'validate');

    spyOn(builder, 'createFormElements').and.returnValue(fields);

    group.init();
    group.validate();

    expect(validateField0Spy).toHaveBeenCalledTimes(1);
    expect(validateField1Spy).toHaveBeenCalledTimes(1);
  });
});
