import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';

describe('DynamicFormAction', () => {
  it('new instance', () => {
    const root = <DynamicFormField>{};
    const parent = <DynamicFormField>{};
    const definition = <DynamicFormActionDefinition>{ type: 'type', template: {}, elements: [] };
    const formAction = new DynamicFormAction(root, parent, definition);

    expect(formAction.root).toBe(root);
    expect(formAction.parent).toBe(parent);

    expect(formAction.classType).toBe('action');
    expect(formAction.definition).toBe(definition);
    expect(formAction.template).toBe(definition.template);
    expect(formAction.componentType).toBe('type');
    expect(formAction.elements).toEqual([]);
  });
});
