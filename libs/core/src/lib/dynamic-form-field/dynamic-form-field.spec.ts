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
    const definition = <DynamicFormFieldDefinition>{ template: {} };
    const formField = new DynamicFormFieldTest(root, parent, definition);

    expect(formField.root).toBe(root);
    expect(formField.parent).toBe(parent);
    expect(formField.definition).toBe(definition);

    expect(formField.path).toBeNull();
    expect(formField.model).toBeUndefined();
    expect(formField.options).toBeDefined();

    expect(formField.template).toBe(definition.template);
    expect(formField.control).toBeUndefined();

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
    const parent = <DynamicFormField>{ path: 'path', options: { update: 'blur' } };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {}, options: {} };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.options).toEqual({ update: 'blur' });
    expect(formField.options).not.toBe(parent.options);
  });

  it('new instance with options from root options', () => {
    const root = <DynamicFormField>{ options: { update: 'blur' } };
    const parent = <DynamicFormField>{ path: 'path', options: {} };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(root, parent, definition);

    expect(formField.options).toEqual({ update: 'blur' });
    expect(formField.options).not.toBe(root.options);
  });

  it('hidden returns false', () => {
    const parent = <DynamicFormField>{ path: 'path' };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.hidden).toBe(false);
  });

  it('hidden returns true if parent is hidden', () => {
    const parent = <DynamicFormField>{ path: 'path', hidden: true  };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.hidden).toBe(true);
  });

  it('hidden returns true if template is hidden', () => {
    const parent = <DynamicFormField>{ path: 'path' };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: { hidden: true } };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.hidden).toBe(true);
  });

  it('readonly returns false', () => {
    const parent = <DynamicFormField>{ path: 'path' };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.readonly).toBe(false);
  });

  it('readonly returns true if parent is readonly', () => {
    const parent = <DynamicFormField>{ path: 'path', readonly: true };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.readonly).toBe(true);
  });

  it('readonly returns true if template is readonly', () => {
    const parent = <DynamicFormField>{ path: 'path' };
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: { readonly: true } };
    const formField = new DynamicFormFieldTest(null, parent, definition);

    expect(formField.readonly).toBe(true);
  });

  it('set expressions', () => {
    const definition = <DynamicFormFieldDefinition>{ key: 'key', template: {} };
    const formField = new DynamicFormFieldTest(null, null, definition);
    const fieldExpressions = <DynamicFormFieldExpressions>{
      'required': <DynamicFormFieldExpression>{ value: true },
      'input.readonly': <DynamicFormFieldExpression>{ value: false }
    };

    formField.setExpressions(fieldExpressions);

    expect(formField.expressions).toBe(fieldExpressions);
    expect(formField.template['required']).toBe(true);
    expect(formField.template['input']['readonly']).toBe(false);
  });
});
