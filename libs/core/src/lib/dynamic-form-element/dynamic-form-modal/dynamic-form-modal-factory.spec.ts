import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';
import { dynamicFormModalFactory } from './dynamic-form-modal-factory';

describe('dynamicFormModalFactory', () => {
  it('return modal', () => {
    const expressions = {};
    const trigger = <DynamicFormAction>{};
    const elements = [];
    const actions = [];
    const builder = jasmine.createSpyObj<DynamicFormBuilder>('builder', [
      'createElementExpressions',
      'createFormAction',
      'createFormElements',
      'createFormActions'
    ]);
    builder.createElementExpressions.and.returnValue(expressions);
    builder.createFormAction.and.returnValue(trigger);
    builder.createFormElements.and.returnValue(elements);
    builder.createFormActions.and.returnValue(actions);

    const root = <DynamicFormField>{};
    const parent = <DynamicFormField>{};
    const definition = <DynamicFormModalDefinition>{ id: 'id', type: 'element', template: {}, trigger: {}, elements: [], actions: [] };

    const modal = dynamicFormModalFactory(builder, root, parent, definition);

    expect(modal.definition).toBe(definition);
    expect(modal.expressions).toBe(expressions);
    expect(modal.trigger).toBe(trigger);
    expect(modal.elements).toBe(elements);
    expect(modal.actions).toBe(actions);

    expect(builder.createElementExpressions).toHaveBeenCalledWith(modal);
    expect(builder.createFormAction).toHaveBeenCalledWith(root, modal, definition.trigger);
    expect(builder.createFormElements).toHaveBeenCalledWith(root, parent, definition.elements);
    expect(builder.createFormActions).toHaveBeenCalledWith(root, modal, definition.actions);
  });
});
