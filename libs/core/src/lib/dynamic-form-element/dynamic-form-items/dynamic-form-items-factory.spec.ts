import { MockService } from 'ng-mocks';
import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormField } from '../../dynamic-form-field/dynamic-form-field';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormItemDefinition } from './dynamic-form-item-definition';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';
import { dynamicFormItemsFactory } from './dynamic-form-items-factory';

describe('dynamicFormItemsFactory', () => {
  let builder: DynamicFormBuilder;

  beforeEach(() => {
    builder = MockService(DynamicFormBuilder);
  });

  it('returns DynamicFormItems', () => {
    const root = {} as DynamicForm;
    const parent = {} as DynamicFormField;
    const itemDefinition = { template: { label: 'label' }, children: [] } as DynamicFormItemDefinition;
    const definition = { template: {}, children: [itemDefinition] } as DynamicFormItemsDefinition;
    const type = {} as DynamicFormElementType;
    const expressions = [{}, {}];
    const children = [];

    spyOn(builder, 'getDefinition').and.returnValue(itemDefinition);
    spyOn(builder, 'createElementExpressions').and.returnValues(...expressions);
    spyOn(builder, 'createFormElements').and.returnValue(children);

    const items = dynamicFormItemsFactory(builder, root, parent, definition, type);

    expect(items).toBeTruthy();
    expect(items.definition).toBe(definition);
    expect(items.expressions).toBe(expressions[0]);
    expect(items.children.length).toBe(1);
    expect(items.children[0].definition).toEqual({ ...itemDefinition, index: 0 });
    expect(items.children[0].expressions).toBe(expressions[1]);
    expect(items.children[0].children).toBe(children);

    expect(builder.getDefinition).toHaveBeenCalledWith(itemDefinition, root);
    expect(builder.createElementExpressions).toHaveBeenCalledWith(items);
    expect(builder.createElementExpressions).toHaveBeenCalledWith(items.children[0]);
    expect(builder.createFormElements).toHaveBeenCalledWith(root, parent, itemDefinition.children);
  });
});
