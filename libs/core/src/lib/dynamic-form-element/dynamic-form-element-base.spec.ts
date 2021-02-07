import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementBase } from './dynamic-form-element-base';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';

class DynamicFormElementTestComponent extends DynamicFormElementBase {}

describe('DynamicFormElementBase', () => {
  let component: DynamicFormElementTestComponent;

  beforeEach(() => {
    component = new DynamicFormElementTestComponent();
  });

  it('returns properties of element', () => {
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormElementDefinition;
    const element = new DynamicFormElement(definition);

    component.element = element;

    expect(component.id).toBe(element.id);
    expect(component.element).toBe(element);
    expect(component.definition).toBe(element.definition);
    expect(component.template).toBe(element.template);
  });
});
