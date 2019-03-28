import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

class DynamicFormFieldTest extends DynamicFormField {
  get expressions() { return this._expressions; }

  check() {}
  destroy() {}
}

describe('DynamicFormField', () => {
  it('new DynamicFormField', () => {
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
});
