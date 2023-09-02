import { FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldExpression } from '../dynamic-form-field/dynamic-form-field-expression';
import { DynamicFormFieldExpressions } from '../dynamic-form-field/dynamic-form-field-expressions';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormSelect } from '../dynamic-form-input/dynamic-form-select/dynamic-form-select';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../testing';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlAddOn, DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlEvaluator } from './dynamic-form-control-evaluator';
import { dynamicFormSelectEvaluatorFn } from './dynamic-form-control-evaluator-type';
import { DynamicFormControlValidator } from './dynamic-form-control-validator';

describe('DynamicFormControl', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
    builder.getFieldId.and.returnValue('fieldId');
  });

  it('creates instance', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', index: 1, type: 'type', template: {} } as DynamicFormControlDefinition;
    const type = { type: 'type' } as DynamicFormFieldType;
    const control = new DynamicFormControl(builder, root, root, definition, type);

    expect(control.root).toBe(root);
    expect(control.parent).toBe(root);
    expect(control.parentField).toBe(root);

    expect(control.definition).toBe(definition);
    expect(control.template).toBe(definition.template);
    expect(control.type).toBe(type);

    expect(control.key).toBe('key');
    expect(control.index).toBe(1);
    expect(control.path).toBe('key');
    expect(control.classType).toBe('field');
    expect(control.fieldClassType).toBe('control');

    expect(control.model).toBeNull();
    expect(control.value).toBeNull();
    expect(control.valid).toBeTrue();
    expect(control.status).toBe('VALID');
    expect(control.control).toBeInstanceOf(FormControl);

    expect(control.children).toEqual([]);
    expect(control.footerActions).toEqual([]);
    expect(control.evaluators).toEqual([]);
    expect(control.validators).toEqual([]);

    expect(control.prefixAddOn).toBeUndefined();
    expect(control.suffixAddOn).toBeUndefined();

    expect(root.model).toEqual({ key: null });
  });

  const defaultValues = [ 'default', 0, false, '' ];
  defaultValues.forEach(defaultValue =>
    it(`creating instance sets model to default value '${defaultValue}'`, () => {
      const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
      const definition = { key: 'key', template: { input: { defaultValue } } } as DynamicFormControlDefinition;
      const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

      expect(control.model).toBe(defaultValue);

      expect(root.model).toEqual({ key: defaultValue });
    }),
  );

  const items = [
    { settings: { updateType: undefined }, updateOn: 'change' },
    { settings: { updateType: 'change' }, updateOn: 'change' },
    { settings: { updateType: 'debounce' }, updateOn: 'change' },
    { settings: { updateType: 'debounce', updateDebounce: 0 }, updateOn: 'change' },
    { settings: { updateType: 'debounce', updateDebounce: 200 }, updateOn: 'change' },
    { settings: { updateType: 'blur' }, updateOn: 'blur' },
  ];
  items.forEach(item =>
    it(`creating instance sets update option '${item.settings}'`, () => {
      const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
      const definition = { key: 'key', template: {}, settings: item.settings } as DynamicFormControlDefinition;
      const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

      expect(control.control.updateOn).toEqual(item.updateOn);
    }),
  );

  it('creating instance subscribes valueChanges of control value', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    control.control.setValue('value');

    expect(control.model).toBe('value');
    expect((control.parent as DynamicFormField).model.key).toBe('value');
  });

  it('creating instance subscribes valueChanges of control object', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);
    const obj = { value: 'value' };

    control.control.setValue(obj);

    expect(control.model).toBe(obj);
    expect((control.parent as DynamicFormField).model.key).toBe(obj);
  });

  it('creating instance subscribes debounced valueChanges of control value', (done) => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const settings = { updateType: 'debounce', updateDebounce: 200 };
    const definition = { key: 'key', template: {}, settings } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    control.control.setValue('value');
    control.check();

    expect(control.value).toBe('value');
    expect(control.model).toBeNull();
    expect((control.parent as DynamicFormField).model.key).toBeNull();

    of({}).pipe(delay(150)).subscribe(() => {
      expect(control.value).toBe('value');
      expect(control.model).toBeNull();
      expect((control.parent as DynamicFormField).model.key).toBeNull();
    });

    of({}).pipe(delay(300)).subscribe(() => {
      expect(control.value).toBe('value');
      expect(control.model).toBe('value');
      expect((control.parent as DynamicFormField).model.key).toBe('value');
      done();
    });
  });

  it('returns expression data with input', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', index: 1, type: 'componentType', template: { input: {} } } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    expect(control.expressionData.input).toBe(definition.template.input);
  });

  it('inits evaluators to empty', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    builder.createControlEvaluators.and.returnValue([]);

    control.init();

    expect(control.evaluators).toEqual([]);
  });

  it('inits evaluators', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);
    const evaluators = [ {} ] as DynamicFormControlEvaluator[];

    builder.createControlEvaluators.and.returnValue(evaluators);

    control.init();

    expect(control.evaluators).toBe(evaluators);
  });

  it('inits validators to empty', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    builder.createControlValidators.and.returnValue(null);

    control.init();

    expect(control.validators).toEqual([]);
  });

  it('inits validators', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);
    const validators = [
      { key: 'required', validatorFn: Validators.required },
    ] as DynamicFormControlValidator[];

    builder.createControlValidators.and.returnValue(validators);

    control.init();

    expect(control.validators).toBe(validators);
  });

  it('sets control validator to null', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    builder.createControlValidators.and.returnValue(null);

    control.init();
    control.control.updateValueAndValidity();

    expect(control.control.validator).toBeNull();
    expect(control.control.valid).toBe(true);
  });

  it('sets control validator', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);
    const validators = [
      { key: 'required', validatorFn: Validators.required },
    ] as DynamicFormControlValidator[];

    builder.createControlValidators.and.returnValue(validators);

    control.init();
    control.control.updateValueAndValidity();

    expect(control.control.validator).not.toBeNull();
    expect(control.control.valid).toBe(false);
  });

  it('inits prefixAddOn and suffixAddOn to undefined', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    builder.createFormControlAddOn.and.returnValues(undefined, undefined);

    control.init();

    expect(control.prefixAddOn).toBeUndefined();
    expect(control.suffixAddOn).toBeUndefined();
  });

  it('inits prefixAddOn and suffixAddOn', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);
    const prefixAddOn = {} as DynamicFormControlAddOn;
    const suffixAddOn = {} as DynamicFormControlAddOn;

    builder.createFormControlAddOn.and.returnValues(prefixAddOn, suffixAddOn);

    control.init();

    expect(control.prefixAddOn).toBe(prefixAddOn);
    expect(control.suffixAddOn).toBe(suffixAddOn);
  });

  it('check updates control value', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: { input: {} } } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    spyOn(control.control, 'setValue').and.callThrough();
    spyOn(control.control, 'markAsTouched');

    root.model['key'] = 'value';
    control.check();

    expect(control.model).toBe('value');
    expect(control.value).toBe('value');
    expect(control.control.setValue).toHaveBeenCalledWith('value', { onlySelf: true, emitEvent: false });
    expect(control.control.markAsTouched).toHaveBeenCalled();
  });

  it('check updates control disabled', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: { input: {} } } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    expect(control.control.disabled).toBe(false);

    control.template.disabled = true;
    control.check();

    expect(control.control.disabled).toBe(true);

    control.template.disabled = false;
    control.check();

    expect(control.control.disabled).toBe(false);
  });

  it('check updates control validators', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = {
      key: 'key',
      type: 'control',
      template: {
        input: { type: 'input' },
        validation: { required: true },
      },
    } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);
    const validators = [
      new DynamicFormControlValidator(_ => Validators.required, 'required', control),
    ] as DynamicFormControlValidator[];

    builder.createControlValidators.and.returnValue(validators);
    builder.createControlEvaluators.and.returnValue([]);

    control.init();
    control.control.updateValueAndValidity();

    expect(control.control.valid).toBe(false);

    definition.template.validation.required = false;
    control.check();

    expect(control.control.valid).toBe(true);

    control.check();

    expect(control.control.valid).toBe(true);

    definition.template.validation.required = true;
    control.check();

    expect(control.control.valid).toBe(false);
  });

  it('destroy unsubscribes valueChanges of control', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    control.destroy();

    expect(control).toBeTruthy();
  });

  it('reset sets model to null', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, { key: 'value' });
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    expect(control.model).toBe('value');
    expect((control.parent as DynamicFormField).model.key).toBe('value');

    control.reset();

    expect(control.model).toBe(null);
    expect((control.parent as DynamicFormField).model.key).toBe(null);
  });

  it('resetEmpty sets model to null', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, { key: 'value' });
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    expect(control.model).toBe('value');
    expect((control.parent as DynamicFormField).model.key).toBe('value');

    control.resetEmpty();

    expect(control.model).toBe(null);
    expect((control.parent as DynamicFormField).model.key).toBe(null);
  });

  it('resetDefault sets model to default value', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: { input: {} } } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    expect(control.model).toBe(null);
    expect((control.parent as DynamicFormField).model.key).toBe(null);

    control.definition.template.input.defaultValue = 'value';
    control.resetDefault();

    expect(control.model).toBe('value');
    expect((control.parent as DynamicFormField).model.key).toBe('value');
  });

  it('validate calls markAsTouched of control', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: { input: {} } } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);

    spyOn(control.control, 'markAsTouched');

    control.validate();

    expect(control.control.markAsTouched).toHaveBeenCalled();
  });

  it('init calls calls initId, initExpressions, initValidators and initEvaluators', () => {
    const root = { classType: 'field', model: {} } as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { key: 'key', template: { input: {} } } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, parent, definition, {} as DynamicFormFieldType);

    const initIdSpy = spyOn(control as any, 'initId').and.callThrough();
    const initExpressionsSpy = spyOn(control as any, 'initExpressions').and.callThrough();
    const getExpressionsSpy = spyOn(control as any, 'getExpressions').and.callThrough();
    const initChildrenSpy = spyOn(control as any, 'initChildren').and.callThrough();
    const getChildrenSpy = spyOn(control as any, 'getChildren').and.callThrough();
    const initValidatorsSpy = spyOn(control as any, 'initValidators').and.callThrough();
    const getValidatorsSpy = spyOn(control as any, 'getValidators').and.callThrough();
    const initHeaderActionsSpy = spyOn(control as any, 'initHeaderActions').and.callThrough();
    const getHeaderActionsSpy = spyOn(control as any, 'getHeaderActions').and.callThrough();
    const initFooterActionsSpy = spyOn(control as any, 'initFooterActions').and.callThrough();
    const getFooterActionsSpy = spyOn(control as any, 'getFooterActions').and.callThrough();
    const initEvaluatorsSpy = spyOn(control as any, 'initEvaluators').and.callThrough();
    const getEvaluatorsSpy = spyOn(control as any, 'getEvaluators').and.callThrough();

    control.init();

    expect(initIdSpy).toHaveBeenCalledTimes(1);
    expect(builder.getFieldId).toHaveBeenCalledOnceWith(control);
    expect(initExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(getExpressionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFieldExpressions).toHaveBeenCalledOnceWith(control);
    expect(initChildrenSpy).toHaveBeenCalledTimes(1);
    expect(getChildrenSpy).toHaveBeenCalledTimes(1);
    expect(initValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(getValidatorsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createControlValidators).toHaveBeenCalledOnceWith(control);
    expect(initHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(getHeaderActionsSpy).toHaveBeenCalledTimes(1);
    expect(initFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(getFooterActionsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createFormActions).not.toHaveBeenCalled();
    expect(initEvaluatorsSpy).toHaveBeenCalledTimes(1);
    expect(getEvaluatorsSpy).toHaveBeenCalledTimes(1);
    expect(builder.createControlEvaluators).toHaveBeenCalledOnceWith(control);
  });

  it('inits expressions', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);
    const expressions = {
      required: { value: true } as DynamicFormFieldExpression,
      readonly: { value: false } as DynamicFormFieldExpression,
      'input.inputType': { value: 'text' } as DynamicFormFieldExpression,
    } as DynamicFormFieldExpressions;

    builder.createFieldExpressions.and.returnValue(expressions);

    control.init();

    expect(control.expressions).toBe(expressions);
    expect(control.template.required).toBe(true);
    expect(control.template.readonly).toBe(false);
    expect(control.template.input.inputType).toBe('text');
  });

  it('inits expressions, sets model and control value to default value', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);
    const expressions = {
      'input.defaultValue': { value: 'value' } as DynamicFormFieldExpression,
    } as DynamicFormFieldExpressions;

    spyOn(control.control, 'setValue').and.callThrough();
    spyOn(control.control, 'markAsTouched');

    builder.createFieldExpressions.and.returnValue(expressions);

    control.init();

    expect(control.expressions).toBe(expressions);
    expect(control.template.input.defaultValue).toBe('value');
    expect(control.model).toBe('value');
    expect(control.control.value).toBe('value');
    expect(control.control.setValue).toHaveBeenCalledWith('value', { onlySelf: true, emitEvent: false });
    expect(control.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('inits expressions, but does not set model and control value to default value', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: {} } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);
    const expressions = {
      'input.defaultValue': { value: undefined } as DynamicFormFieldExpression,
    } as DynamicFormFieldExpressions;

    spyOn(control.control, 'setValue').and.callThrough();
    spyOn(control.control, 'markAsTouched');

    builder.createFieldExpressions.and.returnValue(expressions);

    control.init();

    expect(control.expressions).toBe(expressions);
    expect(control.template['input']['defaultValue']).toBeUndefined();
    expect(control.model).toBeNull();
    expect(control.control.value).toBeNull();
    expect(control.control.setValue).not.toHaveBeenCalled();
    expect(control.control.markAsTouched).not.toHaveBeenCalled();
  });

  it('inits validators', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: { input: {} } } as DynamicFormControlDefinition;
    const control = new DynamicFormControl(builder, root, root, definition, {} as DynamicFormFieldType);
    const validators = [{}] as DynamicFormControlValidator[];

    builder.createControlValidators.and.returnValue(validators);

    control.init();

    expect(control.validators).toBe(validators);
  });

  it('inits evaluators', () => {
    const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
    const definition = { key: 'key', template: { input: {} } } as DynamicFormControlDefinition;
    const type = {} as DynamicFormFieldType;
    const control = new DynamicFormControl(builder, root, root, definition, type);
    const evaluators = [{}] as DynamicFormControlEvaluator[];

    builder.createControlEvaluators.and.returnValue(evaluators);

    control.init();

    expect(control.evaluators).toBe(evaluators);
  });

  describe('DynamicFormSelect', () => {
    it('check updates model for select options', () => {
      const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {
        key: 'option1',
      });
      const definition = {
        key: 'key',
        template: {
          input: {
            type: 'select',
            options: [
              { value: 'option1', label: 'Option1' },
              { value: 'option2', label: 'Option2' },
              {
                label: 'Option Group',
                items: [
                  { value: 'option3', label: 'Option3' },
                  { value: 'option4', label: 'Option4' },
                ],
              },
            ],
          },
        },
      } as DynamicFormControlDefinition<string | string[], DynamicFormSelect<string>>;
      const type = {} as DynamicFormFieldType;
      const control = new DynamicFormControl<string | string[], DynamicFormSelect<string>>(builder, root, root, definition, type);
      const evaluators = [
        { enabled: true, func: dynamicFormSelectEvaluatorFn },
      ] as DynamicFormControlEvaluator[];

      builder.createControlEvaluators.and.returnValue(evaluators);

      control.init();

      expect(control.model).toBe('option1');
      expect(control.control.value).toBe('option1');

      control.control.setValue('option3');
      control.check();

      expect(control.model).toBe('option3');
      expect(control.control.value).toBe('option3');

      control.template.input.options = [
        { value: 'option1', label: 'Option1' },
        { value: 'option2', label: 'Option2' },
      ];
      control.check();

      expect(control.model).toBeNull();
      expect(control.control.value).toBeNull();
    });
  });
});
