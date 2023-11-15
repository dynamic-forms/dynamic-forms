import { DynamicFormItems } from '../dynamic-form-items';
import { DynamicFormItemsBase } from '../dynamic-form-items-base';
import { DynamicFormItemsDefinition } from '../dynamic-form-items-definition';
import { DynamicFormItemsTemplate } from '../dynamic-form-items-template';

export abstract class DynamicFormTabsBase<
  Template extends DynamicFormItemsTemplate = DynamicFormItemsTemplate,
  Definition extends DynamicFormItemsDefinition<Template> = DynamicFormItemsDefinition<Template>,
  Items extends DynamicFormItems<Template, Definition> = DynamicFormItems<Template, Definition>,
> extends DynamicFormItemsBase<Template, Definition, Items> {
  constructor() {
    super();
  }
}
