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

  constructor(definition: Definition) {
    super(definition);
  }

  get selectedIndex(): number { return this._selectedIndex; }
  get selectedItem(): Item { return this._selectedItem; }

  initChildren(children: Item[]): void {
    this._children = children || [];
    this.selectFirstItem();
  }

  selectItem(index?: number): void {
    if (index >= 0 && index < this._children.length && !this._children[index].disabled) {
      this._selectedIndex = index;
      this._selectedItem = this._children[index];
    } else {
      this._selectedIndex = undefined;
      this._selectedItem = undefined;
    }
  }

  selectFirstItem(): void {
    const itemIndex = this._children.findIndex(item => !item.disabled);
    this.selectItem(itemIndex);
  }
}
