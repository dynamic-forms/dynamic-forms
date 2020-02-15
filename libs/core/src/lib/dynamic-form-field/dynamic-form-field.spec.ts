import { DynamicFormFieldExpression } from '../dynamic-form-expression/dynamic-form-field-expression';
import { DynamicFormFieldExpressions } from '../dynamic-form-expression/dynamic-form-field-expressions';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';

class DynamicFormFieldTest extends DynamicFormField {
  check() {}
  destroy() {}

  reset() {}
  resetDefault() {}
  validate() {}
}

describe('DynamicFormField', () => {
  it('new instance', () => {
    const root = null;
    const parent = null;
    const definition = <DynamicFormFieldDefinition>{ id: 'id', key: 'key', index: 1, type: 'componentType', template: {} };
    const formField = new DynamicFormFieldTest(root, parent, definition);

    expect(formField.root).toBe(root);
    expect(formField.parent).toBe(parent);
    expect(formField.definition).toBe(definition);
    expect(formField.template).toBe(definition.template);

    expect(formField.id).toBe('id');
    expect(formField.key).toBe('key');
    expect(formField.index).toBe(1);
    expect(formField.path).toBe('key');
    expect(formField.classType).toBe('field');
    expect(formField.componentType).toBe('componentType');

    expect(formField.model).toBeUndefined();
    expect(formField.options).toBeDefined();
    expect(formField.control).toBeUndefined();

    expect(formField.elements).toEqual([]);
    expect(formField.actions).toEqual([]);

    expect(formField.expressions).toEqual({});
    expect(formField.expressionChanges).toBeTruthy();
    expect(formField.expressionChangesSubject).toBeTruthy();
  });

  it('new instance with path from key of definition', () => {
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, null, definition);

    expect(formField.path).toBe('key');
  });

  it('new instance with path from parent path and key of definition', () => {
    const parent = <DynamicFormField>{ path: 'path' };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.path).toBe('path.key');
  });

  it('new instance with options from default options', () => {
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {}, options: {} };
    const formField = new DynamicFormFieldTest(null, null, definition);

    expect(formField.options).toEqual({ update: 'change' });
  });

  it('new instance with options from definition', () => {
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {}, options: { update: 'blur' } };
    const formField = new DynamicFormFieldTest(null, null, definition);

    expect(formField.options).toEqual({ update: 'blur' });
    expect(formField.options).not.toBe(definition.options);
  });

  it('new instance with options from parent options', () => {
    const parent = <DynamicFormField>{ options: { update: 'blur' } };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {}, options: {} };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.options).toEqual({ update: 'blur' });
    expect(formField.options).not.toBe(parent.options);
  });

  it('new instance with options from root options', () => {
    const root = <DynamicFormField>{ options: { update: 'blur' } };
    const parent = <DynamicFormField>{ options: {} };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(root, parent, definition);

    expect(formField.options).toEqual({ update: 'blur' });
    expect(formField.options).not.toBe(root.options);
  });

  it('hidden returns false', () => {
    const parent = <DynamicFormField>{};
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.hidden).toBe(false);
  });

  it('hidden returns true if parent is hidden', () => {
    const parent = <DynamicFormField>{ hidden: true  };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.hidden).toBe(true);
  });

  it('hidden returns true if template is hidden', () => {
    const parent = <DynamicFormField>{};
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: { hidden: true } };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.hidden).toBe(true);
  });

  it('readonly returns false', () => {
    const parent = <DynamicFormField>{ };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.readonly).toBe(false);
  });

  it('readonly returns true if parent is readonly', () => {
    const parent = <DynamicFormField>{readonly: true };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.readonly).toBe(true);
  });

  it('readonly returns true if template is readonly', () => {
    const parent = <DynamicFormField>{};
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: { readonly: true } };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.readonly).toBe(true);
  });

  it('inits expressions', () => {
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, null, definition);
    const fieldExpressions = <DynamicFormFieldExpressions>{
      'required': <DynamicFormFieldExpression>{ value: true },
      'input.readonly': <DynamicFormFieldExpression>{ value: false }
    };

    formField.initExpressions(fieldExpressions);

    expect(formField.expressions).toBe(fieldExpressions);
    expect(formField.template['required']).toBe(true);
    expect(formField.template['input']['readonly']).toBe(false);
  });
});
