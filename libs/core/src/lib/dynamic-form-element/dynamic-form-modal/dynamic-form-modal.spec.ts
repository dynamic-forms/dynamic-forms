import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../../testing';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementExpression } from '../dynamic-form-element-expression';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

describe('DynamicFormModal', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
  });

  it('creates instance', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(builder, root, parent, definition);

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
    const element = new DynamicFormModal(builder, root, parent, definition);
    const trigger = { classType: 'action', definition: {} } as DynamicFormAction;

    builder.createFormAction.and.returnValues(trigger);

    element.init();

    expect(element.trigger).toEqual(trigger);
  });

  it('inits children', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(builder, root, parent, definition);
    const children = [
      { classType: 'element', definition: {} } as DynamicFormElement
    ];

    builder.createFormElements.and.returnValue(children);

    element.init();

    expect(element.children).toEqual(children);
  });

  it('inits children with empty array', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(builder, root, parent, definition);

    builder.createFormElements.and.returnValue(null);

    element.init();

    expect(element.children).toEqual([]);
  });

  it('inits header and footer actions', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(builder, root, parent, definition);
    const headerActions = [ { classType: 'action', definition: {} } as DynamicFormAction ];
    const footerActions = [ { classType: 'action', definition: {} } as DynamicFormAction ];

    builder.createFormActions.and.returnValues(headerActions, footerActions);

    element.init();

    expect(element.headerActions).toEqual(headerActions);
    expect(element.footerActions).toEqual(footerActions);
  });

  it('inits header and footer actions with empty arrays', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(builder, root, parent, definition);

    builder.createFormActions.and.returnValues(null, null);

    element.init();

    expect(element.headerActions).toEqual([]);
    expect(element.footerActions).toEqual([]);
  });

  it('open, close and toggle sets isOpen', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const element = new DynamicFormModal(builder, root, parent, definition);

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
    const element = new DynamicFormModal(builder, root, parent, definition);

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
    const element = new DynamicFormModal(builder, root, parent, definition);
    const maximized = { value: false } as DynamicFormElementExpression;

    builder.createElementExpressions.and.returnValue({ maximized });
    element.init();

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
