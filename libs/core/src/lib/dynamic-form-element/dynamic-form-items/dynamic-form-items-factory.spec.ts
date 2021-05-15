import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { createDynamicFormBuilderSpy } from '../../testing';
import { DynamicFormItemDefinition } from './dynamic-form-item-definition';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';
import { dynamicFormItemsFactory } from './dynamic-form-items-factory';

describe('dynamicFormItemsFactory', () => {
  let builder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    builder = createDynamicFormBuilderSpy();
  });

  it('returns DynamicFormItems', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormField;
    const itemDefinition = { template: { label: 'label' }, children: [] } as DynamicFormItemDefinition;
    const itemsDefinition = { template: {}, children: [ itemDefinition ] } as DynamicFormItemsDefinition;
    const expressions = [ {}, {} ];
    const children = [];

    builder.getDefinition.and.returnValue(itemDefinition);
    builder.createElementExpressions.and.returnValues(...expressions);
    builder.createFormElements.and.returnValue(children);

    const formItems = dynamicFormItemsFactory(builder, root, parent, itemsDefinition);

    expect(formItems).toBeTruthy();
    expect(formItems.definition).toBe(itemsDefinition);
    expect(formItems.expressions).toBe(expressions[0]);
    expect(formItems.children.length).toBe(1);
    expect(formItems.children[0].definition).toEqual({ ...itemDefinition, index: 0 });
    expect(formItems.children[0].expressions).toBe(expressions[1]);
    expect(formItems.children[0].children).toBe(children);

    expect(builder.getDefinition).toHaveBeenCalledWith(itemDefinition, root);
    expect(builder.createElementExpressions).toHaveBeenCalledWith(formItems);
    expect(builder.createElementExpressions).toHaveBeenCalledWith(formItems.children[0]);
    expect(builder.createFormElements).toHaveBeenCalledWith(root, parent, itemDefinition.children);
  });
});
