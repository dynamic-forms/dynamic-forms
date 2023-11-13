import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormModal } from './dynamic-form-modal';
import { DynamicFormModalBase } from './dynamic-form-modal-base';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

class DynamicFormModalTestComponent extends DynamicFormModalBase {}

describe('DynamicFormModalBase', () => {
  let builder: DynamicFormBuilder;
  let component: DynamicFormModalTestComponent;

  beforeEach(() => {
    builder = {} as any;
    component = new DynamicFormModalTestComponent();
  });

  it('component returns definition', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'element', template: {} } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);

    component.element = modal;

    expect(component.element).toEqual(modal);
    expect(component.definition).toEqual(modal.definition);
    expect(component.template).toEqual(modal.template);
    expect(component.children).toEqual([]);
    expect(component.trigger).toBeUndefined();
    expect(component.headerActions).toEqual([]);
    expect(component.footerActions).toEqual([]);
    expect(component.isOpen).toBeFalse();
    expect(component.isOpen$).toBeTruthy();
  });

  it('component calls open of modal', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'element', template: {} } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);

    spyOn(modal, 'open').and.callThrough();

    component.element = modal;

    component.open();

    expect(modal.open).toHaveBeenCalled();
  });

  it('component calls close of modal', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'element', template: {} } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);

    spyOn(modal, 'close').and.callThrough();

    component.element = modal;

    component.close();

    expect(modal.close).toHaveBeenCalled();
  });

  it('component calls toggle of modal', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { type: 'element', template: {} } as DynamicFormModalDefinition;
    const modal = new DynamicFormModal(builder, root, parent, definition, {} as DynamicFormElementType);

    spyOn(modal, 'toggle').and.callThrough();

    component.element = modal;

    component.toggle();

    expect(modal.toggle).toHaveBeenCalled();
  });
});
