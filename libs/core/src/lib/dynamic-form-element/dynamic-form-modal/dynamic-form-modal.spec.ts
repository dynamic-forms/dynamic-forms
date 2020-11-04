import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

describe('DynamicFormModal', () => {
  it('new instance', () => {
    const root = <DynamicForm>{};
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(root, definition);

    expect(element.classType).toBe('element');
    expect(element.componentType).toBe('type');
    expect(element.definition).toBe(definition);
    expect(element.template).toBe(definition.template);
    expect(element.elements).toEqual([]);

    expect(element.expressionData).toBeTruthy();
    expect(element.expressionData.isOpen).toBeFalse();

    expect(element.root).toBe(root);

    expect(element.isOpen).toBeFalse();
    expect(element.isOpenChange).toBeTruthy();

    expect(element.footerActions).toEqual([]);
    expect(element.trigger).toBeUndefined();
  });

  it('sets elements', () => {
    const root = <DynamicForm>{};
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(root, definition);
    const elements = [
      <DynamicFormElement>{ classType: 'element', definition: {} }
    ];

    element.initElements(elements);

    expect(element.elements).toEqual(elements);
  });

  it('sets elements to empty array', () => {
    const root = <DynamicForm>{};
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(root, definition);

    element.initElements(null);

    expect(element.elements).toEqual([]);
  });

  it('sets actions', () => {
    const root = <DynamicForm>{};
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(root, definition);
    const actions = [
      <DynamicFormAction>{ classType: 'action', definition: {} }
    ];

    element.initFooterActions(actions);

    expect(element.footerActions).toEqual(actions);
  });

  it('sets actions to empty array', () => {
    const root = <DynamicForm>{};
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(root, definition);

    element.initFooterActions(null);

    expect(element.footerActions).toEqual([]);
  });

  it('sets trigger', () => {
    const root = <DynamicForm>{};
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(root, definition);
    const trigger = <DynamicFormAction>{ classType: 'action', definition: {} };

    element.initTrigger(trigger);

    expect(element.trigger).toEqual(trigger);
  });

  it('open, close and toggle sets isOpen', () => {
    const root = <DynamicForm>{};
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(root, definition);

    element.open();

    expect(element.isOpen).toBeTrue();
    expect(element.expressionData.isOpen).toBeTrue();

    element.close();

    expect(element.isOpen).toBeFalse();
    expect(element.expressionData.isOpen).toBeFalse();

    element.toggle();

    expect(element.isOpen).toBeTrue();
    expect(element.expressionData.isOpen).toBeTrue();

    element.toggle();

    expect(element.isOpen).toBeFalse();
    expect(element.expressionData.isOpen).toBeFalse();
  });
});
