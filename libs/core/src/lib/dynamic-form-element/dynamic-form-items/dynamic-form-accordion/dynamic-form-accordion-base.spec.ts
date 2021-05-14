import { DynamicForm } from '../../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../../dynamic-form-element';
import { DynamicFormItem } from '../dynamic-form-item';
import { DynamicFormItems } from '../dynamic-form-items';
import { DynamicFormItemsDefinition } from '../dynamic-form-items-definition';
import { DynamicFormAccordionBase } from './dynamic-form-accordion-base';

class DynamicFormAccordionTestComponent extends DynamicFormAccordionBase {}

describe('DynamicFormAccordionBase', () => {
  let builder: DynamicFormBuilder;
  let component: DynamicFormAccordionTestComponent;

  beforeEach(() => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormElement;
    const definition = { id: 'id', type: 'element', template: {} } as DynamicFormItemsDefinition;

    builder = {} as any;
    component = new DynamicFormAccordionTestComponent();
    component.element = new DynamicFormItems(builder, root, parent, definition);
    component.element.initChildren([ {} as DynamicFormItem ]) ;
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
