import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';

describe('DynamicForm', () => {
  it('new instance', () => {
      const definition = <DynamicFormDefinition>{ template: {}, fields: [] };
      const model = {};
      const form = new DynamicForm(definition, model);

      expect(form.path).toBeNull();
      expect(form.root).toBeNull();
      expect(form.parent).toBeNull();
      expect(form.definition).toBe(definition);
      expect(form.model).toBe(model);
      expect(form.control).toBeDefined();
      expect(form.template).toBe(definition.template);
      expect(form.fields).toBeDefined();
  });

  it('new instance throws if no template provided', () => {
    const model = {};

    expect(() => new DynamicForm(null, model)).toThrowError();
  });

  it('new instance throws if no model provided', () => {
    const definition = <DynamicFormDefinition>{ fields: [] };

    expect(() => new DynamicForm(definition, null)).toThrowError();
  });

  it('readonly returns false', () => {
    const definition = <DynamicFormDefinition>{ template: {}, fields: [] };
    const form = new DynamicForm(definition, {});

    expect(form.readonly).toBe(false);
  });

  it('readonly returns true if template is readonly', () => {
    const definition = <DynamicFormDefinition>{ template: { readonly: true }, fields: [] };
    const form = new DynamicForm(definition, {});

    expect(form.readonly).toBe(true);
  });

  it('hidden returns false', () => {
    const definition = <DynamicFormDefinition>{ template: {}, fields: [] };
    const form = new DynamicForm(definition, {});

    expect(form.hidden).toBe(false);
  });

  it('hidden returns true if template is hidden', () => {
    const definition = <DynamicFormDefinition>{ template: { hidden: true }, fields: [] };
    const form = new DynamicForm(definition, {});

    expect(form.hidden).toBe(true);
  });
});
