import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

describe('DynamicFormModal', () => {
  it('creates instance', () => {
    const root = {} as DynamicForm;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, definition);

    expect(element.classType).toBe('element');
    expect(element.componentType).toBe('type');
    expect(element.definition).toBe(definition);
    expect(element.template).toBe(definition.template);

    expect(element.expressionData).toBeTruthy();
    expect(element.expressionData.isOpen).toBeFalse();

    expect(element.root).toBe(root);

    expect(element.isOpen).toBeFalse();
    expect(element.isOpenChanges).toBeTruthy();

    expect(element.trigger).toBeUndefined();
    expect(element.children).toEqual([]);
    expect(element.headerActions).toEqual([]);
    expect(element.footerActions).toEqual([]);
  });

  it('inits trigger', () => {
    const root = {} as DynamicForm;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, definition);
    const trigger = { classType: 'action', definition: {} } as DynamicFormAction;

    element.initTrigger(trigger);

    expect(element.trigger).toEqual(trigger);
  });

  it('inits children', () => {
    const root = {} as DynamicForm;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, definition);
    const children = [
      { classType: 'element', definition: {} } as DynamicFormElement
    ];

    element.initChildren(children);

    expect(element.children).toEqual(children);
  });

  it('inits children with empty array', () => {
    const root = {} as DynamicForm;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, definition);

    element.initChildren(null);

    expect(element.children).toEqual([]);
  });

  it('inits header and footer actions', () => {
    const root = {} as DynamicForm;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, definition);
    const headerActions = [ { classType: 'action', definition: {} } as DynamicFormAction ];
    const footerActions = [ { classType: 'action', definition: {} } as DynamicFormAction ];

    element.initHeaderActions(headerActions);
    element.initFooterActions(footerActions);

    expect(element.headerActions).toEqual(headerActions);
    expect(element.footerActions).toEqual(footerActions);
  });

  it('inits header and footer actions with empty arrays', () => {
    const root = {} as DynamicForm;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, definition);

    element.initHeaderActions(null);
    element.initFooterActions(null);

    expect(element.headerActions).toEqual([]);
    expect(element.footerActions).toEqual([]);
  });

  it('open, close and toggle sets isOpen', () => {
    const root = {} as DynamicForm;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
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
