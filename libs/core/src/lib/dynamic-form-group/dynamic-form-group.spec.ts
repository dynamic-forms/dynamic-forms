import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

describe('DynamicFormGroup', () => {
  it('new DynamicFormGroup', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormGroupTemplate>{
      key: 'key',
      fields: []
    };
    const formGroup = new DynamicFormGroup(root, root, template);

    expect(formGroup.path).toBe('key');
    expect(formGroup.root).toBe(root);
    expect(formGroup.parent).toBe(root);
    expect(formGroup.template).toBe(template);
    expect(formGroup.model).toEqual({});
    expect(formGroup.control).toBeDefined();
    expect(formGroup.fields).toBeDefined();

    expect(root.model).toEqual({ key: {} });
  });
});
