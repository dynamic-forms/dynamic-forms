import { DynamicFormModal} from './dynamic-form-modal';
import { DynamicFormModalBase } from './dynamic-form-modal-base';
import { DynamicFormModalDefinition } from './dynamic-form-modal-definition';

class DynamicFormModalBaseTest extends DynamicFormModalBase {}

describe('DynamicFormModalBase', () => {
  let component: DynamicFormModalBaseTest;

  beforeEach(() => {
    component = new DynamicFormModalBaseTest();
  });

  it('component returns definition', () => {
    const definition = <DynamicFormModalDefinition>{ id: 'id', type: 'element', template: {} };
    const element = new DynamicFormModal(definition);

    component.element = element;

    expect(component.id).toBe('id');
    expect(component.element).toEqual(element);
    expect(component.definition).toEqual(element.definition);
    expect(component.template).toEqual(element.template);
    expect(component.elements).toEqual([]);
    expect(component.trigger).toBeUndefined();
    expect(component.actions).toEqual([]);
    expect(component.isOpen).toBeFalse();
    expect(component.isOpen$).toBeTruthy();
  });

  it('component calls open of modal', () => {
    const definition = <DynamicFormModalDefinition>{ id: 'id', type: 'element', template: {} };
    const element = new DynamicFormModal(definition);

    spyOn(element, 'open').and.callThrough();

    component.element = element;

    component.open();

    expect(element.open).toHaveBeenCalled();
  });

  it('component calls close of modal', () => {
    const definition = <DynamicFormModalDefinition>{ id: 'id', type: 'element', template: {} };
    const element = new DynamicFormModal(definition);

    spyOn(element, 'close').and.callThrough();

    component.element = element;

    component.close();

    expect(element.close).toHaveBeenCalled();
  });

  it('component calls toggle of modal', () => {
    const definition = <DynamicFormModalDefinition>{ id: 'id', type: 'element', template: {} };
    const element = new DynamicFormModal(definition);

    spyOn(element, 'toggle').and.callThrough();

    component.element = element;

    component.toggle();

    expect(element.toggle).toHaveBeenCalled();
  });
});
