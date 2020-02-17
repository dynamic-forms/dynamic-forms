import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementBase } from './dynamic-form-element-base';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';

class DynamicFormElementBaseTest extends DynamicFormElementBase {}

describe('DynamicFormElementBase', () => {
  let component: DynamicFormElementBaseTest;

  beforeEach(() => {
    component = new DynamicFormElementBaseTest();
  });

  it('component returns definition', () => {
    const definition = <DynamicFormElementDefinition>{ id: 'id', type: 'element', template: {} };
    const element = new DynamicFormElement(definition);

    component.element = element;

    expect(component.id).toBe('id');
    expect(component.element).toEqual(element);
    expect(component.definition).toEqual(element.definition);
    expect(component.template).toEqual(element.template);
  });
});
