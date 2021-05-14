import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';
import { DynamicFormItemsTemplate } from './dynamic-form-items-template';

export class DynamicFormItems<
  Template extends DynamicFormItemsTemplate = DynamicFormItemsTemplate,
  Definition extends DynamicFormItemsDefinition<Template> = DynamicFormItemsDefinition<Template>,
  Item extends DynamicFormItem = DynamicFormItem
> extends DynamicFormElement<Template, Definition, Item> {

  protected _selectedIndex: number;
  protected _selectedItem: Item;

  constructor(builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition) {
    super(builder, root, parent, definition);
  }

  get selectedIndex(): number { return this._selectedIndex; }
  get selectedItem(): Item { return this._selectedItem; }

  init(): void {
    this.initExpressions(this._builder.createElementExpressions(this));
    this.initChildren(this.definition.children.map((childDefinition, index) => {
      const itemDefinition = { ...this._builder.getDefinition(childDefinition, this.root), index };
      const item = new DynamicFormItem(this._builder, this.root, this, itemDefinition);
      item.init();
      return item as Item;
    }));
  }

  check(): void {
    if (this._selectedItem && this._selectedItem.disabled) {
      this.selectItem(0);
    }
  }

  selectItem(index: number): void {
    if (index >= 0 && index < this._children.length && !this._children[index].disabled) {
      this._selectedIndex = index;
      this._selectedItem = this._children[index];
    }
  }

  protected initChildren(children: Item[]): void {
    this._children = children || [];
    this.selectItem(0);
  }
}
