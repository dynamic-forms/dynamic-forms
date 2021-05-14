import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsBase } from './dynamic-form-items-base';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';

class DynamicFormItemsTestComponent extends DynamicFormItemsBase {}

describe('DynamicFormItemsBase', () => {
  let builder: DynamicFormBuilder;
  let component: DynamicFormItemsTestComponent;

  beforeEach(() => {
    builder = {} as any;
    component = new DynamicFormItemsTestComponent();
  });

  it('returns properties of element', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormItemsDefinition;
    const element = new DynamicFormItems(builder, root, parent, definition);
    const items = [ {} as DynamicFormItem ];

    element.initChildren(items);
    component.element = element;

    expect(component.id).toBe(element.id);
    expect(component.element).toBe(element);
    expect(component.definition).toBe(element.definition);
    expect(component.template).toBe(element.template);
    expect(component.children).toBe(items);
    expect(component.selectedItem).toBe(items[0]);
    expect(component.selectedIndex).toBe(0);
  });

  it('ngDoCheck calls check of element', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormItemsDefinition;
    const element = new DynamicFormItems(builder, root, parent, definition);

    spyOn(element, 'check');

    component.element = element;
    component.ngDoCheck();

    expect(element.check).toHaveBeenCalled();
  });

  it('selectItem calls selectItem of element', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormItemsDefinition;
    const element = new DynamicFormItems(builder, root, parent, definition);

    spyOn(element, 'selectItem');

    component.element = element;
    component.selectItem(1);

    expect(element.selectItem).toHaveBeenCalledWith(1);
  });
});
