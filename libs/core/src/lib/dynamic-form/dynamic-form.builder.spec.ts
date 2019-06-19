import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { DynamicFormBuilder } from './dynamic-form.builder';

describe('DynamicFormBuilder', () => {
  const getForm = (model: any) => {
    const definition = <DynamicFormDefinition>{ fields: [] };
    return new DynamicForm(definition, model);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormBuilder,
        DynamicFormExpressionBuilder,
        DynamicFormValidationBuilder
      ]
    });
  }));

  it('creates DynamicForm',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{ template: {}, fields: [] };
      const model = {};
      const form = builder.createForm(definition, model);

      expect(form.root).toBeNull();
      expect(form.parent).toBeNull();
      expect(form.definition).toBe(definition);
      expect(form.model).toBe(model);
      expect(form.control).toBeDefined();
      expect(form.template).toBe(definition.template);
      expect(form.fields).toBeDefined();
    })
  );

  it('creates DynamicForm including DynamicFormArray',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{ fields: [ { key: 'key', type: 'array', template: {} } ] };
      const form = builder.createForm(definition, {});

      expect(form.fields).toBeDefined();
      expect(form.model).toEqual({ key: [] });
    })
  );

  it('creates DynamicForm including DynamicFormControl',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{ fields: [ { key: 'key', type: 'control', template: {} } ] };
      const form = builder.createForm(definition, {});

      expect(form.fields).toBeDefined();
      expect(form.model).toEqual({ key: null });
    })
  );

  it('create DynamicForm throws error',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{ fields: [ {} ] };

      expect(() => builder.createForm(definition, {})).toThrowError();
    })
  );

  it('creates DynamicForm including DynamicFormGroup',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const definition = <DynamicFormDefinition>{ fields: [ { key: 'key', type: 'group', template: {} } ] };
      const form = builder.createForm(definition, {});

      expect(form.fields).toBeDefined();
      expect(form.model).toEqual({ key: {} });
    })
  );

  it('creates DynamicFormGroup',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormGroupDefinition>{ key: 'key', template: {}, fields: [] };
      const formGroup = builder.createFormGroup(form, form, definition);

      expect(formGroup.root).toBe(form);
      expect(formGroup.parent).toBe(form);
      expect(formGroup.definition).toBe(definition);
      expect(formGroup.control).toBeDefined();
      expect(formGroup.template).toBe(definition.template);
      expect(formGroup.fields).toBeDefined();
    })
  );

  it('creates DynamicFormArray',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormArrayDefinition>{ key: 'key', template: {}, fields: [] };
      const formArray = builder.createFormArray(form, form, definition);

      expect(formArray.root).toBe(form);
      expect(formArray.parent).toBe(form);
      expect(formArray.definition).toBe(definition);
      expect(formArray.control).toBeDefined();
      expect(formArray.template).toBe(definition.template);
      expect(formArray.fields).toBeDefined();
    })
  );

  it('creates DynamicFormControl',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const definition = <DynamicFormControlDefinition>{ key: 'key', template: { input: {} } };
      const formControl = builder.createFormControl(form, form, definition);

      expect(formControl.root).toBe(form);
      expect(formControl.parent).toBe(form);
      expect(formControl.definition).toBe(definition);
      expect(formControl.control).toBeDefined();
      expect(formControl.control.validator).toBeNull();
      expect(formControl.template).toBe(definition.template);
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
            email: true,
            pattern: false
          }
        }
      };
      const formControl = builder.createFormControl(form, form, definition);

      expect(formControl.control).toBeDefined();
      expect(formControl.control.validator).toBeDefined();
    })
  );
});
