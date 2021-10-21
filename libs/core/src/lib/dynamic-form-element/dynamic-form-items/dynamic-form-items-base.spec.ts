import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../../testing';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItems } from './dynamic-form-items';
import { DynamicFormItemsBase } from './dynamic-form-items-base';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';

class DynamicFormItemsTestComponent extends DynamicFormItemsBase {}

describe('DynamicFormItemsBase', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;
  let component: DynamicFormItemsTestComponent;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
    component = new DynamicFormItemsTestComponent();
  });

  it('returns properties of element', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = {
      id: 'id',
      type: 'element',
      template: {},
      children: [
        { template: {} }
      ]
    } as DynamicFormItemsDefinition;
    const element = new DynamicFormItems(builder, root, parent, definition);

    element.init();
    component.element = element;

    expect(component.id).toBe(element.id);
    expect(component.element).toBe(element);
    expect(component.definition).toBe(element.definition);
    expect(component.template).toBe(element.template);
    expect(component.children.length).toBe(1);
    expect(component.selectedItem).toBe(component.children[0]);
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
