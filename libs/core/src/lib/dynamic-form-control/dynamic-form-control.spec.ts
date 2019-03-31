import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

describe('DynamicFormControl', () => {
  it('new instance', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormControlTemplate>{
      key: 'key'
    };
    const formControl = new DynamicFormControl(root, root, template);

    expect(formControl.path).toBe('key');
    expect(formControl.root).toBe(root);
    expect(formControl.parent).toBe(root);
    expect(formControl.template).toBe(template);
    expect(formControl.model).toBeNull();
    expect(formControl.control).toBeDefined();

    expect(root.model).toEqual({ key: null });
  });
});
