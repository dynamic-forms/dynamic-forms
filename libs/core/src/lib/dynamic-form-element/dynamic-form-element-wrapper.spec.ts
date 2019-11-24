import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementWrapper } from './dynamic-form-element-wrapper';

class DynamicFormElementWrapperTest extends DynamicFormElementWrapper {}

describe('DynamicFormElementWrapper', () => {
  let component: DynamicFormElementWrapperTest;

  beforeEach(() => {
    component = new DynamicFormElementWrapperTest();
  });

  it('component returns definition', () => {
    const definition = <DynamicFormElementDefinition>{ type: 'element', template: {} };
    const element = new DynamicFormElement(definition);

    component.element = element;

    expect(component.element).toEqual(element);
    expect(component.definition).toBe(definition);
  });
});
