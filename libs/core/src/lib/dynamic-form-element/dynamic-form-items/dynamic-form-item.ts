import { DynamicForm } from '../../dynamic-form/dynamic-form';
import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItemDefinition } from './dynamic-form-item-definition';
import { DynamicFormItemTemplate } from './dynamic-form-item-template';

export class DynamicFormItem<
  Template extends DynamicFormItemTemplate = DynamicFormItemTemplate,
  Definition extends DynamicFormItemDefinition<Template> = DynamicFormItemDefinition<Template>
> extends DynamicFormElement<Template, Definition> {

  constructor(root: DynamicForm, parent: DynamicFormElement, definition: Definition) {
    super(root, parent, definition);
    this.extendExpressionData({
      index: () => this.index
    });
  }

  get index(): number { return this.definition.index; }

  get label(): string { return this.template.label; }
  get disabled(): boolean { return this.index > 0 && this.template.disabled; }
}
