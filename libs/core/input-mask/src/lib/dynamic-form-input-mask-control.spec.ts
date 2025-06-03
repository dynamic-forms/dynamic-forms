import { FormControl } from '@angular/forms';
import { DynamicForm, DynamicFormBuilder, DynamicFormDefinition, DynamicFormFieldType } from '@dynamic-forms/core';
import { MockService } from 'ng-mocks';
import { take } from 'rxjs';
import { DynamicFormInputMaskDefinition, DynamicFormInputMaskOptions } from './dynamic-form-input-mask';
import { DynamicFormInputMaskControl } from './dynamic-form-input-mask-control';

describe('DynamicFormInputMaskControl', () => {
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder, { getFieldId: () => 'fieldId' });
  });

  describe('constructor', () => {
    it('creates instance', () => {
      const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
      const definition = { key: 'key', index: 1, type: 'type', template: {} } as DynamicFormInputMaskDefinition;
      const type = { type: 'type' } as DynamicFormFieldType;
      const control = new DynamicFormInputMaskControl(builder, root, root, definition, type);

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

    it('evaluates mask options', () => {
      const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
      const maskOptions = {
        alias: 'integer',
        get rightAlign() {
          return false;
        },
      } as DynamicFormInputMaskOptions;
      const definition = { key: 'key', index: 1, type: 'type', template: { input: { maskOptions } } } as DynamicFormInputMaskDefinition;
      const type = { type: 'type' } as DynamicFormFieldType;
      const control = new DynamicFormInputMaskControl(builder, root, root, definition, type);

      expect(control.maskOptions).not.toBe(maskOptions);
      expect(control.maskOptions).toEqual({ alias: 'integer', rightAlign: false });
    });
  });

  describe('check', () => {
    it('checks options', () => {
      const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
      const maskOptions = { alias: 'integer' } as DynamicFormInputMaskOptions;
      const definition = { key: 'key', index: 1, type: 'type', template: { input: { maskOptions } } } as DynamicFormInputMaskDefinition;
      const type = { type: 'type' } as DynamicFormFieldType;
      const control = new DynamicFormInputMaskControl(builder, root, root, definition, type);

      const maskOptionsFromConstructor = control.maskOptions;

      expect(maskOptionsFromConstructor).not.toBe(maskOptions);
      expect(maskOptionsFromConstructor).toEqual({ alias: 'integer' });

      control.check();

      expect(control.maskOptions).toBe(maskOptionsFromConstructor);
    });

    it('checks options and emits option changes', done => {
      const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
      const maskOptionValues = { rightAlign: false };
      const maskOptions = {
        alias: 'integer',
        get rightAlign() {
          return maskOptionValues.rightAlign;
        },
      } as DynamicFormInputMaskOptions;
      const definition = { key: 'key', index: 1, type: 'type', template: { input: { maskOptions } } } as DynamicFormInputMaskDefinition;
      const type = { type: 'type' } as DynamicFormFieldType;
      const control = new DynamicFormInputMaskControl(builder, root, root, definition, type);

      const maskOptionsFromConstructor = control.maskOptions;

      expect(maskOptionsFromConstructor).not.toBe(maskOptions);
      expect(maskOptionsFromConstructor).toEqual({ alias: 'integer', rightAlign: false });

      maskOptionValues.rightAlign = true;

      control.maskOptionChanges$.pipe(take(1)).subscribe(changes => {
        expect(changes).toEqual({ rightAlign: true });
        expect(control.maskOptions).not.toBe(maskOptionsFromConstructor);
        expect(control.maskOptions).toEqual({ alias: 'integer', rightAlign: true });
        done();
      });

      control.check();
    });
  });

  describe('maskInputElement', () => {
    it('calls mask', () => {
      const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
      const definition = { key: 'key', index: 1, type: 'type', template: {} } as DynamicFormInputMaskDefinition;
      const type = { type: 'type' } as DynamicFormFieldType;
      const control = new DynamicFormInputMaskControl(builder, root, root, definition, type);
      const inputElement = {} as HTMLInputElement;

      const maskMaskSpy = spyOn(control.mask, 'mask');

      control.maskInputElement(inputElement);

      expect(maskMaskSpy).toHaveBeenCalledOnceWith(inputElement);
    });
  });

  describe('removeInputElement', () => {
    it('calls remove', () => {
      const root = new DynamicForm(builder, { children: [] } as DynamicFormDefinition, {});
      const definition = { key: 'key', index: 1, type: 'type', template: {} } as DynamicFormInputMaskDefinition;
      const type = { type: 'type' } as DynamicFormFieldType;
      const control = new DynamicFormInputMaskControl(builder, root, root, definition, type);

      const maskRemoveSpy = spyOn(control.mask, 'remove');

      control.removeInputElement();

      expect(maskRemoveSpy).toHaveBeenCalledTimes(1);
    });
  });
});
