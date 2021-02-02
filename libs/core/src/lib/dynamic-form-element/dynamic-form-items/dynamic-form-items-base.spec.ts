import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsBase } from './dynamic-form-items-base';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';

class DynamicFormItemsTestComponent extends DynamicFormItemsBase {}

describe('DynamicFormItemsBase', () => {
  let component: DynamicFormItemsTestComponent;

  beforeEach(() => {
    component = new DynamicFormItemsTestComponent();
  });

  it('returns properties of element', () => {
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormItemsDefinition;
    const element = new DynamicFormItems(definition);
    const items = [ {} as DynamicFormItem ];

    element.initChildren(items);
    component.element = element;

    expect(component.id).toBe(element.id);
    expect(component.element).toBe(element);
    expect(component.definition).toBe(element.definition);
    expect(component.template).toBe(element.template);
    expect(component.items).toBe(items);
    expect(component.selectedItem).toBe(items[0]);
    expect(component.selectedIndex).toBe(0);
  });

  it('calls selectItem of element', () => {
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormItemsDefinition;
    const element = new DynamicFormItems(definition);

    spyOn(element, 'selectItem');

    component.element = element;
    component.selectItem(1);

    expect(element.selectItem).toHaveBeenCalledWith(1);
  });
});
