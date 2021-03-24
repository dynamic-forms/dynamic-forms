import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementExpression } from '../dynamic-form-element-expression';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

describe('DynamicFormModal', () => {
  it('creates instance', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, parent, definition);

    expect(element.root).toBe(root);
    expect(element.parent).toBe(parent);

    expect(element.definition).toBe(definition);
    expect(element.template).toBe(definition.template);

    expect(element.classType).toBe('element');
    expect(element.componentType).toBe('type');

    expect(element.expressionData).toBeTruthy();
    expect(element.expressionData.isOpen).toBeFalse();

    expect(element.isOpen).toBeFalse();
    expect(element.isOpenChanges).toBeTruthy();

    expect(element.trigger).toBeUndefined();
    expect(element.children).toEqual([]);
    expect(element.headerActions).toEqual([]);
    expect(element.footerActions).toEqual([]);
  });

  it('inits trigger', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, parent, definition);
    const trigger = { classType: 'action', definition: {} } as DynamicFormAction;

    element.initTrigger(trigger);

    expect(element.trigger).toEqual(trigger);
  });

  it('inits children', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, parent, definition);
    const children = [
      { classType: 'element', definition: {} } as DynamicFormElement
    ];

    element.initChildren(children);

    expect(element.children).toEqual(children);
  });

  it('inits children with empty array', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, parent, definition);

    element.initChildren(null);

    expect(element.children).toEqual([]);
  });

  it('inits header and footer actions', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, parent, definition);
    const headerActions = [ { classType: 'action', definition: {} } as DynamicFormAction ];
    const footerActions = [ { classType: 'action', definition: {} } as DynamicFormAction ];

    element.initHeaderActions(headerActions);
    element.initFooterActions(footerActions);

    expect(element.headerActions).toEqual(headerActions);
    expect(element.footerActions).toEqual(footerActions);
  });

  it('inits header and footer actions with empty arrays', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, parent, definition);

    element.initHeaderActions(null);
    element.initFooterActions(null);

    expect(element.headerActions).toEqual([]);
    expect(element.footerActions).toEqual([]);
  });

  it('open, close and toggle sets isOpen', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, parent, definition);

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

  it('maximize, minimize and toggleSize sets maximized of template', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, parent, definition);

    element.maximize();

    expect(element.template.maximized).toBeTrue();
    expect(element.expressionData.maximized).toBeTrue();

    element.minimize();

    expect(element.template.maximized).toBeFalse();
    expect(element.expressionData.maximized).toBeFalse();

    element.toggleSize();

    expect(element.template.maximized).toBeTrue();
    expect(element.expressionData.maximized).toBeTrue();

    element.toggleSize();

    expect(element.template.maximized).toBeFalse();
    expect(element.expressionData.maximized).toBeFalse();
  });

  it('maximize, minimize and toggleSize does not set maximized of template if readonly expressions', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(root, parent, definition);
    const maximized = { value: false } as DynamicFormElementExpression;

    element.initExpressions({ maximized });

    expect(element.template.maximized).toBeFalse();
    expect(element.expressionData.maximized).toBeFalse();

    element.maximize();

    expect(element.template.maximized).toBeFalse();
    expect(element.expressionData.maximized).toBeFalse();

    element.toggleSize();

    expect(element.template.maximized).toBeFalse();
    expect(element.expressionData.maximized).toBeFalse();

    (maximized as any).value = true;

    expect(element.template.maximized).toBeTrue();
    expect(element.expressionData.maximized).toBeTrue();

    element.minimize();

    expect(element.template.maximized).toBeTrue();
    expect(element.expressionData.maximized).toBeTrue();

    element.toggleSize();

    expect(element.template.maximized).toBeTrue();
    expect(element.expressionData.maximized).toBeTrue();
  });
});
