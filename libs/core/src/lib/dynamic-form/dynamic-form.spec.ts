import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';

describe('DynamicForm', () => {
  it('creates instance', () => {
      const definition = { template: {}, children: [] } as DynamicFormDefinition;
      const model = {};
      const form = new DynamicForm(definition, model);

      expect(form.root).toBe(form);
      expect(form.parent).toBeNull();
      expect(form.definition).toBe(definition);
      expect(form.model).toBe(model);
      expect(form.control).toBeTruthy();
      expect(form.template).toBe(definition.template);
      expect(form.fields).toBeTruthy();
  });

  it('create instance throws if no template provided', () => {
    const model = {};

    expect(() => new DynamicForm(null, model)).toThrowError();
  });

  it('create instance throws if no model provided', () => {
    const definition = { children: [] } as DynamicFormDefinition;

    expect(() => new DynamicForm(definition, null)).toThrowError();
  });

  it('returns readonly being false', () => {
    const definition = { template: {}, children: [] } as DynamicFormDefinition;
    const form = new DynamicForm(definition, {});

    expect(form.readonly).toBe(false);
  });

  it('returns readonly being true if template is readonly', () => {
    const definition = { template: { readonly: true }, children: [] } as DynamicFormDefinition;
    const form = new DynamicForm(definition, {});

    expect(form.readonly).toBe(true);
  });

  it('returns hidden being false', () => {
    const definition = { template: {}, children: [] } as DynamicFormDefinition;
    const form = new DynamicForm(definition, {});

    expect(form.hidden).toBe(false);
  });

  it('returns hidden being true if template is hidden', () => {
    const definition = { template: { hidden: true }, children: [] } as DynamicFormDefinition;
    const form = new DynamicForm(definition, {});

    expect(form.hidden).toBe(true);
  });

  it('submits', (done) => {
    const definition = { template: {}, children: [] } as DynamicFormDefinition;
    const form = new DynamicForm(definition, {});

    form.submit$.subscribe((submit) => {
      expect(submit).toBe(true);
      done();
    });

    form.submit();
  });
});
