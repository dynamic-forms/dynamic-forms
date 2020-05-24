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
  });
});
