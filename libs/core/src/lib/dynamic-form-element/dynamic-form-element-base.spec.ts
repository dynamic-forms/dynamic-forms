import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementBase } from './dynamic-form-element-base';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';

class DynamicFormElementBaseTest extends DynamicFormElementBase {}

describe('DynamicFormElementBase', () => {
  let component: DynamicFormElementBaseTest;

  beforeEach(() => {
    component = new DynamicFormElementBaseTest();
  });

  it('returns properties of element', () => {
    const definition = <DynamicFormElementDefinition>{ id: 'id', type: 'element', template: {} };
    const element = new DynamicFormElement(definition);

    component.element = element;

    expect(component.id).toBe(element.id);
    expect(component.element).toBe(element);
    expect(component.definition).toBe(element.definition);
    expect(component.template).toBe(element.template);
  });
});
