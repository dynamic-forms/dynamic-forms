import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';
import { DynamicFormItemsTemplate } from './dynamic-form-items-template';

export class DynamicFormItems<
  Template extends DynamicFormItemsTemplate = DynamicFormItemsTemplate,
  Definition extends DynamicFormItemsDefinition<Template> = DynamicFormItemsDefinition<Template>
> extends DynamicFormElement<Template, Definition> {

  protected _items: DynamicFormItem[] = [];

  protected _selectedIndex: number;
  protected _selectedItem: DynamicFormItem;

  constructor(definition: Definition) {
    super(definition);
  }

  get elements(): DynamicFormElement[] { return this._elements; }
  get items(): DynamicFormItem[] { return this._items; }

  get selectedIndex(): number { return this._selectedIndex; }
  get selectedItem(): DynamicFormItem { return this._selectedItem; }

  initElements(elements: DynamicFormItem[]): void {
    this._items = elements || [];
    this._elements = this._items;
    this.selectFirstItem();
  }

  selectItem(index?: number): void {
    if (index >= 0 && index < this.items.length && !this.items[index].disabled) {
      this._selectedIndex = index;
      this._selectedItem = this.items[index];
    } else {
      this._selectedIndex = undefined;
      this._selectedItem = undefined;
    }
  }

  selectFirstItem(): void {
    const itemIndex = this._items.findIndex(item => !item.disabled);
    this.selectItem(itemIndex);
  }
}
