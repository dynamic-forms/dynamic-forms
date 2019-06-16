import { async, inject, TestBed } from '@angular/core/testing';
import { DynamicFormArrayTemplate } from '../dynamic-form-array/dynamic-form-array-template';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormGroupTemplate } from '../dynamic-form-group/dynamic-form-group-template';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormTemplate } from './dynamic-form-template';
import { DynamicFormBuilder } from './dynamic-form.builder';

describe('DynamicFormBuilder', () => {
  const getForm = (model: any) => {
    const template = <DynamicFormTemplate>{ fields: [] };
    return new DynamicForm(template, model);
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
      const template = <DynamicFormTemplate>{ fields: [] };
      const model = {};
      const form = builder.createForm(template, model);

      expect(form.root).toBeNull();
      expect(form.parent).toBeNull();
      expect(form.template).toBe(template);
      expect(form.model).toBe(model);
      expect(form.control).toBeDefined();
      expect(form.fields).toBeDefined();
    })
  );

  it('creates DynamicForm including DynamicFormArray',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const template = <DynamicFormTemplate>{ fields: [ { key: 'key', type: 'array' } ] };
      const form = builder.createForm(template, {});

      expect(form.fields).toBeDefined();
      expect(form.model).toEqual({ key: [] });
    })
  );

  it('creates DynamicForm including DynamicFormControl',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const template = <DynamicFormTemplate>{ fields: [ { key: 'key', type: 'control' } ] };
      const form = builder.createForm(template, {});

      expect(form.fields).toBeDefined();
      expect(form.model).toEqual({ key: null });
    })
  );

  it('create DynamicForm throws error',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const template = <DynamicFormTemplate>{ fields: [ {} ] };

      expect(() => builder.createForm(template, {})).toThrowError();
    })
  );

  it('creates DynamicForm including DynamicFormGroup',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const template = <DynamicFormTemplate>{ fields: [ { key: 'key', type: 'group' } ] };
      const form = builder.createForm(template, {});

      expect(form.fields).toBeDefined();
      expect(form.model).toEqual({ key: {} });
    })
  );

  it('creates DynamicFormGroup',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const template = <DynamicFormGroupTemplate>{ key: 'key', fields: [] };
      const formGroup = builder.createFormGroup(form, form, template);

      expect(formGroup.root).toBe(form);
      expect(formGroup.parent).toBe(form);
      expect(formGroup.template).toBe(template);
      expect(formGroup.control).toBeDefined();
      expect(formGroup.fields).toBeDefined();
    })
  );

  it('creates DynamicFormArray',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const template = <DynamicFormArrayTemplate>{ key: 'key', fields: [] };
      const formArray = builder.createFormArray(form, form, template);

      expect(formArray.root).toBe(form);
      expect(formArray.parent).toBe(form);
      expect(formArray.template).toBe(template);
      expect(formArray.control).toBeDefined();
      expect(formArray.fields).toBeDefined();
    })
  );

  it('creates DynamicFormControl',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const template = <DynamicFormControlTemplate>{ key: 'key' };
      const formControl = builder.createFormControl(form, form, template);

      expect(formControl.root).toBe(form);
      expect(formControl.parent).toBe(form);
      expect(formControl.template).toBe(template);
      expect(formControl.control).toBeDefined();
      expect(formControl.control.validator).toBeNull();
    })
  );

  it('creates DynamicFormControl including DynamicFormValidation',
    inject([DynamicFormBuilder], (builder: DynamicFormBuilder) => {
      const model = {};
      const form = getForm(model);
      const template = <DynamicFormControlTemplate>{
        key: 'key',
        type: 'control',
        input: {
          type: 'email'
        },
        validation: {
          required: true,
          email: true,
          pattern: false
        }
      };
      const formControl = builder.createFormControl(form, form, template);

      expect(formControl.control).toBeDefined();
      expect(formControl.control.validator).toBeDefined();
    })
  );
});
