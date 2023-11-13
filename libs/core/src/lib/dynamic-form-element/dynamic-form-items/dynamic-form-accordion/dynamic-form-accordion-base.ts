import { DynamicFormItems } from '../dynamic-form-items';
import { DynamicFormItemsBase } from '../dynamic-form-items-base';
import { DynamicFormItemsDefinition } from '../dynamic-form-items-definition';
import { DynamicFormItemsTemplate } from '../dynamic-form-items-template';

export abstract class DynamicFormAccordionBase<
  Template extends DynamicFormItemsTemplate = DynamicFormItemsTemplate,
  Definition extends DynamicFormItemsDefinition<Template> = DynamicFormItemsDefinition<Template>,
  Items extends DynamicFormItems<Template, Definition> = DynamicFormItems<Template, Definition>,
> extends DynamicFormItemsBase<Template, Definition, Items> {
  constructor() {
    super();
  }

  openItem(index: number): void {
    if (this.selectedIndex !== index) {
      this.selectItem(index);
    }
  }

  closeItem(index: number): void {
    if (this.selectedIndex === index) {
      this.selectItem(undefined);
    }
  }

  toggleItem(index: number): void {
    if (this.selectedIndex !== index) {
      this.selectItem(index);
    } else {
      this.selectItem(undefined);
    }
  }
}
