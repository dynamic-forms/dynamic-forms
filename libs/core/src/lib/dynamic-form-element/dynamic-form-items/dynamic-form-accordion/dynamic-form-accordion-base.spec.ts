import { DynamicForm } from '../../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../../../testing';
import { DynamicFormElement } from '../../dynamic-form-element';
import { DynamicFormElementType } from '../../dynamic-form-element-type';
import { DynamicFormItems } from '../dynamic-form-items';
import { DynamicFormItemsDefinition } from '../dynamic-form-items-definition';
import { DynamicFormAccordionBase } from './dynamic-form-accordion-base';

class DynamicFormAccordionTestComponent extends DynamicFormAccordionBase {}

describe('DynamicFormAccordionBase', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;
  let component: DynamicFormAccordionTestComponent;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();

    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = {
      id: 'id',
      type: 'element',
      template: {},
      children: [{ template: {} }],
    } as DynamicFormItemsDefinition;

    component = new DynamicFormAccordionTestComponent();
    component.element = new DynamicFormItems(builder, root, parent, definition, {} as DynamicFormElementType);
    component.element.init();
  });

  it('openItem calls selectItem of element', () => {
    spyOn(component.element, 'selectItem');

    component.openItem(1);

    expect(component.element.selectItem).toHaveBeenCalledWith(1);
  });

  it('openItem does not call selectItem of element', () => {
    spyOn(component.element, 'selectItem');

    component.openItem(0);

    expect(component.element.selectItem).not.toHaveBeenCalledWith(0);
  });

  it('closeItem calls selectItem of element', () => {
    spyOn(component.element, 'selectItem');

    component.closeItem(0);

    expect(component.element.selectItem).toHaveBeenCalledWith(undefined);
  });

  it('closeItem does not call selectItem of element', () => {
    spyOn(component.element, 'selectItem');

    component.closeItem(1);

    expect(component.element.selectItem).not.toHaveBeenCalled();
  });

  it('toggleItem calls selectItem of element', () => {
    spyOn(component.element, 'selectItem');

    component.toggleItem(0);

    expect(component.element.selectItem).toHaveBeenCalledWith(undefined);
  });

  it('toggleItem calls selectItem of element', () => {
    spyOn(component.element, 'selectItem');

    component.toggleItem(1);

    expect(component.element.selectItem).toHaveBeenCalledWith(1);
  });
});
