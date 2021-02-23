import { DynamicForm } from '../../dynamic-form/dynamic-form';
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

  constructor(root: DynamicForm, parent: DynamicFormElement, definition: Definition) {
    super(root, parent, definition);
  }

  get selectedIndex(): number { return this._selectedIndex; }
  get selectedItem(): Item { return this._selectedItem; }

  initChildren(children: Item[]): void {
    this._children = children || [];
    this.selectItem(0);
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
}
