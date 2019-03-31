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
    const formField = new DynamicFormFieldTest(root, parent, template);

    expect(formField.path).toBeNull();
    expect(formField.root).toBe(root);
    expect(formField.parent).toBe(parent);
    expect(formField.template).toBe(template);
    expect(formField.control).toBeUndefined();
    expect(formField.model).toBeUndefined();
    expect(formField.expressions).toBeUndefined();
  });

  it('new instance with path from key of template ', () => {
    const template = <DynamicFormFieldTemplate>{ key: 'key' };
    const formField = new DynamicFormFieldTest(null, null, template);

    expect(formField.path).toBe('key');
  });

  it('new instance with path from parent path and key of template', () => {
    const parent = <DynamicFormField>{ path: 'path' };
    const template = <DynamicFormFieldTemplate>{ key: 'key' };
    const formField = new DynamicFormFieldTest(null, parent, template);

    expect(formField.path).toBe('path.key');
  });

  it('set expressions', () => {
    const template = <DynamicFormFieldTemplate>{ key: 'key' };
    const formField = new DynamicFormFieldTest(null, null, template);
    const fieldExpressions = <DynamicFormFieldExpressions>{
      'required': <DynamicFormFieldExpression>{ value: true },
      'input.readonly': <DynamicFormFieldExpression>{ value: false }
    };

    formField.setFieldExpressions(fieldExpressions);

    expect(formField.expressions).toBe(fieldExpressions);
    expect(formField.template['required']).toBe(true);
    expect(formField.template['input']['readonly']).toBe(false);
  });
});
