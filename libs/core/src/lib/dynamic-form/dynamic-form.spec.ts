import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';

describe('DynamicForm', () => {
  it('creates instance', () => {
      const definition = <DynamicFormDefinition>{ template: {}, elements: [] };
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
    const definition = <DynamicFormDefinition>{ elements: [] };

    expect(() => new DynamicForm(definition, null)).toThrowError();
  });

  it('returns readonly being false', () => {
    const definition = <DynamicFormDefinition>{ template: {}, elements: [] };
    const form = new DynamicForm(definition, {});

    expect(form.readonly).toBe(false);
  });

  it('returns readonly being true if template is readonly', () => {
    const definition = <DynamicFormDefinition>{ template: { readonly: true }, elements: [] };
    const form = new DynamicForm(definition, {});

    expect(form.readonly).toBe(true);
  });

  it('returns hidden being false', () => {
    const definition = <DynamicFormDefinition>{ template: {}, elements: [] };
    const form = new DynamicForm(definition, {});

    expect(form.hidden).toBe(false);
  });

  it('returns hidden being true if template is hidden', () => {
    const definition = <DynamicFormDefinition>{ template: { hidden: true }, elements: [] };
    const form = new DynamicForm(definition, {});

    expect(form.hidden).toBe(true);
  });

  it('submits', (done) => {
    const definition = <DynamicFormDefinition>{ template: {}, elements: [] };
    const form = new DynamicForm(definition, {});

    form.submit$.subscribe((submit) => {
      expect(submit).toBe(true);
      done();
    });

    form.submit();
  });
});
