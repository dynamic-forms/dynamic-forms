import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormItemDefinition } from './dynamic-form-item-definition';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';
import { dynamicFormItemsFactory } from './dynamic-form-items-factory';

describe('dynamicFormItemsFactory', () => {
  let formBuilder: jasmine.SpyObj<DynamicFormBuilder>;

  beforeEach(() => {
    formBuilder = jasmine.createSpyObj<DynamicFormBuilder>('DynamicFormBuilder', [
      'createElementExpressions',
      'createFormElements',
      'getDefinition'
    ]);
  });

  it('returns DynamicFormItems', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormField;
    const itemDefinition = { template: { label: 'label' }, children: [] } as DynamicFormItemDefinition;
    const itemsDefinition = { template: {}, children: [ itemDefinition ] } as DynamicFormItemsDefinition;
    const expressions = [ {}, {} ];
    const children = [];

    formBuilder.getDefinition.and.returnValue(itemDefinition);
    formBuilder.createElementExpressions.and.returnValues(...expressions);
    formBuilder.createFormElements.and.returnValue(children);

    const formItems = dynamicFormItemsFactory(formBuilder, root, parent, itemsDefinition);

    expect(formItems).toBeTruthy();
    expect(formItems.definition).toBe(itemsDefinition);
    expect(formItems.expressions).toBe(expressions[0]);
    expect(formItems.children.length).toBe(1);
    expect(formItems.children[0].definition).toEqual({ ...itemDefinition, index: 0 });
    expect(formItems.children[0].expressions).toBe(expressions[1]);
    expect(formItems.children[0].children).toBe(children);

    expect(formBuilder.getDefinition).toHaveBeenCalledWith(itemDefinition, root);
    expect(formBuilder.createElementExpressions).toHaveBeenCalledWith(formItems);
    expect(formBuilder.createElementExpressions).toHaveBeenCalledWith(formItems.children[0]);
    expect(formBuilder.createFormElements).toHaveBeenCalledWith(root, parent, itemDefinition.children);
  });
});
