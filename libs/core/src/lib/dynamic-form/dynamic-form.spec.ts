import { DynamicForm } from './dynamic-form';
import { DynamicFormTemplate } from './dynamic-form-template';

describe('DynamicForm', () => {
  it('new DynamicForm', () => {
      const template = <DynamicFormTemplate>{ fields: [] };
      const model = {};
      const form = new DynamicForm(template, model);

      expect(form.path).toBeNull();
      expect(form.root).toBeNull();
      expect(form.parent).toBeNull();
      expect(form.template).toBe(template);
      expect(form.model).toBe(model);
      expect(form.control).toBeDefined();
      expect(form.fields).toBeDefined();
  });

  it('new DynamicForm throws if no template provided', () => {
    const model = {};

    expect(() => new DynamicForm(null, model)).toThrowError();
  });

  it('new DynamicForm throws if no model provided', () => {
    const template = <DynamicFormTemplate>{ fields: [] };

    expect(() => new DynamicForm(template, null)).toThrowError();
  });
});
