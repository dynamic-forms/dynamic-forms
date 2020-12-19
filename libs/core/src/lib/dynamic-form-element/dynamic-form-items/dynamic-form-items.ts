import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItem } from './dynamic-form-item';
import { DynamicFormItemsDefinition } from './dynamic-form-items-definition';
import { DynamicFormItemsTemplate } from './dynamic-form-items-template';

export class DynamicFormItems<
  Template extends DynamicFormItemsTemplate = DynamicFormItemsTemplate,
  Definition extends DynamicFormItemsDefinition<Template> = DynamicFormItemsDefinition<Template>
> extends DynamicFormElement<Template, Definition> {

  protected _items: DynamicFormItem[] = [];

  constructor(definition: Definition) {
    super(definition);
  }

  get elements(): DynamicFormElement[] { return this._elements; }
  get items(): DynamicFormItem[] { return this._items; }

  initElements(elements: DynamicFormItem[]): void {
    this._items = elements ? [ ...elements ] : [];
    this._elements = this._items;
  }
}
