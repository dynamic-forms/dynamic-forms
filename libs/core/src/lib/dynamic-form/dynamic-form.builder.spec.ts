import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormActionFactory } from '../dynamic-form-action/dynamic-form-action-factory';
import { DynamicFormActionTypes, DYNAMIC_FORM_ACTION_TYPES } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { dynamicFormArrayFactory } from '../dynamic-form-array/dynamic-form-array-factory';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DYNAMIC_FORM_LIBRARY } from '../dynamic-form-config/dynamic-form-library';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { dynamicFormControlFactory } from '../dynamic-form-control/dynamic-form-control-factory';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormElementFactory } from '../dynamic-form-element/dynamic-form-element-factory';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { dynamicFormGroupFactory } from '../dynamic-form-group/dynamic-form-group-factory';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormBuilder } from './dynamic-form.builder';

describe('DynamicFormBuilder', () => {
  const elementFactory: DynamicFormElementFactory =
    (builder, root, parent, definition) => builder.createFormElement(root, parent, definition);

  const elementTypes: DynamicFormElementTypes = [
    { libraryName: 'test', type: 'element', factory: null, component: null },
    { libraryName: 'test', type: 'element1', factory: elementFactory, component: null }
  ];

  const fieldTypes: DynamicFormFieldTypes = [
    { libraryName: 'test', type: 'field', factory: null, component: null },
    { libraryName: 'test', type: 'array', factory: dynamicFormArrayFactory, component: null },
    { libraryName: 'test', type: 'control', factory: dynamicFormControlFactory, component: null },
    { libraryName: 'test', type: 'group', factory: dynamicFormGroupFactory, component: null }
  ];

  const actionFactory: DynamicFormActionFactory =
    (builder, root, parent, definition) => builder.createFormAction(root, parent, definition);

  const actionTypes: DynamicFormActionTypes = [
    { libraryName: 'test', type: 'action', factory: null, component: null },
    { libraryName: 'test', type: 'action1', factory: actionFactory, component: null },
  ];

  const getForm = (model: any) => {
    const definition = <DynamicFormDefinition>{ elements: [] };
    return new DynamicForm(definition, model);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DYNAMIC_FORM_LIBRARY, useValue: { name: 'test' } },
        { provide: DYNAMIC_FORM_ELEMENT_TYPES, useValue: elementTypes },
        { provide: DYNAMIC_FORM_FIELD_TYPES, useValue: fieldTypes },
        { provide: DYNAMIC_FORM_ACTION_TYPES, useValue: actionTypes },
        DynamicFormConfigService,
        DynamicFormBuilder,
        DynamicFormExpressionBuilder,
        DynamicFormEvaluationBuilder,
        DynamicFormValidationBuilder
      ]
    });
  }));

  it('throws error creating DynamicForm',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{ elements: [ {} ] };

      expect(() => builder.createForm(definition, {})).toThrowError();
    })
  );

  it('creates DynamicForm',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{ template: {}, elements: [] };
      const model = {};
      const form = builder.createForm(definition, model);

      expect(form.root).toBe(form);
      expect(form.parent).toBeNull();
      expect(form.definition).toBe(definition);
      expect(form.template).toBe(definition.template);

      expect(form.elements).toEqual([]);
      expect(form.fields).toEqual([]);
      expect(form.actions).toEqual([]);

      expect(form.model).toBe(model);
      expect(form.control).toBeDefined();
    })
  );

  it('initializes DynamicForm',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = <DynamicForm>{ check: () => {} };

      spyOn(form, 'check').and.callThrough();
      spyOn(builder, 'createForm').and.returnValue(form);

      const definition = <DynamicFormDefinition>{ template: {}, elements: [] };
      const model = {};
      const formCreated = builder.initForm(definition, model);

      expect(form).toEqual(formCreated);
      expect(form.check).toHaveBeenCalledTimes(1);
      expect(builder.createForm).toHaveBeenCalledWith(definition, model);
    })
  );

  it('creates DynamicForm including DynamicFormElement',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        elements: [
          <DynamicFormElementDefinition>{ type: 'element', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(1);
      expect(form.fields.length).toBe(0);
      expect(form.actions.length).toBe(0);
      expect(form.model).toEqual({});
    })
  );

  it('creates DynamicForm including DynamicFormGroup',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        elements: [
          <DynamicFormGroupDefinition>{ key: 'key', type: 'group', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(1);
      expect(form.fields.length).toBe(1);
      expect(form.actions.length).toBe(0);
      expect(form.model).toEqual({ key: {} });
    })
  );

  it('creates DynamicForm including DynamicFormArray',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        elements: [
          <DynamicFormArrayDefinition>{ key: 'key', type: 'array', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(1);
      expect(form.fields.length).toBe(1);
      expect(form.actions.length).toBe(0);
      expect(form.model).toEqual({ key: [] });
    })
  );

  it('creates DynamicForm including DynamicFormControl',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        elements: [
          <DynamicFormControlDefinition>{ key: 'key', type: 'control', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(1);
      expect(form.fields.length).toBe(1);
      expect(form.actions.length).toBe(0);
      expect(form.model).toEqual({ key: null });
    })
  );

  it('creates DynamicForm including DynamicFormAction in elements',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        elements: [
          <DynamicFormActionDefinition>{ type: 'action', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(1);
      expect(form.fields.length).toBe(0);
      expect(form.actions.length).toBe(0);
      expect(form.model).toEqual({});
    })
  );

  it('creates DynamicForm including DynamicFormAction in actions',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{
        actions: [
          <DynamicFormActionDefinition>{ type: 'action', template: {} }
        ]
      };
      const form = builder.createForm(definition, {});

      expect(form.elements.length).toBe(0);
      expect(form.fields.length).toBe(0);
      expect(form.actions.length).toBe(1);
      expect(form.model).toEqual({});
    })
  );

  it('throws error creating DynamicFormElement',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormElementDefinition>{ template: {} };

      expect(() => builder.createFormElement(form, form, definition)).toThrowError('Element type undefined is not defined');
    })
  );

  it('creates DynamicFormElement',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormElementDefinition>{ type: 'element', template: {} };
      const formElement = builder.createFormElement(form, form, definition);

      expect(formElement.definition).toBe(definition);
      expect(formElement.template).toBe(definition.template);
    })
  );

  it('throws error creating DynamicFormGroup',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormGroupDefinition>{ template: {} };

      expect(() => builder.createFormGroup(form, form, definition)).toThrowError('Field type undefined is not defined');
    })
  );

  it('creates DynamicFormGroup',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormGroupDefinition>{ key: 'key', type: 'group', template: {}, elements: [] };
      const formGroup = builder.createFormGroup(form, form, definition);

      expect(formGroup.root).toBe(form);
      expect(formGroup.parent).toBe(form);
      expect(formGroup.definition).toBe(definition);
      expect(formGroup.template).toBe(definition.template);

      expect(formGroup.control).toBeDefined();
      expect(formGroup.fields).toBeDefined();
    })
  );

  it('throws error creating DynamicFormArray',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormArrayDefinition>{ template: {} };

      expect(() => builder.createFormArray(form, form, definition)).toThrowError('Field type undefined is not defined');
    })
  );

  it('creates DynamicFormArray',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = { key: [ {}, {} ] };
      const form = getForm(model);
      const definitionTemplate = <DynamicFormFieldDefinition>{ type: 'control' };
      const definition = <DynamicFormArrayDefinition>{ key: 'key', type: 'array', template: {}, definitionTemplate };
      const formArray = builder.createFormArray(form, form, definition);

      expect(formArray.root).toBe(form);
      expect(formArray.parent).toBe(form);
      expect(formArray.definition).toBe(definition);
      expect(formArray.template).toBe(definition.template);

      expect(formArray.control).toBeDefined();
      expect(formArray.elements).toBeDefined();
      expect(formArray.fields.length).toBe(2);
      expect(formArray.fields[0].definition.key).toBe('0');
      expect(formArray.fields[0].definition.index).toBe(0);
      expect(formArray.fields[0].definition.type).toBe('control');
      expect(formArray.fields[1].definition.key).toBe('1');
      expect(formArray.fields[1].definition.index).toBe(1);
      expect(formArray.fields[1].definition.type).toBe('control');
    })
  );

  it('throws error creating DynamicFormControl',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormControlDefinition>{ template: {} };

      expect(() => builder.createFormControl(form, form, definition)).toThrowError('Field type undefined is not defined');
    })
  );

  it('creates DynamicFormControl',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormControlDefinition>{ key: 'key', type: 'control', template: { input: {} } };
      const formControl = builder.createFormControl(form, form, definition);

      expect(formControl.root).toBe(form);
      expect(formControl.parent).toBe(form);
      expect(formControl.definition).toBe(definition);
      expect(formControl.template).toBe(definition.template);

      expect(formControl.control).toBeDefined();
      expect(formControl.control.validator).toBeNull();
    })
  );

  it('creates DynamicFormControl including DynamicFormValidation',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormControlDefinition>{
        key: 'key',
        type: 'control',
        template: {
          input: {
            type: 'email'
          },
          validation: {
            required: true,
            email: false,
            get pattern() { return false; },
            minLength: null,
            maxLength: undefined
          }
        }
      };
      const formControl = builder.createFormControl(form, form, definition);

      expect(formControl.control).toBeDefined();
      expect(formControl.control.validator).toBeDefined();
    })
  );

  it('throws error creating DynamicFormAction',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormActionDefinition>{ template: {} };

      expect(() => builder.createFormAction(form, form, definition)).toThrowError('Action type undefined is not defined');
    })
  );

  it('creates DynamicFormAction',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormActionDefinition>{ type: 'action', template: {} };
      const formElement = builder.createFormAction(form, form, definition);

      expect(formElement.definition).toBe(definition);
      expect(formElement.template).toBe(definition.template);
    })
  );

  it('creates DynamicFormElement using default factory',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      spyOn(builder, 'createFormElement').and.callThrough();

      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormElementDefinition>{ type: 'element', template: {} };
      const formElement = builder.createFormElementForFactory(form, form, definition);

      expect(builder.createFormElement).toHaveBeenCalledWith(form, form, definition);

      expect(formElement.definition).toBe(definition);
      expect(formElement.template).toBe(definition.template);
    })
  );

  it('creates DynamicFormElement using factory of provided element type',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormElementDefinition>{ type: 'element1', template: {} };
      const formElement = builder.createFormElementForFactory(form, form, definition);

      expect(formElement.definition).toBe(definition);
      expect(formElement.template).toBe(definition.template);
    })
  );

  it('throws error creating DynamicFormField if field type is not provided',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormFieldDefinition>{ template: {} };

      expect(() => builder.createFormFieldForFactory(form, form, definition)).toThrowError('Field type undefined is not defined');
    })
  );

  it('throws error creating DynamicFormField if field type does not provide factory',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const form = getForm({});
      const definition = <DynamicFormFieldDefinition>{ type: 'field', template: {} };

      expect(() => builder.createFormFieldForFactory(form, form, definition)).toThrowError('Creating field of type field is not supported');
    })
  );

  it('creates DynamicFormField using factory of provided field type',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormFieldDefinition>{ type: 'array', template: {} };
      const formField = builder.createFormFieldForFactory(form, form, definition);

      expect(formField.definition).toBe(definition);
      expect(formField.template).toBe(definition.template);
    })
  );

  it('creates DynamicFormField using factory of provided field type',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormFieldDefinition>{ type: 'control', template: {} };
      const formField = builder.createFormFieldForFactory(form, form, definition);

      expect(formField.definition).toBe(definition);
      expect(formField.template).toBe(definition.template);
    })
  );

  it('creates DynamicFormField using factory of provided field type',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormFieldDefinition>{ type: 'group', template: {} };
      const formField = builder.createFormFieldForFactory(form, form, definition);

      expect(formField.definition).toBe(definition);
      expect(formField.template).toBe(definition.template);
    })
  );

  it('creates DynamicFormAction using default factory',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      spyOn(builder, 'createFormAction').and.callThrough();

      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormActionDefinition>{ type: 'action', template: {} };
      const formElement = builder.createFormActionForFactory(form, form, definition);

      expect(builder.createFormAction).toHaveBeenCalledWith(form, form, definition);

      expect(formElement.definition).toBe(definition);
      expect(formElement.template).toBe(definition.template);
    })
  );

  it('creates DynamicFormAction using factory of provided element type',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormActionDefinition>{ type: 'action1', template: {} };
      const formElement = builder.createFormActionForFactory(form, form, definition);

      expect(formElement.definition).toBe(definition);
      expect(formElement.template).toBe(definition.template);
    })
  );
});
