import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';

describe('DynamicFormAction', () => {
  it('new instance', () => {
    const field = <DynamicFormField>{};
    const definition = <DynamicFormActionDefinition>{ type: 'type', template: {}, elements: [] };
    const formAction = new DynamicFormAction(field, definition);

    expect(formAction.classType).toBe('action');
    expect(formAction.definition).toBe(definition);
    expect(formAction.template).toBe(definition.template);
    expect(formAction.componentType).toBe('type');
    expect(formAction.elements).toEqual([]);
  });
});
