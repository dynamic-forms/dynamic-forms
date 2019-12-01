import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from './dynamic-form-config';
import { DynamicFormConfigService } from './dynamic-form-config.service';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormBuilder } from './dynamic-form.builder';

describe('DynamicFormBuilder', () => {
  const config: DynamicFormConfig = {
    library: 'test',
    elementConfig: {
      types: [
        { type: 'element', component: null }
      ]
    },
    fieldConfig: {
      types: [
        { type: 'array', component: null },
        { type: 'control', component: null },
        { type: 'group', component: null }
      ]
    }
  };

  const getForm = (model: any) => {
    const definition = <DynamicFormDefinition>{ elements: [] };
    return new DynamicForm(definition, model);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DYNAMIC_FORM_CONFIG,
          useValue: config
        },
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

      expect(form.root).toBeNull();
      expect(form.parent).toBeNull();
      expect(form.definition).toBe(definition);
      expect(form.template).toBe(definition.template);

      expect(form.elements).toEqual([]);
      expect(form.fields).toEqual([]);

      expect(form.model).toBe(model);
      expect(form.control).toBeDefined();

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
      expect(form.model).toEqual({ key: null });
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
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormArrayDefinition>{ key: 'key', type: 'array', template: {}, elements: [] };
      const formArray = builder.createFormArray(form, form, definition);

      expect(formArray.root).toBe(form);
      expect(formArray.parent).toBe(form);
      expect(formArray.definition).toBe(definition);
      expect(formArray.template).toBe(definition.template);

      expect(formArray.control).toBeDefined();
      expect(formArray.fields).toBeDefined();
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
});
