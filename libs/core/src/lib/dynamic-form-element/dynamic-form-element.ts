
import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export class DynamicFormElement<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>
> {
  protected _definition: Definition;
  protected _elements: DynamicFormElement[] = [];


  constructor(definition: Definition) {
    this._definition = definition;
    this._definition.template = definition.template || <Template>{};
  }

  get id(): string { return this.definition.id; }
  get classType(): DynamicFormClassType { return 'element'; }
  get componentType(): string { return this.definition.type; }

  get definition(): Definition { return this._definition; }
  get template(): Template { return this.definition.template; }
  get elements(): DynamicFormElement[] { return this._elements; }

  initElements(elements: DynamicFormElement[]): void {
    this._elements = elements || [];
  }
}
