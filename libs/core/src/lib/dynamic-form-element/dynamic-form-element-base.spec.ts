import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from './dynamic-form-element';
import { DynamicFormElementBase } from './dynamic-form-element-base';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';

class DynamicFormElementTestComponent extends DynamicFormElementBase {}

describe('DynamicFormElementBase', () => {
  let builder: DynamicFormBuilder;
  let component: DynamicFormElementTestComponent;

  beforeEach(() => {
    builder = {} as any;
    component = new DynamicFormElementTestComponent();
  });

  it('returns properties of element', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormElementDefinition;
    const element = new DynamicFormElement(builder, root, parent, definition);

    component.element = element;

    expect(component.id).toBe(element.id);
    expect(component.element).toBe(element);
    expect(component.definition).toBe(element.definition);
    expect(component.template).toBe(element.template);
  });
});
