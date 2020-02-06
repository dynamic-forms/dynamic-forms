import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';

export class DynamicFormAction<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate,
  Definition extends DynamicFormActionDefinition<Template> = DynamicFormActionDefinition<Template>,
  Field extends DynamicFormField = DynamicFormField,
> extends DynamicFormElement<Template, Definition> {

  protected readonly _parent: Field;

  constructor(parent: Field, definition: Definition) {
    super(definition);
    this._parent = parent;
  }

  get classType(): DynamicFormClassType { return 'action'; }

  get disabled() { return this._parent.control.disabled; }
}
