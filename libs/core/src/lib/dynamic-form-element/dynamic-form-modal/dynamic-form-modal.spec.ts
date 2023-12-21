import { MockService } from 'ng-mocks';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from '../../dynamic-form-action/dynamic-form-action';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementExpression } from '../dynamic-form-element-expression';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

describe('DynamicFormModal', () => {
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder);
  });

  it('creates instance', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const type = { type: 'type' } as DynamicFormElementType;
    const modal = new DynamicFormModal(builder, root, parent, definition, type);

    expect(modal.root).toBe(root);
    expect(modal.parent).toBe(parent);

    expect(modal.definition).toBe(definition);
    expect(modal.template).toBe(definition.template);
    expect(modal.type).toBe(type);

    expect(modal.classType).toBe('element');

    expect(modal.expressionData).toBeTruthy();
    expect(modal.expressionData.isOpen).toBeFalse();

    expect(modal.isOpen).toBeFalse();
    expect(modal.isOpenChanges).toBeTruthy();

    expect(modal.trigger).toBeUndefined();
    expect(modal.children).toEqual([]);
    expect(modal.headerActions).toEqual([]);
    expect(modal.footerActions).toEqual([]);
  });

  it('inits trigger', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);
    const trigger = { classType: 'action', definition: {} } as DynamicFormAction;

    spyOn(builder, 'createFormAction').and.returnValues(trigger);

    modal.init();

    expect(modal.trigger).toEqual(trigger);
  });

  it('inits children', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);
    const children = [{ classType: 'element', definition: {} } as DynamicFormElement];

    spyOn(builder, 'createFormElements').and.returnValue(children);

    modal.init();

    expect(modal.children).toEqual(children);
  });

  it('inits children with empty array', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);

    spyOn(builder, 'createFormElements').and.returnValue(null);

    modal.init();

    expect(modal.children).toEqual([]);
  });

  it('inits header and footer actions', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);
    const headerActions = [{ classType: 'action', definition: {} } as DynamicFormAction];
    const footerActions = [{ classType: 'action', definition: {} } as DynamicFormAction];

    spyOn(builder, 'createFormActions').and.returnValues(headerActions, footerActions);

    modal.init();

    expect(modal.headerActions).toEqual(headerActions);
    expect(modal.footerActions).toEqual(footerActions);
  });

  it('inits header and footer actions with empty arrays', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);

    spyOn(builder, 'createFormActions').and.returnValues(null, null);

    modal.init();

    expect(modal.headerActions).toEqual([]);
    expect(modal.footerActions).toEqual([]);
  });

  it('open, close and toggle sets isOpen', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);

    modal.open();

    expect(modal.isOpen).toBeTrue();
    expect(modal.expressionData.isOpen).toBeTrue();

    modal.close();

    expect(modal.isOpen).toBeFalse();
    expect(modal.expressionData.isOpen).toBeFalse();

    modal.toggle();

    expect(modal.isOpen).toBeTrue();
    expect(modal.expressionData.isOpen).toBeTrue();

    modal.toggle();

    expect(modal.isOpen).toBeFalse();
    expect(modal.expressionData.isOpen).toBeFalse();
  });

  it('maximize, minimize and toggleSize sets maximized of template', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);

    modal.maximize();

    expect(modal.template.maximized).toBeTrue();
    expect(modal.expressionData.maximized).toBeTrue();

    modal.minimize();

    expect(modal.template.maximized).toBeFalse();
    expect(modal.expressionData.maximized).toBeFalse();

    modal.toggleSize();

    expect(modal.template.maximized).toBeTrue();
    expect(modal.expressionData.maximized).toBeTrue();

    modal.toggleSize();

    expect(modal.template.maximized).toBeFalse();
    expect(modal.expressionData.maximized).toBeFalse();
  });

  it('maximize, minimize and toggleSize does not set maximized of template if readonly expressions', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'type', template: {}, children: [] } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);
    const maximized = { value: false } as DynamicFormElementExpression;

    spyOn(builder, 'createElementExpressions').and.returnValue({ maximized });
    modal.init();

    expect(modal.template.maximized).toBeFalse();
    expect(modal.expressionData.maximized).toBeFalse();

    modal.maximize();

    expect(modal.template.maximized).toBeFalse();
    expect(modal.expressionData.maximized).toBeFalse();

    modal.toggleSize();

    expect(modal.template.maximized).toBeFalse();
    expect(modal.expressionData.maximized).toBeFalse();

    (maximized as any).value = true;

    expect(modal.template.maximized).toBeTrue();
    expect(modal.expressionData.maximized).toBeTrue();

    modal.minimize();

    expect(modal.template.maximized).toBeTrue();
    expect(modal.expressionData.maximized).toBeTrue();

    modal.toggleSize();

    expect(modal.template.maximized).toBeTrue();
    expect(modal.expressionData.maximized).toBeTrue();
  });
});
