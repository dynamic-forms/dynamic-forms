import { MockService } from 'ng-mocks';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsBase } from './dynamic-form-items-base';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';

class DynamicFormItemsTestComponent extends DynamicFormItemsBase {}

describe('DynamicFormItemsBase', () => {
  let builder: DynamicFormBuilder;
  let component: DynamicFormItemsTestComponent;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder);
    component = new DynamicFormItemsTestComponent();
  });

  it('returns properties of element', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = {
      id: 'id',
      type: 'element',
      template: {},
      children: [{ template: {} }],
    } as DynamicFormItemsDefinition;
    const items = new DynamicFormItems(builder, root, parent, definition, {} as DynamicFormElementType);

    items.init();
    component.element = items;

    expect(component.id).toBe(items.id);
    expect(component.element).toBe(items);
    expect(component.definition).toBe(items.definition);
    expect(component.template).toBe(items.template);
    expect(component.children.length).toBe(1);
    expect(component.selectedItem).toBe(component.children[0]);
    expect(component.selectedIndex).toBe(0);
  });

  it('ngDoCheck calls check of element', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormItemsDefinition;
    const items = new DynamicFormItems(builder, root, parent, definition, {} as DynamicFormElementType);

    spyOn(items, 'check');

    component.element = items;
    component.ngDoCheck();

    expect(items.check).toHaveBeenCalled();
  });

  it('selectItem calls selectItem of element', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormItemsDefinition;
    const items = new DynamicFormItems(builder, root, parent, definition, {} as DynamicFormElementType);

    spyOn(items, 'selectItem');

    component.element = items;
    component.selectItem(1);

    expect(items.selectItem).toHaveBeenCalledWith(1);
  });
});
