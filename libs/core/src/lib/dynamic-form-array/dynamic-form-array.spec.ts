import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormTemplate } from '../dynamic-form/dynamic-form-template';
import { DynamicFormArray } from './dynamic-form-array';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

describe('DynamicFormArray', () => {
  it('new DynamicFormArray', () => {
    const root = new DynamicForm(<DynamicFormTemplate>{ fields: [] } , {});
    const template = <DynamicFormArrayTemplate>{
      key: 'key',
      fields: []
    };
    const formArray = new DynamicFormArray(root, root, template);

    expect(formArray.path).toBe('key');
    expect(formArray.root).toBe(root);
    expect(formArray.parent).toBe(root);
    expect(formArray.template).toBe(template);
    expect(formArray.model).toEqual([]);
    expect(formArray.control).toBeDefined();
    expect(formArray.fields).toBeDefined();

    expect(root.model).toEqual({ key: [] });
  });
});
