import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormActionFactory } from '../dynamic-form-action/dynamic-form-action-factory';
import { DynamicFormActionType } from '../dynamic-form-action/dynamic-form-action-type';
import { DYNAMIC_FORM_ACTION_TYPE_CONFIG, DynamicFormActionTypeConfig } from '../dynamic-form-action/dynamic-form-action-type-config';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { dynamicFormArrayFactory } from '../dynamic-form-array/dynamic-form-array-factory';
import { DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-array/dynamic-form-array-validator-type-config';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlAddOnDefinition, DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { dynamicFormControlFactory } from '../dynamic-form-control/dynamic-form-control-factory';
import { DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-control/dynamic-form-control-validator-type-config';
import { DynamicFormDictionaryDefinition } from '../dynamic-form-dictionary/dynamic-form-dictionary-definition';
import { dynamicFormDictionaryFactory } from '../dynamic-form-dictionary/dynamic-form-dictionary-factory';
import { DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator-type-config';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormElementFactory } from '../dynamic-form-element/dynamic-form-element-factory';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-type';
import { DYNAMIC_FORM_ELEMENT_TYPE_CONFIG, DynamicFormElementTypeConfig } from '../dynamic-form-element/dynamic-form-element-type-config';
import { DYNAMIC_FORM_ERROR_SETTINGS, DynamicFormErrorSettings } from '../dynamic-form-error/dynamic-form-error-settings';
import { DynamicFormErrorType } from '../dynamic-form-error/dynamic-form-error-type';
import { DynamicFormErrorHandler } from '../dynamic-form-error/dynamic-form-error.handler';
import { DynamicFormLogger } from '../dynamic-form-error/dynamic-form.logger';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DYNAMIC_FORM_FIELD_TYPE_CONFIG, DynamicFormFieldTypeConfig } from '../dynamic-form-field/dynamic-form-field-type-config';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { dynamicFormGroupFactory } from '../dynamic-form-group/dynamic-form-group-factory';
import { DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG } from '../dynamic-form-group/dynamic-form-group-validator-type-config';
import { DYNAMIC_FORM_INPUT_TYPE_CONFIG, DynamicFormInputTypeConfig } from '../dynamic-form-input/dynamic-form-input-type-config';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DYNAMIC_FORM_ID_BUILDER, DynamicFormIdBuilder } from './dynamic-form-id.builder';
import { DynamicFormBuilder } from './dynamic-form.builder';

describe('DynamicFormBuilder', () => {
  let builder: DynamicFormBuilder;
  let errorHandler: DynamicFormErrorHandler;
  let errorSettings: DynamicFormErrorSettings;
  let logger: DynamicFormLogger;

  const elementFactory: DynamicFormElementFactory = (_builder, root, parent, definition) =>
    _builder.createFormElement(root, parent, definition);

  const elementTypes: DynamicFormElementTypeConfig = [
    { libraryName: 'test', type: 'element', factory: null, component: null },
    { libraryName: 'test', type: 'element1', factory: elementFactory, component: null },
  ];

  const fieldTypes: DynamicFormFieldTypeConfig = [
    { libraryName: 'test', type: 'field', factory: null, component: null },
    { libraryName: 'test', type: 'group', factory: dynamicFormGroupFactory, component: null },
    { libraryName: 'test', type: 'control', factory: dynamicFormControlFactory, component: null },
    { libraryName: 'test', type: 'array', factory: dynamicFormArrayFactory, component: null },
    { libraryName: 'test', type: 'dictionary', factory: dynamicFormDictionaryFactory, component: null },
  ];

  const actionFactory: DynamicFormActionFactory = (_builder, root, parent, definition) =>
    _builder.createFormAction(root, parent, definition);

  const actionTypes: DynamicFormActionTypeConfig = [
    { libraryName: 'test', type: 'action', factory: null, component: null },
    { libraryName: 'test', type: 'action1', factory: actionFactory, component: null },
  ];

  const inputTypes: DynamicFormInputTypeConfig = [
    { libraryName: 'test', type: 'input', component: null },
    { libraryName: 'test', type: 'input1', component: null },
  ];

  const getForm = (model: any, references?: { [key: string]: DynamicFormElementDefinition }) => {
    const definition = { children: [], references } as DynamicFormDefinition;
    return new DynamicForm({} as any, definition, model);
  };

  const validatorTypes = [
    {
      type: 'required',
      factory: (field: any) => (!field ? { required: true } : null),
      libraryName: 'test',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        {
          provide: DYNAMIC_FORM_ELEMENT_TYPE_CONFIG,
          useValue: elementTypes,
        },
        {
          provide: DYNAMIC_FORM_FIELD_TYPE_CONFIG,
          useValue: fieldTypes,
        },
        {
          provide: DYNAMIC_FORM_ACTION_TYPE_CONFIG,
          useValue: actionTypes,
        },
        {
          provide: DYNAMIC_FORM_INPUT_TYPE_CONFIG,
          useValue: inputTypes,
        },
        {
          provide: DYNAMIC_FORM_ID_BUILDER,
          useValue: { createId: () => 'dynamic-form-id' },
        },
        {
          provide: DYNAMIC_FORM_GROUP_VALIDATOR_TYPE_CONFIG,
          useValue: validatorTypes,
        },
        {
          provide: DYNAMIC_FORM_CONTROL_VALIDATOR_TYPE_CONFIG,
          useValue: validatorTypes,
        },
        {
          provide: DYNAMIC_FORM_ARRAY_VALIDATOR_TYPE_CONFIG,
          useValue: validatorTypes,
        },
        {
          provide: DYNAMIC_FORM_DICTIONARY_VALIDATOR_TYPE_CONFIG,
          useValue: validatorTypes,
        },
        {
          provide: DYNAMIC_FORM_ERROR_SETTINGS,
          useValue: { throw: false },
        },
        DynamicFormConfigService,
        DynamicFormExpressionBuilder,
        DynamicFormEvaluationBuilder,
        DynamicFormValidationBuilder,
        DynamicFormErrorHandler,
        DynamicFormLogger,
        DynamicFormBuilder,
      ],
    });

    builder = TestBed.inject(DynamicFormBuilder);
    errorHandler = TestBed.inject(DynamicFormErrorHandler);
    errorSettings = TestBed.inject(DYNAMIC_FORM_ERROR_SETTINGS);
    logger = TestBed.inject(DynamicFormLogger);
  });

  it('throws error creating DynamicForm if error handler is throwing', () => {
    errorSettings.throw = true;
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const definition = { children: [{}] } as DynamicFormDefinition;

    expect(() => builder.createForm(definition, {})).toThrowError();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.ClassType, 'Class type undefined is not defined');
  });

  it('creates DynamicForm with empty children if error handler is not throwing', () => {
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const definition = { children: [{}] } as DynamicFormDefinition;
    const model = {};
    const form = builder.createForm(definition, model);

    expect(form.children).toEqual([]);
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.ClassType, 'Class type undefined is not defined');
  });

  it('creates DynamicForm', () => {
    const definition = { template: {}, children: [] } as DynamicFormDefinition;
    const model = {};
    const form = builder.createForm(definition, model);

    expect(form.root).toBe(form);
    expect(form.parent).toBeNull();
    expect(form.definition).toBe(definition);
    expect(form.template).toBe(definition.template);

    expect(form.children).toEqual([]);
    expect(form.fields).toEqual([]);

    expect(form.headerActions).toEqual([]);
    expect(form.footerActions).toEqual([]);

    expect(form.model).toBe(model);
    expect(form.control).toBeTruthy();
    expect(form.control.validator).toBeNull();
  });

  it('creates DynamicForm with validator', () => {
    const model = {};
    const definition = {
      template: {
        validation: {
          required: true,
        },
      },
      children: [],
    } as DynamicFormDefinition;
    const form = builder.createForm(definition, model);

    expect(form.validators.length).toBeTruthy();
    expect(form.control.validator).toBeTruthy();
  });

  it('initializes DynamicForm', () => {
    const form = { check: () => {} } as DynamicForm;

    spyOn(form, 'check').and.callThrough();
    spyOn(builder, 'createForm').and.returnValue(form);

    const definition = { template: {}, children: [] } as DynamicFormDefinition;
    const model = {};
    const formCreated = builder.initForm(definition, model);

    expect(form).toEqual(formCreated);
    expect(form.check).toHaveBeenCalledTimes(1);
    expect(builder.createForm).toHaveBeenCalledWith(definition, model);
  });

  it('creates DynamicForm including DynamicFormElement', () => {
    const definition = {
      children: [{ type: 'element', template: {} } as DynamicFormElementDefinition],
    } as DynamicFormDefinition;
    const form = builder.createForm(definition, {});

    expect(form.children.length).toBe(1);
    expect(form.fields.length).toBe(0);
    expect(form.headerActions.length).toBe(0);
    expect(form.footerActions.length).toBe(0);
    expect(form.model).toEqual({});
  });

  it('creates DynamicForm including DynamicFormControl', () => {
    const definition = {
      children: [{ key: 'key', type: 'control', template: {} } as DynamicFormControlDefinition],
    } as DynamicFormDefinition;
    const form = builder.createForm(definition, {});

    expect(form.children.length).toBe(1);
    expect(form.fields.length).toBe(1);
    expect(form.headerActions.length).toBe(0);
    expect(form.footerActions.length).toBe(0);
    expect(form.model).toEqual({ key: null });
  });

  it('creates DynamicForm including DynamicFormGroup', () => {
    const definition = {
      children: [{ key: 'key', type: 'group', template: {} } as DynamicFormGroupDefinition],
    } as DynamicFormDefinition;
    const form = builder.createForm(definition, {});

    expect(form.children.length).toBe(1);
    expect(form.fields.length).toBe(1);
    expect(form.headerActions.length).toBe(0);
    expect(form.footerActions.length).toBe(0);
    expect(form.model).toEqual({ key: {} });
  });

  it('creates DynamicForm including DynamicFormArray', () => {
    const definition = {
      children: [{ key: 'key', type: 'array', template: {} } as DynamicFormArrayDefinition],
    } as DynamicFormDefinition;
    const form = builder.createForm(definition, {});

    expect(form.children.length).toBe(1);
    expect(form.fields.length).toBe(1);
    expect(form.headerActions.length).toBe(0);
    expect(form.footerActions.length).toBe(0);
    expect(form.model).toEqual({ key: [] });
  });

  it('creates DynamicForm including DynamicFormDictionary', () => {
    const definition = {
      children: [{ key: 'key', type: 'dictionary', template: {} } as DynamicFormDictionaryDefinition],
    } as DynamicFormDefinition;
    const form = builder.createForm(definition, {});

    expect(form.children.length).toBe(1);
    expect(form.fields.length).toBe(1);
    expect(form.headerActions.length).toBe(0);
    expect(form.footerActions.length).toBe(0);
    expect(form.model).toEqual({ key: {} });
  });

  it('creates DynamicForm including DynamicFormAction in children', () => {
    const definition = {
      children: [{ type: 'action', template: {} } as DynamicFormActionDefinition],
    } as DynamicFormDefinition;
    const form = builder.createForm(definition, {});

    expect(form.children.length).toBe(1);
    expect(form.fields.length).toBe(0);
    expect(form.headerActions.length).toBe(0);
    expect(form.footerActions.length).toBe(0);
    expect(form.model).toEqual({});
  });

  it('creates DynamicForm including DynamicFormAction in header actions', () => {
    const definition = {
      headerActions: [{ type: 'action', template: {} } as DynamicFormActionDefinition],
    } as DynamicFormDefinition;
    const form = builder.createForm(definition, {});

    expect(form.children.length).toBe(0);
    expect(form.fields.length).toBe(0);
    expect(form.headerActions.length).toBe(1);
    expect(form.footerActions.length).toBe(0);
    expect(form.model).toEqual({});
  });

  it('creates DynamicForm including DynamicFormAction in footer actions', () => {
    const definition = {
      footerActions: [{ type: 'action', template: {} } as DynamicFormActionDefinition],
    } as DynamicFormDefinition;
    const form = builder.createForm(definition, {});

    expect(form.children.length).toBe(0);
    expect(form.fields.length).toBe(0);
    expect(form.headerActions.length).toBe(0);
    expect(form.footerActions.length).toBe(1);
    expect(form.model).toEqual({});
  });

  it('throws error creating DynamicFormElement if error handler is throwing', () => {
    errorSettings.throw = true;
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormElementDefinition;

    expect(() => builder.createFormElement(form, form, definition)).toThrowError();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.ElementType, 'Element type undefined is not defined');
  });

  it('creates DynamicFormElement being undefined if error handler is not throwing', () => {
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormElementDefinition;
    const element = builder.createFormElement(form, form, definition);

    expect(element).toBeUndefined();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.ElementType, 'Element type undefined is not defined');
  });

  it('creates DynamicFormElement', () => {
    const model = {};
    const form = getForm(model);
    const definition = { type: 'element', template: {} } as DynamicFormElementDefinition;
    const element = builder.createFormElement(form, form, definition);

    expect(element.definition).toBe(definition);
    expect(element.template).toBe(definition.template);
  });

  it('throws error creating DynamicFormControl if error handler is throwing', () => {
    errorSettings.throw = true;
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormControlDefinition;

    expect(() => builder.createFormControl(form, form, definition)).toThrowError();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.FieldType, 'Field type undefined is not defined');
  });

  it('creates DynamicFormControl being undefined if error handler is not throwing', () => {
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormControlDefinition;
    const control = builder.createFormControl(form, form, definition);

    expect(control).toBeUndefined();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.FieldType, 'Field type undefined is not defined');
  });

  it('creates DynamicFormControl', () => {
    const model = {};
    const form = getForm(model);
    const definition = { key: 'key', type: 'control', template: { input: {} } } as DynamicFormControlDefinition;
    const control = builder.createFormControl(form, form, definition);

    expect(control.root).toBe(form);
    expect(control.parent).toBe(form);
    expect(control.definition).toBe(definition);
    expect(control.template).toBe(definition.template);

    expect(control.control).toBeTruthy();
    expect(control.control.validator).toBeNull();
  });

  it('creates DynamicFormControl with validator', () => {
    const model = {};
    const form = getForm(model);
    const definition = {
      key: 'key',
      type: 'control',
      template: {
        input: {
          type: 'email',
        },
        validation: {
          required: true,
          email: false,
          get pattern(): boolean {
            return false;
          },
          minLength: null,
          maxLength: undefined,
        },
      },
    } as DynamicFormControlDefinition;
    const control = builder.createFormControl(form, form, definition);

    expect(control.validators.length).toBeTruthy();
    expect(control.control.validator).toBeTruthy();
  });

  it('throws error creating DynamicFormGroup if error handler is throwing', () => {
    errorSettings.throw = true;
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormGroupDefinition;

    expect(() => builder.createFormGroup(form, form, definition)).toThrowError();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.FieldType, 'Field type undefined is not defined');
  });

  it('creates DynamicFormGroup being undefined if error handler is not throwing', () => {
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormGroupDefinition;
    const group = builder.createFormGroup(form, form, definition);

    expect(group).toBeUndefined();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.FieldType, 'Field type undefined is not defined');
  });

  it('creates DynamicFormGroup', () => {
    const model = {};
    const form = getForm(model);
    const definition = { key: 'key', type: 'group', template: {}, children: [] } as DynamicFormGroupDefinition;
    const group = builder.createFormGroup(form, form, definition);

    expect(group.root).toBe(form);
    expect(group.parent).toBe(form);
    expect(group.definition).toBe(definition);
    expect(group.template).toBe(definition.template);

    expect(group.control).toBeTruthy();
    expect(group.control.validator).toBeNull();

    expect(group.fields).toBeTruthy();
  });

  it('creates DynamicFormGroup with validator', () => {
    const model = {};
    const form = getForm(model);
    const definition = {
      key: 'key',
      type: 'group',
      template: {
        validation: {
          required: true,
        },
      },
    } as DynamicFormGroupDefinition;
    const group = builder.createFormGroup(form, form, definition);

    expect(group.validators.length).toBeTruthy();
    expect(group.control.validator).toBeTruthy();
  });

  it('throws error creating DynamicFormArray if error handler is throwing', () => {
    errorSettings.throw = true;
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormArrayDefinition;

    expect(() => builder.createFormArray(form, form, definition)).toThrowError();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.FieldType, 'Field type undefined is not defined');
  });

  it('creates DynamicFormArray being undefined if error handler is not throwing', () => {
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormArrayDefinition;
    const array = builder.createFormArray(form, form, definition);

    expect(array).toBeUndefined();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.FieldType, 'Field type undefined is not defined');
  });

  it('creates DynamicFormArray', () => {
    const model = { key: [{}, {}] };
    const form = getForm(model);
    const definitionTemplate = { type: 'control' } as DynamicFormFieldDefinition;
    const definition = { key: 'key', type: 'array', template: {}, definitionTemplate } as DynamicFormArrayDefinition;
    const array = builder.createFormArray(form, form, definition);

    expect(array.root).toBe(form);
    expect(array.parent).toBe(form);
    expect(array.definition).toBe(definition);
    expect(array.template).toBe(definition.template);

    expect(array.control).toBeTruthy();
    expect(array.control.validator).toBeNull();

    expect(array.children).toBeTruthy();
    expect(array.children.length).toBe(2);
    expect(array.children[0].key).toBe('0');
    expect(array.children[0].index).toBe(0);
    expect(array.children[1].key).toBe('1');
    expect(array.children[1].index).toBe(1);
  });

  it('creates DynamicFormArray with definition template reference', () => {
    const model = { key: [{}, {}] };
    const form = getForm(model, { 'array-control': { type: 'control' } as DynamicFormFieldDefinition });
    const definitionTemplate = { reference: 'array-control' } as DynamicFormFieldDefinition;
    const definition = { key: 'key', type: 'array', template: {}, definitionTemplate } as DynamicFormArrayDefinition;
    const array = builder.createFormArray(form, form, definition);

    expect(array.root).toBe(form);
    expect(array.parent).toBe(form);
    expect(array.definition).toBe(definition);
    expect(array.template).toBe(definition.template);

    expect(array.control).toBeTruthy();
    expect(array.control.validator).toBeNull();

    expect(array.children).toBeTruthy();
    expect(array.children.length).toBe(2);
    expect(array.children[0].key).toBe('0');
    expect(array.children[0].index).toBe(0);
    expect(array.children[1].key).toBe('1');
    expect(array.children[1].index).toBe(1);
  });

  it('creates DynamicFormArray with validator', () => {
    const model = {};
    const form = getForm(model);
    const definition = {
      key: 'key',
      type: 'array',
      template: {
        validation: {
          required: true,
          minLength: true,
          maxLength: false,
        },
      },
    } as DynamicFormArrayDefinition;
    const array = builder.createFormArray(form, form, definition);

    expect(array.validators.length).toBeTruthy();
    expect(array.control.validator).toBeTruthy();
  });

  it('throws error creating DynamicFormDictionary if error handler is throwing', () => {
    errorSettings.throw = true;
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormDictionaryDefinition;

    expect(() => builder.createFormDictionary(form, form, definition)).toThrowError();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.FieldType, 'Field type undefined is not defined');
  });

  it('creates DynamicFormDictionary being undefined if error handler is not throwing', () => {
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormDictionaryDefinition;
    const dictionary = builder.createFormDictionary(form, form, definition);

    expect(dictionary).toBeUndefined();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.FieldType, 'Field type undefined is not defined');
  });

  it('creates DynamicFormDictionary', () => {
    const model = { key: { value1: undefined, value2: undefined } };
    const form = getForm(model);
    const definitionTemplate = { type: 'control' } as DynamicFormFieldDefinition;
    const definition = { key: 'key', type: 'dictionary', template: {}, definitionTemplate } as DynamicFormDictionaryDefinition;
    const dictionary = builder.createFormDictionary(form, form, definition);

    expect(dictionary.root).toBe(form);
    expect(dictionary.parent).toBe(form);
    expect(dictionary.definition).toBe(definition);
    expect(dictionary.template).toBe(definition.template);

    expect(dictionary.control).toBeTruthy();
    expect(dictionary.control.validator).toBeNull();

    expect(dictionary.children).toBeTruthy();
    expect(dictionary.children.length).toBe(2);
    expect(dictionary.children[0].key).toBe('value1');
    expect(dictionary.children[0].index).toBeUndefined();
    expect(dictionary.children[1].key).toBe('value2');
    expect(dictionary.children[1].index).toBeUndefined();
  });

  it('creates DynamicFormDictionary with definition template reference', () => {
    const model = { key: { value1: undefined, value2: undefined } };
    const form = getForm(model, { 'dictionary-control': { type: 'control' } as DynamicFormFieldDefinition });
    const definitionTemplate = { reference: 'dictionary-control' } as DynamicFormFieldDefinition;
    const definition = { key: 'key', type: 'dictionary', template: {}, definitionTemplate } as DynamicFormDictionaryDefinition;
    const dictionary = builder.createFormDictionary(form, form, definition);

    expect(dictionary.root).toBe(form);
    expect(dictionary.parent).toBe(form);
    expect(dictionary.definition).toBe(definition);
    expect(dictionary.template).toBe(definition.template);

    expect(dictionary.control).toBeTruthy();
    expect(dictionary.control.validator).toBeNull();

    expect(dictionary.children).toBeTruthy();
    expect(dictionary.children.length).toBe(2);
    expect(dictionary.children[0].key).toBe('value1');
    expect(dictionary.children[0].index).toBeUndefined();
    expect(dictionary.children[1].key).toBe('value2');
    expect(dictionary.children[1].index).toBeUndefined();
  });

  it('creates DynamicFormDictionary with validator', () => {
    const model = {};
    const form = getForm(model);
    const definition = {
      key: 'key',
      type: 'dictionary',
      template: {
        validation: {
          required: true,
          minLength: true,
          maxLength: false,
        },
      },
    } as DynamicFormDictionaryDefinition;
    const dictionary = builder.createFormDictionary(form, form, definition);

    expect(dictionary.validators.length).toBeTruthy();
    expect(dictionary.control.validator).toBeTruthy();
  });

  it('throws error creating DynamicFormAction if error handler is throwing', () => {
    errorSettings.throw = true;
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormActionDefinition;

    expect(() => builder.createFormAction(form, form, definition)).toThrowError();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.ActionType, 'Action type undefined is not defined');
  });

  it('creates DynamicFormAction being undefined if error handler is not throwing', () => {
    spyOn(errorHandler, 'handle').and.callThrough();
    spyOn(logger, 'error');

    const form = getForm({});
    const definition = { template: {} } as DynamicFormActionDefinition;
    const action = builder.createFormAction(form, form, definition);

    expect(action).toBeUndefined();
    expect(errorHandler.handle).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledOnceWith(DynamicFormErrorType.ActionType, 'Action type undefined is not defined');
  });

  it('creates DynamicFormAction', () => {
    const model = {};
    const form = getForm(model);
    const definition = { type: 'action', template: {} } as DynamicFormActionDefinition;
    const action = builder.createFormAction(form, form, definition);

    expect(action.definition).toBe(definition);
    expect(action.template).toBe(definition.template);
    expect(action.dialog).toBeUndefined();
  });

  it('creates DynamicFormAction including dialog form', () => {
    const model = {};
    const form = getForm(model);
    const dialogDefinition = { template: {} } as DynamicFormDefinition;
    const definition = { type: 'action', template: {}, dialogDefinition } as DynamicFormActionDefinition;
    const action = builder.createFormAction(form, form, definition);

    expect(action.definition).toBe(definition);
    expect(action.template).toBe(definition.template);
    expect(action.dialog).toBeTruthy();
    expect(action.dialog.definition).toBe(dialogDefinition);
    expect(action.dialog.template).toBe(dialogDefinition.template);
  });

  it('throws error creating DynamicFormElement if element type is not provided', () => {
    errorSettings.throw = true;

    const form = getForm({});
    const definition = { template: {} } as DynamicFormElementDefinition;

    expect(() => builder.createFormElementForFactory(form, form, definition)).toThrowError('Element type undefined is not defined');
  });

  it('creates DynamicFormElement being undefined if element type is not provided', () => {
    const model = {};
    const form = getForm(model);
    const definition = { type: 'element2', template: {} } as DynamicFormElementDefinition;
    const element = builder.createFormElementForFactory(form, form, definition);

    expect(element).toBeUndefined();
  });

  it('creates DynamicFormElement using default factory', () => {
    spyOn(builder, 'createFormElementForType').and.callThrough();

    const model = {};
    const form = getForm(model);
    const definition = { type: 'element', template: {} } as DynamicFormElementDefinition;
    const element = builder.createFormElementForFactory(form, form, definition);
    const elementType = elementTypes[0] as DynamicFormElementType;

    expect(builder.createFormElementForType).toHaveBeenCalledWith(form, form, definition, elementType);

    expect(element.definition).toBe(definition);
    expect(element.template).toBe(definition.template);
  });

  it('creates DynamicFormElement using factory of provided element type', () => {
    const model = {};
    const form = getForm(model);
    const definition = { type: 'element1', template: {} } as DynamicFormElementDefinition;
    const element = builder.createFormElementForFactory(form, form, definition);

    expect(element.definition).toBe(definition);
    expect(element.template).toBe(definition.template);
  });

  it('throws error creating DynamicFormField if field type is not provided', () => {
    errorSettings.throw = true;

    const form = getForm({});
    const definition = { template: {} } as DynamicFormFieldDefinition;

    expect(() => builder.createFormFieldForFactory(form, form, definition)).toThrowError('Field type undefined is not defined');
  });

  it('throws error creating DynamicFormField if field type does not provide factory', () => {
    errorSettings.throw = true;

    const form = getForm({});
    const definition = { type: 'field', template: {} } as DynamicFormFieldDefinition;

    expect(() => builder.createFormFieldForFactory(form, form, definition)).toThrowError('Field type field does not provide a factory');
  });

  it('creates DynamicFormField being undefined if field type is not provided', () => {
    const model = {};
    const form = getForm(model);
    const definition = { type: 'field2', template: {} } as DynamicFormFieldDefinition;
    const field = builder.createFormFieldForFactory(form, form, definition);

    expect(field).toBeUndefined();
  });

  it('creates DynamicFormField being undefined if field type does not provide factory', () => {
    const model = {};
    const form = getForm(model);
    const definition = { type: 'field', template: {} } as DynamicFormFieldDefinition;
    const field = builder.createFormFieldForFactory(form, form, definition);

    expect(field).toBeUndefined();
  });

  it('creates DynamicFormField using factory of provided field type', () => {
    const model = {};
    const form = getForm(model);
    const definition = { type: 'array', template: {} } as DynamicFormFieldDefinition;
    const field = builder.createFormFieldForFactory(form, form, definition);

    expect(field.definition).toBe(definition);
    expect(field.template).toBe(definition.template);
  });

  it('creates DynamicFormField using factory of provided field type', () => {
    const model = {};
    const form = getForm(model);
    const definition = { type: 'control', template: {} } as DynamicFormFieldDefinition;
    const field = builder.createFormFieldForFactory(form, form, definition);

    expect(field.definition).toBe(definition);
    expect(field.template).toBe(definition.template);
  });

  it('creates DynamicFormField using factory of provided field type', () => {
    const model = {};
    const form = getForm(model);
    const definition = { type: 'group', template: {} } as DynamicFormFieldDefinition;
    const field = builder.createFormFieldForFactory(form, form, definition);

    expect(field.definition).toBe(definition);
    expect(field.template).toBe(definition.template);
  });

  it('throws error creating DynamicFormAction if action type is not provided', () => {
    errorSettings.throw = true;

    const form = getForm({});
    const definition = { template: {} } as DynamicFormActionDefinition;

    expect(() => builder.createFormActionForFactory(form, form, definition)).toThrowError('Action type undefined is not defined');
  });

  it('creates DynamicFormAction being undefined if action type is not provided', () => {
    const model = {};
    const form = getForm(model);
    const definition = { type: 'field2', template: {} } as DynamicFormActionDefinition;
    const action = builder.createFormActionForFactory(form, form, definition);

    expect(action).toBeUndefined();
  });

  it('creates DynamicFormAction using default factory', () => {
    spyOn(builder, 'createFormActionForType').and.callThrough();

    const model = {};
    const form = getForm(model);
    const definition = { type: 'action', template: {} } as DynamicFormActionDefinition;
    const action = builder.createFormActionForFactory(form, form, definition);
    const actionType = actionTypes[0] as DynamicFormActionType;

    expect(builder.createFormActionForType).toHaveBeenCalledWith(form, form, definition, actionType);

    expect(action.definition).toBe(definition);
    expect(action.template).toBe(definition.template);
  });

  it('creates DynamicFormAction using factory of provided element type', () => {
    const model = {};
    const form = getForm(model);
    const definition = { type: 'action1', template: {} } as DynamicFormActionDefinition;
    const action = builder.createFormActionForFactory(form, form, definition);

    expect(action.definition).toBe(definition);
    expect(action.template).toBe(definition.template);
  });

  it('creates add-on being undefined if definition is undefined', () => {
    const form = {} as DynamicForm;
    const control = {} as DynamicFormControl;
    const addOn = builder.createFormControlAddOn(form, control, undefined);

    expect(addOn).toBeUndefined();
  });

  it('throws error creating add-on if definition type is not supported ', () => {
    errorSettings.throw = true;

    const form = {} as DynamicForm;
    const control = {} as DynamicFormControl;
    const definition = { type: 'field' } as DynamicFormControlAddOnDefinition;

    expect(() => builder.createFormControlAddOn(form, control, definition)).toThrowError(
      'Class type field is not defined or not supported for add-on',
    );
  });

  it('creates add-on being undefined if definition type is not supported ', () => {
    const form = {} as DynamicForm;
    const control = {} as DynamicFormControl;
    const definition = { type: 'field' } as DynamicFormControlAddOnDefinition;
    const addOn = builder.createFormControlAddOn(form, control, definition);

    expect(addOn).toBeUndefined();
  });

  it('creates add-on being undefined if definition is undefined', () => {
    const form = {} as DynamicForm;
    const control = {} as DynamicFormControl;
    const addOn = builder.createFormControlAddOn(form, control, undefined);

    expect(addOn).toBeUndefined();
  });

  it('creates DynamicFormElement add-on being undefined if definition is undefined', () => {
    const element = {} as DynamicFormElement;
    spyOn(builder, 'createFormElementForFactory').and.returnValue(element);

    const form = {} as DynamicForm;
    const control = {} as DynamicFormControl;
    const definition = { type: 'element' } as DynamicFormControlAddOnDefinition;
    const addOn = builder.createFormControlAddOn(form, control, definition);

    expect(addOn).toBe(element);
  });

  it('creates DynamicFormAction add-on being undefined if definition is undefined', () => {
    const action = {} as DynamicFormAction;
    spyOn(builder, 'createFormActionForFactory').and.returnValue(action);

    const form = {} as DynamicForm;
    const control = {} as DynamicFormControl;
    const definition = { type: 'action' } as DynamicFormControlAddOnDefinition;
    const addOn = builder.createFormControlAddOn(form, control, definition);

    expect(addOn).toBe(action);
  });

  it('getDefinition returns definition', () => {
    const definition = {} as DynamicFormElementDefinition;
    const result = builder.getDefinition(definition, null);

    expect(result).toBe(definition);
  });

  it('getDefinition returns merged definition from references', () => {
    const definitionRef = {
      type: 'type',
      template: {
        classNameWrapper: 'classNameWrapper',
      },
      children: [{ reference: 'refElement' }],
    } as DynamicFormElementDefinition;
    const definition = {
      reference: 'ref',
      template: {
        className: 'className',
      },
      expressions: {
        readonly: 'parent.readonly',
      },
      children: [{ template: { label: 'Element 1' } }, { reference: 'refElement', template: { label: 'Element 2' } }],
    } as DynamicFormElementDefinition;

    const references = { ref: definitionRef };
    const definitionRoot = { references, children: [] } as DynamicFormDefinition;
    const root = { definition: definitionRoot } as DynamicForm;
    const result = builder.getDefinition(definition, root);

    expect(result).toEqual({
      reference: 'ref',
      type: 'type',
      template: {
        className: 'className',
        classNameWrapper: 'classNameWrapper',
      },
      expressions: {
        readonly: 'parent.readonly',
      },
      children: [
        { reference: 'refElement', template: { label: 'Element 1' } },
        { reference: 'refElement', template: { label: 'Element 2' } },
      ],
    });
  });

  it('getDefinition throws if definition reference is not defined', () => {
    errorSettings.throw = true;

    const definition = { reference: 'ref' } as DynamicFormElementDefinition;
    const definitionRoot = { references: {}, children: [] } as DynamicFormDefinition;
    const root = { definition: definitionRoot } as DynamicForm;

    expect(() => builder.getDefinition(definition, root)).toThrowError('Definition reference ref is not defined');
  });

  it('getDefinition returns definition even if definition reference is not defined', () => {
    const definition = { reference: 'ref' } as DynamicFormElementDefinition;
    const definitionRoot = { references: {}, children: [] } as DynamicFormDefinition;
    const root = { definition: definitionRoot } as DynamicForm;

    const result = builder.getDefinition(definition, root);

    expect(result).toBe(definition);
  });

  it('getDefinitionClone returns merged definition from references', () => {
    const definitionRef = { type: 'type' } as DynamicFormElementDefinition;
    const definition = { reference: 'ref', template: { options: ['Value1', 'Value2'] } } as DynamicFormElementDefinition;

    const references = { ref: definitionRef };
    const definitionRoot = { references, children: [] } as DynamicFormDefinition;
    const root = { definition: definitionRoot } as DynamicForm;
    const result = builder.getDefinitionClone(definition, root);

    expect(result).toEqual({ reference: 'ref', type: 'type', template: { options: ['Value1', 'Value2'] } });
  });

  it('getDefinitionClone returns definition', () => {
    const definition = {} as DynamicFormElementDefinition;
    const result = builder.getDefinitionClone(definition, null);

    expect(result).toEqual(definition);
    expect(result).not.toBe(definition);
  });

  it('getDefinitionClone throws if definition reference is not defined', () => {
    errorSettings.throw = true;

    const definition = { reference: 'ref' } as DynamicFormElementDefinition;
    const definitionRoot = { references: {}, children: [] } as DynamicFormDefinition;
    const root = { definition: definitionRoot } as DynamicForm;

    expect(() => builder.getDefinitionClone(definition, root)).toThrowError('Definition reference ref is not defined');
  });

  it('getFieldId returns id from id builder', () => {
    const field = { settings: { autoGeneratedId: true } } as DynamicFormField;
    const id = builder.getFieldId(field);

    expect(id).toBe('dynamic-form-id');
  });

  it('getFieldId returns id from field', () => {
    const field = { id: 'dynamic-form-field-id', settings: { autoGeneratedId: true } } as DynamicFormField;
    const id = builder.getFieldId(field);

    expect(id).toBe('dynamic-form-field-id');
  });

  it('getActionId returns id from id builder', () => {
    const action = { parent: {}, template: { action: 'action' } } as DynamicFormAction;
    const id = builder.getActionId(action);

    expect(id).toBe('action-dynamic-form-id');
  });

  it('getActionId returns id from action', () => {
    const action = { id: 'dynamic-form-action-id' } as DynamicFormAction;
    const id = builder.getActionId(action);

    expect(id).toBe('dynamic-form-action-id');
  });

  describe('without DYNAMIC_FORM_ID_BUILDER', () => {
    it('creates ids', inject([DYNAMIC_FORM_ID_BUILDER], (idBuilder: DynamicFormIdBuilder) => {
      idBuilder.createId = null;

      const ids = [builder.createId(), builder.createId(), builder.createId()];

      expect(ids[0]).toBeTruthy();
      expect(ids[1]).toBeTruthy();
      expect(ids[2]).toBeTruthy();

      expect(ids[0]).not.toEqual(ids[1]);
      expect(ids[1]).not.toEqual(ids[2]);
    }));
  });
});
