import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

describe('DynamicFormModal', () => {
  it('new instance', () => {
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(definition);

    expect(element.classType).toBe('element');
    expect(element.componentType).toBe('type');
    expect(element.definition).toBe(definition);
    expect(element.template).toBe(definition.template);
    expect(element.elements).toEqual([]);

    expect(element.expressionData).toBeTruthy();
    expect(element.expressionData.isOpen).toBeFalse();

    expect(element.actions).toEqual([]);
    expect(element.trigger).toBeUndefined();

    expect(element.isOpen).toBeFalse();
  });

  it('sets elements', () => {
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(definition);
    const elements = [
      <DynamicFormElement>{ classType: 'element', definition: {} }
    ];

    element.initElements(elements);

    expect(element.elements).toEqual(elements);
  });

  it('sets elements to empty array', () => {
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(definition);

    element.initElements(null);

    expect(element.elements).toEqual([]);
  });

  it('sets actions', () => {
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(definition);
    const actions = [
      <DynamicFormAction>{ classType: 'action', definition: {} }
    ];

    element.initActions(actions);

    expect(element.actions).toEqual(actions);
  });

  it('sets actions to empty array', () => {
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(definition);

    element.initActions(null);

    expect(element.actions).toEqual([]);
  });

  it('sets trigger', () => {
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(definition);
    const trigger = <DynamicFormAction>{ classType: 'action', definition: {} };

    element.initTrigger(trigger);

    expect(element.trigger).toEqual(trigger);
  });

  it('open, close and toggle sets isOpen', () => {
    const definition = <DynamicFormModalDefinition>{ type: 'type', template: {}, elements: [] };
    const element = new DynamicFormModal(definition);

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
