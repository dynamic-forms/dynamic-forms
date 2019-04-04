import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

describe('DynamicFormControl', () => {
  it('new instance', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{ key: 'key' };
    const formControl = new DynamicFormControl(root, root, template);

    expect(formControl.path).toBe('key');
    expect(formControl.root).toBe(root);
    expect(formControl.parent).toBe(root);
    expect(formControl.template).toBe(template);
    expect(formControl.model).toBeNull();
    expect(formControl.control).toBeDefined();

    expect(root.model).toEqual({ key: null });
  });

  it('new instance subscribes valueChanges of control', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{ key: 'key' };
    const formControl = new DynamicFormControl(root, root, template);

    formControl.control.setValue('value');

    expect(formControl.parent.model.key).toBe('value');
    expect(formControl.model).toBe('value');
  });

  it('check updates control', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{ key: 'key' };
    const formControl = new DynamicFormControl(root, root, template);

    expect(formControl.control.disabled).toBe(false);

    formControl.template.disabled = true;
    formControl.check();

    expect(formControl.control.disabled).toBe(true);

    formControl.template.disabled = false;
    formControl.check();

    expect(formControl.control.disabled).toBe(false);
  });

  it('check updates validators', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{ key: 'key' };
    const formControl = new DynamicFormControl(root, root, template);

    expect(formControl.control.validator).toBeDefined();
  });

  it('destroy unsubscribes valueChanges of control', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{ key: 'key' };
    const formControl = new DynamicFormControl(root, root, template);

    formControl.destroy();

    expect(formControl).toBeDefined();
  });
});
