import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormBuilder } from './dynamic-form.builder';

describe('DynamicFormBuilder', () => {
  const getForm = (model: any) => {
    const definition = <DynamicFormDefinition>{ elements: [] };
    return new DynamicForm(definition, model);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormBuilder,
        DynamicFormExpressionBuilder,
        DynamicFormEvaluationBuilder,
        DynamicFormValidationBuilder
      ]
    });
  }));

  it('creates DynamicForm',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{ template: {}, elements: [] };
      const model = {};
      const form = builder.createForm(definition, model);

      expect(form.root).toBeNull();
      expect(form.parent).toBeNull();
      expect(form.definition).toBe(definition);
      expect(form.template).toBe(definition.template);

      expect(form.model).toBe(model);
      expect(form.control).toBeDefined();
      expect(form.fields).toBeDefined();
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

      expect(form.fields).toBeDefined();
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

      expect(form.fields).toBeDefined();
      expect(form.model).toEqual({ key: null });
    })
  );

  it('create DynamicForm throws error',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{ elements: [ {} ] };

      expect(() => builder.createForm(definition, {})).toThrowError();
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

      expect(form.fields).toBeDefined();
      expect(form.model).toEqual({ key: {} });
    })
  );

  it('creates DynamicFormGroup',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, elements: [] };
      const formGroup = builder.createFormGroup(definition, form, form);

      expect(formGroup.root).toBe(form);
      expect(formGroup.parent).toBe(form);
      expect(formGroup.definition).toBe(definition);
      expect(formGroup.template).toBe(definition.template);

      expect(formGroup.control).toBeDefined();
      expect(formGroup.fields).toBeDefined();
    })
  );

  it('creates DynamicFormArray',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {}, elements: [] };
      const formArray = builder.createFormArray(definition, form, form);

      expect(formArray.root).toBe(form);
      expect(formArray.parent).toBe(form);
      expect(formArray.definition).toBe(definition);
      expect(formArray.template).toBe(definition.template);

      expect(formArray.control).toBeDefined();
      expect(formArray.fields).toBeDefined();
    })
  );

  it('creates DynamicFormControl',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormControlDefinition>{ key: 'key', template: { input: {} } };
      const formControl = builder.createFormControl(definition, form, form);

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
      const formControl = builder.createFormControl(definition, form, form);

      expect(formControl.control).toBeDefined();
      expect(formControl.control.validator).toBeDefined();
    })
  );
});
