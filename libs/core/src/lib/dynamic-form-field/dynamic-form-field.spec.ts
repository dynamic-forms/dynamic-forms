import { DynamicFormFieldExpression } from '../dynamic-form-expression/dynamic-form-field-expression';
import { DynamicFormFieldExpressions } from '../dynamic-form-expression/dynamic-form-field-expressions';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

class DynamicFormFieldTest extends DynamicFormField {
  get expressions() { return this._expressions; }

  check() {}
  destroy() {}
}

describe('DynamicFormField', () => {
  it('new instance', () => {
    const root = null;
    const parent = null;
    const template = <DynamicFormFieldTemplate>{};
    const field = new DynamicFormFieldTest(root, parent, template);

    expect(field.path).toBeNull();
    expect(field.root).toBe(root);
    expect(field.parent).toBe(parent);
    expect(field.template).toBe(template);
    expect(field.control).toBeUndefined();
    expect(field.model).toBeUndefined();
    expect(field.expressions).toBeUndefined();
  });

  it('new instance with path from key of template ', () => {
    const template = <DynamicFormFieldTemplate>{ key: 'key' };
    const field = new DynamicFormFieldTest(null, null, template);

    expect(field.path).toBe('key');
  });

  it('new instance with path from parent path and key of template', () => {
    const parent = <DynamicFormField>{ path: 'path' };
    const template = <DynamicFormFieldTemplate>{ key: 'key' };
    const field = new DynamicFormFieldTest(null, parent, template);

    expect(field.path).toBe('path.key');
  });

  it('set expressions', () => {
    const template = <DynamicFormFieldTemplate>{ key: 'key' };
    const field = new DynamicFormFieldTest(null, null, template);
    const fieldExpressions = <DynamicFormFieldExpressions>{
      'required': <DynamicFormFieldExpression>{ value: true },
      'input.readonly': <DynamicFormFieldExpression>{ value: false }
    };

    field.setFieldExpressions(fieldExpressions);

    expect(field.expressions).toBe(fieldExpressions);
    expect(field.template['required']).toBe(true);
    expect(field.template['input']['readonly']).toBe(false);
  });
});
